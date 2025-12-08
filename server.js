require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const Movimentacao = require("./models/Movimentacao");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB conectado!"))
  .catch(err => console.error("Erro ao conectar:", err));

app.get("/", (req, res) => {
  res.send("API do Gestor Financeiro está rodando!");
});

// LISTAR TUDO
app.get("/movimentacoes", async (req, res) => {
  const movimentacoes = await Movimentacao.find().sort({ data: -1 });
  res.json(movimentacoes);
});

// BUSCAR POR ID
app.get("/movimentacoes/:id", async (req, res) => {
  const item = await Movimentacao.findById(req.params.id);
  res.json(item);
});

// CRIAR
app.post("/movimentacoes", async (req, res) => {
  const nova = await Movimentacao.create(req.body);
  res.json(nova);
});

// EDITAR
app.put("/movimentacoes/:id", async (req, res) => {
  const atualizado = await Movimentacao.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(atualizado);
});

// DELETAR
app.delete("/movimentacoes/:id", async (req, res) => {
  await Movimentacao.findByIdAndDelete(req.params.id);
  res.json({ message: "Movimentação removida" });
});

app.listen(process.env.PORT, () =>
  console.log(`Servidor rodando na porta ${process.env.PORT}`)
);
    