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
      "Seja bem-vindo ao quiz do Campeonato Mineiro 2025! Clique no botão acima para começar.",
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
    const formattedMessage = `
      <strong>${question.question.title}</strong><br>
      <ul style="list-style: none; padding: 0; text-align: left;">
        <li><strong>A)</strong> ${question.question.options.a}</li>
        <li><strong>B)</strong> ${question.question.options.b}</li>
        <li><strong>C)</strong> ${question.question.options.c}</li>
        <li><strong>D)</strong> ${question.question.options.d}</li>
      </ul>
    `;

    socket.emit("receivedMessage", {
      author,
      message: formattedMessage,
    });
  } else {
    socket.emit("receivedMessage", {
      author,
      message: `<strong>Quiz finalizado!</strong><br>Sua pontuação: ${score}/${questions.length}`,
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
