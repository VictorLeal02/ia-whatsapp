const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const INSTANCE_ID = process.env.ZAPI_INSTANCE_ID;
const TOKEN = process.env.ZAPI_TOKEN;

app.get("/", (req, res) => {
  res.send("IA InfoeClima online 🚀");
});

app.post("/webhook", async (req, res) => {

  console.log("Mensagem recebida:");
  console.log(req.body);

  try {

    const telefone = req.body.phone;
    const mensagem = req.body.text?.message;

    if (!telefone || !mensagem) {
      return res.sendStatus(200);
    }

    console.log("Telefone:", telefone);
    console.log("Mensagem:", mensagem);

    let resposta = "Olá! 👋\n\nSomos a Info&Clima.\nComo podemos ajudar?\n\n1 - Instalação\n2 - Manutenção\n3 - Orçamento";

    await axios.post(
      `https://api.z-api.io/instances/${INSTANCE_ID}/token/${TOKEN}/send-text`,
      {
        phone: telefone,
        message: resposta
      }
    );

    console.log("Resposta enviada");

  } catch (erro) {
    console.log("Erro:", erro.message);
  }

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});