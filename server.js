const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// DADOS Z-API
const INSTANCE_ID = "3EF2706B104CF2716C3C3A4A6B9BCAE";
const TOKEN = "0761342768AE2DA4D80F8727";

app.post("/webhook", async (req, res) => {

    try {

        console.log("Mensagem recebida:");

        const mensagem = req.body.text?.message;
        const telefone = req.body.phone;

        console.log("Telefone:", telefone);
        console.log("Mensagem:", mensagem);

        if (!mensagem) {
            return res.sendStatus(200);
        }

        let resposta = "Olá! Sou a IA da Info&Clima 👋\nComo posso ajudar?";

        if (mensagem.toLowerCase().includes("oi")) {
            resposta = "Olá! 👋\nInfo&Clima aqui.\nPrecisa de ar condicionado ou energia solar?";
        }

        if (mensagem.toLowerCase().includes("preço")) {
            resposta = "Para orçamento mande:\n\n✔ Tipo de serviço\n✔ Bairro\n✔ Fotos se possível";
        }

        await axios.post(
            `https://api.z-api.io/instances/${INSTANCE_ID}/token/${TOKEN}/send-text`,
            {
                phone: telefone,
                message: resposta
            }
        );

        console.log("Resposta enviada!");

        res.sendStatus(200);

    } catch (erro) {

        console.log("Erro:", erro.message);

        res.sendStatus(200);

    }

});

app.listen(PORT, () => {
    console.log("Servidor rodando na porta", PORT);
});