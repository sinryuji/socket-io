const http = require("http")
const { Server } = require("socket.io");
const express = require("express")
const path = require("path");
const Room = require("./room");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app)

const io = new Server(server);

const room = new Room();

io.on("connection", async (socket) => {
  const roomID = await room.joinRoom();
  socket.join(roomID);

  socket.on("send-message", (message) => {
    socket.to(roomID).emit("receive-message", message);
  });

  socket.on("disconnect", () => {
    room.leaveRoom(roomID);
  })
});

server.on("error", (err) => {
    console.log("Error opening server")
})

server.listen(8001, () => {
    console.log("Server working on port 8001")
})
