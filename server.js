const express = require("express");
const http = require("http");
const socket = require("socket.io");

const PORT = 5000;

const app = express();
const server = http.createServer(app);

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
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
