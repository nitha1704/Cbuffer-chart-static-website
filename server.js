const app = require("express")();
const server = require("http").createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

let tick = 0;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Cbuffer_graph/ex1.html");
});

io.on("connection", (socket) => {
  console.log("server connected");
  socket.removeAllListeners();

  setInterval(() => {
    let item = {
      randomNumber: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 30,
      scoreValue: Math.floor(Math.random() * 3),
    };
    socket.emit("chartData", item);
  }, 1 / 100);

  socket.on("connected", (userName) => {
    console.log("connected");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
