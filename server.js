const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ONLINE ✅");
});

// Z-API vai chamar esse endpoint
app.post("/webhook", async (req, res) => {
  try {
    console.log("Webhook recebido:", JSON.stringify(req.body, null, 2));

    // tenta pegar telefone e mensagem de várias formas (porque o payload muda)
    const phone =
      req.body?.phone ||
      req.body?.from ||
      req.body?.sender?.phone ||
      req.body?.sender?.id ||
      "";

    const message =
      req.body?.text?.message ||
      req.body?.message ||
      req.body?.body ||
      req.body?.text ||
      "";

    console.log("Telefone:", phone);
    console.log("Mensagem:", message);

    // responde OK pro Z-API (importante)
    return res.sendStatus(200);
  } catch (err) {
    console.log("Erro webhook:", err?.message || err);
    return res.sendStatus(200);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando na porta", PORT));