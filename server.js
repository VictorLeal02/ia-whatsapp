const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// PORTA DO RAILWAY
const PORT = process.env.PORT || 3000;

// DADOS DA Z-API (SEUS DADOS)
const INSTANCE = "3EF2706B104CF2716C3C3A4A6B9BCAE";
const TOKEN = "0761342768AE2DA4D80F8727";

// WEBHOOK (recebe mensagem do WhatsApp)
app.post("/", async (req, res) => {

    try {

        console.log("Mensagem recebida:", req.body);

        // Pega telefone
        const telefone =
            req.body.phone ||
            req.body.from ||
            req.body.sender ||
            "";

        // Pega mensagem
        const mensagem =
            req.body.text?.message ||
            req.body.message ||
            "";

        // Limpa telefone
        const telefoneLimpo = String(telefone).replace(/\D/g, "");

        console.log("Telefone:", telefoneLimpo);
        console.log("Mensagem:", mensagem);

        if (!telefoneLimpo || !mensagem) {
            return res.send("OK");
        }

        // ENVIA RESPOSTA WHATSAPP
        await axios.post(
            `https://api.z-api.io/instances/${INSTANCE}/token/${TOKEN}/send-message`,
            {
                phone: telefoneLimpo,
                message: "Olá! Recebi sua mensagem: " + mensagem
            }
        );

        res.send("OK");

    } catch (erro) {

        console.log("Erro:", erro.response?.data || erro.message);

        res.send("OK");
    }

});

app.listen(PORT, () => {
    console.log("Servidor rodando na porta", PORT);
});