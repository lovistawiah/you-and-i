const bcrypt = require("bcrypt");
const mailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const { generateSixRandomNumbers } = require("./emailcode");

// ? signup controller
const signup = async (req, res) => {
  let message = "";
  try {
    let { firstName, lastName, email, password, confirmPassword } = req.body;
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      message = "all fields are required";
      res.status(400).json({ message });
      return;
    }

    if (password !== confirmPassword) {
      message = "passwords do not match";
      res.status(400).json({ message });
      return;
    }
    
    //making the username the email value if the user do not provide username 
    const username = email.split('@')[0]
    password = await bcrypt.hash(password, 10);
    const account = { firstName, lastName, email, password, username };
    const user = await User.create(account);
    console.log(user);
    if (!user) {
      message = "account cannot be created, try again later";
      res.status(400).json({ message });
      return;
    }

    // adding six code to the user info
    const number = generateSixRandomNumbers();
    user.verificaton.code = number;
    user.verificaton.expires = expiryDate();

    sendEmailCode(
      process.env.GMAIL_CLIENT,
      user.email,
      number,
      verifyMessage(number)
    );
    await user.save();
    message = "ok";

    res.status(200).json({ message });
    return;
  } catch (err) {
    console.log(err);
    let StatusCode = 500;
    message = "Internal Server Error";

    if (err.code == 11000) {
      const errValue = Object.keys(err.keyValue);

      // console.log(errValue);
      message = `${errValue} already exists`;
      StatusCode = 400;
    }
    res.status(StatusCode).json({ message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    let message = "";
    const { id, code } = req.body;
    const user = await User.findById(id);
    const userCode = user.verificaton.code;
    if (code !== userCode) {
      message = "code is invalid";
      res.status(400).json({ message });
      return;
    }
    user.verificaton.verified = true;
    await user.save(true);
    message = "ok";
    res.status(202).json({ message });
    return;
  } catch (err) {
    const message = err.message;
    res.status(500).json({ message });
  }
};

//? login controller
const login = async (req, res) => {
  let message = "";
  try {
    const { usernameEmail, password } = req.body;
    if (!usernameEmail || !password) {
      message = "username, email or password required";
      res.status(400).json({ message });
      return;
    }

    const user = await User.findOne({
      $or: [{ username: usernameEmail }, { email: usernameEmail }],
    });
    // handle if no user exists
    if (!user) {
      message = `${usernameEmail} does not exist`;
      res.status(400).json({ message });
      return;
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      message = "incorrect password";
      res.status(400).json({ message });
      return;
    }
    const token = jwt.sign(
      { userInfo: { userId: user._id, username: user.username } },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.status(200).json({
      message: "ok",
      userInfo: { userId: user._id, username: user.username },
      token,
    });
    return;
  } catch (err) {
    message = "Internal Server Error";
    res.status(500).json({ message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (e) {
    console.log(e);
  }
};

const userInfo = async (req, res) => {
  try {
    let message = "";
    const userId = req.user.userId;
    const userDetails = await User.findById(userId).select("username,bio");
    message = "ok";
    res.status(200).json({ userDetails, message });
  } catch (err) {
    console.log(err);
  }
};
const pass = process.env.GMAIL_PASS;
function sendEmailCode(sender, receiver, code, verifyMessage) {
  if (!sender || !receiver || !verifyMessage || !code) {
    return;
  }
  let mailTransporter = mailer.createTransport({
    service: "gmail",
    auth: {
      user: sender,
      pass: pass,
    },
  });

  let mailDetails = {
    from: sender,
    to: receiver,
    subject: `Verification Code:${code} from You and I`,
    text: verifyMessage,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) console.error(err);
    console.log(data);
  });
}

const expiryDate = () => {
  const today = new Date();
  const date = today.getDate();
  const codeDate = new Date(today.setDate(date + 1));
  return codeDate;
};

function verifyMessage(number) {
  return (content = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>You and I verification code</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        h3 {
            font-size: 2rem;
            font-weight: lighter;
        }
        p {
            font-size: 16.5px;
        }
    </style>
</head>
<body>
    <h3>You and I</h3>
    <p>Your verification code:
    <h2>${number}</h2>
    </p>
    <p>this code expires in the next 24 hours</p>
    <p>If you did not request for verification you can ingore this message</p>
    <p>Thanks <br> The You and I Team</p>
</body>
</html>`);
}
module.exports = {
  login,
  signup,
  userInfo,
  getAllUsers,
  verifyEmail,
};
