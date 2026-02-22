const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

const INSTANCE = "3EF2706B104CF2716C3C3A4A6B9BCAE";
const TOKEN = "0761342768AE2DA4D80F8727";

app.get("/", (req, res) => {
 res.send("IA InfoClima online 🚀");
});

app.post("/webhook", async (req, res) => {

 console.log(req.body);

 const mensagem = req.body.text?.message;
 const telefone = req.body.phone;

 if(mensagem){

   await axios.post(
     `https://api.z-api.io/instances/${INSTANCE}/token/${TOKEN}/send-text`,
     {
       phone: telefone,
       message: "Olá! Recebi: " + mensagem
     }
   );

 }

 res.sendStatus(200);

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
 console.log("Servidor rodando na porta", PORT);
});