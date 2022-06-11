const express = require("express");
const http = require("http");
const socket = require("socket.io");
const mongoose = require("mongoose");
const PORT = 5000;
const cors = require("cors");
const bodyparser = require("body-parser");
const app = express();
app.use(cors());
app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);
app.use(bodyparser.json());
const server = http.createServer(app);

mongoose.connect(
  "mongodb://localhost:27017/collab-compiler",
  { useNewUrlParser: true },
  () => {
    // console.log("DB is connected");
  }
);

const Detail = require("./models");
const { urlencoded } = require("body-parser");

async function getTeacher() {
  teacher = await Detail.find({ isTeacher: true });
  student = await Detail.find({ isTeacher: false });
}

let teacher = [];
let student = [];
getTeacher();
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
  socket.on("lockreq", (pos) => {
    socket.broadcast.emit("lock", pos);
  });
  socket.on("unlockreq", (pos) => {
    socket.broadcast.emit("unlock", pos);
  });
});

server.listen(PORT, () => {
  // console.log(`Listening on port ${PORT}`);
});

app.post("/auth", (req, res, next) => {
  const { email, password } = req.body;
  for (let i = 0; i < teacher.length; i++) {
    if (email == teacher[i].email && password == teacher[i].password) {
      res.send("Teacher");
    } else if (email == student[i].email && password == student[i].password) {
      res.send("Student");
    }
  }
});
