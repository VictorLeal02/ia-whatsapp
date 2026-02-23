const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

// DADOS Z-API
const INSTANCE_ID = "3EF2706B104CF2716C3A4A6B9BCAE";
const TOKEN = "0761342768AE2DA4D80F8727";

// WEBHOOK
app.post("/webhook", async (req, res) => {

    console.log("Mensagem recebida:");

    const mensagem = req.body.text?.message;
    const telefone = req.body.phone;

    console.log("Telefone:", telefone);
    console.log("Mensagem:", mensagem);

    if (!mensagem) {
        return res.sendStatus(200);
    }

    try {

        await axios.post(
            `https://api.z-api.io/instances/${INSTANCE_ID}/token/${TOKEN}/send-text`,
            {
                phone: telefone,
                message: "Recebi sua mensagem: " + mensagem
            }
        );

        console.log("Resposta enviada");

    } catch (erro) {

        console.log("Erro envio:", erro.response?.data || erro.message);

    }

    res.sendStatus(200);

});

app.listen(PORT, () => {
    console.log("Servidor rodando na porta", PORT);
});