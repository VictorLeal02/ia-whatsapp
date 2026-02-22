const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("IA InfoeClima online 🚀");
});

app.post("/webhook", async (req, res) => {

  console.log(req.body);

  const mensagem =
    req.body?.text?.message || "Mensagem recebida";

  console.log("Mensagem:", mensagem);

  // resposta automática
  console.log("Responder aqui futuramente");

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});