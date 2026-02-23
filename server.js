// server.js
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

// ✅ SEUS DADOS (você pediu pra preencher aqui)
const INSTANCE_ID = "3EF2706B104CF2716C3C3A4A6B9BCAAE";
const INSTANCE_TOKEN = "0761342768AE2DA4D80F8727";
const CLIENT_TOKEN = "F5cb02add35364af981c7fc7a8161647dS";

// Envia mensagem de texto pela Z-API
async function sendText(phone, message) {
  const url = `https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-text`;

  return axios.post(
    url,
    { phone, message },
    {
      headers: {
        "Content-Type": "application/json",
        "Client-Token": CLIENT_TOKEN,
      },
      timeout: 15000,
    }
  );
}

// Menu principal
function menu() {
  return (
    "👋 Olá! Sou a *Info & Clima*.\n\n" +
    "Escolha uma opção:\n" +
    "1️⃣ *Instalação*\n" +
    "2️⃣ *Manutenção*\n" +
    "3️⃣ *Limpeza*\n" +
    "4️⃣ *Fazer orçamento*\n\n" +
    "Responda com *1, 2, 3 ou 4*."
  );
}

// Respostas de cada opção
function respostaOpcao(opcao) {
  switch (opcao) {
    case "1":
      return (
        "✅ *Instalação*\n" +
        "• R$700 até 3 metros de tubulação.\n\n" +
        "Se quiser, me diga:\n" +
        "📍 Bairro/Cidade\n" +
        "❄️ BTUs do ar\n" +
        "🏠 Local (casa/apto)\n" +
        "📸 Pode enviar fotos do local."
      );

    case "2":
      return (
        "🛠️ *Manutenção*\n" +
        "Me diga qual problema está acontecendo (ex: não gela, pinga água, faz barulho, erro no display).\n" +
        "📍 Informe bairro/cidade e, se puder, mande fotos/vídeo."
      );

    case "3":
      return (
        "🧼 *Limpeza*\n" +
        "• R$400.\n\n" +
        "Para agendar, me diga:\n" +
        "📍 Bairro/Cidade\n" +
        "📅 Melhor dia/horário"
      );

    case "4":
      return (
        "📋 *Orçamento*\n" +
        "Para eu te passar certinho, me envie:\n" +
        "1) 📍 Bairro/Cidade\n" +
        "2) ❄️ BTUs do aparelho\n" +
        "3) 🏠 Local (casa/apto)\n" +
        "4) 📏 Distância aproximada de tubulação\n" +
        "5) 📸 Fotos do local (onde vai ficar interno e externo)"
      );

    default:
      return null;
  }
}

// Webhook (coloque esse endpoint no Z-API -> Ao receber)
app.post("/webhook", async (req, res) => {
  try {
    const phone = req.body?.phone;
    const text =
      req.body?.text?.message ||
      req.body?.message ||
      req.body?.body ||
      "";

    console.log("Recebido:", { phone, text });

    if (!phone) {
      return res.status(200).json({ ok: true, info: "payload sem phone" });
    }

    const msg = String(text).trim().toLowerCase();

    // Se mandou 1/2/3/4 responde a opção
    const opcao = msg.replace(/[^\d]/g, ""); // pega só números
    const resp = respostaOpcao(opcao);

    if (resp) {
      await sendText(phone, resp);
    } else {
      // Qualquer outra coisa -> manda o menu
      await sendText(phone, menu());
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.log("Erro:", err?.response?.data || err?.message);
    return res.status(200).json({ ok: false });
  }
});

app.get("/", (req, res) => {
  res.send("OK - Bot Info & Clima online ✅");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Servidor rodando na porta", PORT);
});