const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

// Z-API
const INSTANCE_ID = "3EF2706B104CF2716C3C3A4A6B9BCAAE";
const TOKEN = "0761342768AE2DA4D80F8727";

// PEGUE NO PAINEL Z-API: Menu esquerdo -> Segurança -> Client-Token
const CLIENT_TOKEN = "F5cb02add35364af981c7fc7a8161647dS";

app.post("/webhook", async (req, res) => {
  try {
    const mensagem = req.body?.text?.message;
    const telefone = req.body?.phone;

    console.log("Mensagem recebida:", mensagem);
    console.log("Telefone:", telefone);

    if (!mensagem || !telefone) return res.sendStatus(200);

    await axios.post(
      `https://api.z-api.io/instances/${INSTANCE_ID}/token/${TOKEN}/send-text`,
      {
        phone: telefone,
        message: `Recebi: ${mensagem}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "client-token": CLIENT_TOKEN, // <- ESSENCIAL
        },
      }
    );

    console.log("Resposta enviada ✅");
    return res.sendStatus(200);
  } catch (err) {
    console.log("Erro envio:", err.response?.data || err.message);
    return res.sendStatus(200);
  }
});

app.listen(PORT, () => console.log("Servidor rodando na porta", PORT));