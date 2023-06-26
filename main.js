require("dotenv").config()
const express = require('express');
require("dotenv").config()
const morgan = require("morgan");
const http = require('http');
const path = require("path")

//local files
const messages = require("./messages/index");
const router = require("./routes/routes");
const connection = require("./db/connection");
const { authenticUser } = require("./Middleware/userAuth");
// const { authenticUser } = require("./Middleware/userAuth");


const app = express();
const server = http.createServer(app);
const MONGO_URI = process.env.MONGO_URI



app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/public", express.static('public/'))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.use('/api', router)
app.use('/messages', authenticUser, require("./routes/message"))
app.use('/channels', authenticUser, require("./routes/channel"))
app.use('/new-friends', authenticUser, require("./routes/newFriends"))
app.post('/deleteData', require("./controllers/allData"))
// ? attaching the server to the messages sockets.
messages.attach(server)


const PORT = process.env.PORT || 5000
async function start(url) {
    try {
        await connection(url)
        server.listen(PORT, () => {
            console.log(`listening on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.log(err.message)
    }
}

start(MONGO_URI)