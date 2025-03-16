const express = require("express");
const path = require("path");
const { questions } = require("./questions.json");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use("/", (req, res) => {
  res.render("index.html");
});

const author = "Server";

io.on("connection", (socket) => {
  console.log(`Socket conectado: ${socket.id}`);
  var text =
    "Seja bem-vindo ao quiz do Campeonato Mineiro 2025! Digite 1 para começar";
  var serverMessage = {
    author: author,
    message: text,
  };
  socket.emit("receivedMessage", serverMessage);

  socket.on("sendMessage", (data) => {
    currentMessage = data.message;
    if (currentMessage == "1") {
      for (let i = 1; i <= questions.length; i++) {
        question = renderQuestion(i);
        serverMessage.message = question.title;
        socket.emit("receivedMessage", serverMessage);
      }
    }
  });
});

function renderQuestion(id) {
  const question = questions.find((q) => q.question.id === id);
  return question ? question.question : null;
}

server.listen(3000);
