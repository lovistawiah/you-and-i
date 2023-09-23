const connection = require("../db/connection");
const User = require("../models/Users");

async function start(url) {
  try {
    await connection(url);
    const result = await User.updateMany({}, { $set: { expires: "" } });
    console.log(result);
    console.log("connected...");
  } catch (err) {
    console.log(err.message);
  }
}

start(
  "mongodb+srv://you-and-i:Zf2hb98NCUUdrLJT@cluster.y1igvmh.mongodb.net/Testing"
);

