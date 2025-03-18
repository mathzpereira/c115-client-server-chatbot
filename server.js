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
let score = 0;
let currentQuestionIndex = -1;

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.emit("receivedMessage", {
    author,
    message:
      "Seja bem-vindo ao quiz do Campeonato Mineiro 2025! Digite '1' para começar",
  });

  socket.on("sendMessage", (data) => {
    let message = data.message.toLowerCase().trim();
    if (message === "1" && currentQuestionIndex === -1) {
      currentQuestionIndex = 0;
      sendQuestion(socket);
    } else if (
      currentQuestionIndex >= 0 &&
      currentQuestionIndex < questions.length
    ) {
      checkAnswer(socket, message);
    }
  });
});

function sendQuestion(socket) {
  if (currentQuestionIndex < questions.length) {
    const question = questions[currentQuestionIndex];
    socket.emit("receivedMessage", {
      author,
      message: `${question.question.title}\nA) ${question.question.options.a}\nB) ${question.question.options.b}\nC) ${question.question.options.c}\nD) ${question.question.options.d}`,
    });
  } else {
    socket.emit("receivedMessage", {
      author,
      message: `Quiz finalizado! Sua pontuação: ${score}/${questions.length}`,
    });
    score = 0;
    currentQuestionIndex = -1;
  }
}

function checkAnswer(socket, answer) {
  const validAnswers = ["a", "b", "c", "d"];
  if (!validAnswers.includes(answer)) {
    socket.emit("receivedMessage", {
      author,
      message:
        "Resposta inválida! Por favor, responda com 'a', 'b', 'c' ou 'd'.",
    });
    return;
  }

  const question = questions[currentQuestionIndex];
  if (
    question &&
    (Array.isArray(question.question.answer)
      ? question.question.answer.includes(answer)
      : answer === question.question.answer)
  ) {
    score++;
  }
  currentQuestionIndex++;
  sendQuestion(socket);
}

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
