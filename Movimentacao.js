const mongoose = require('mongoose');

// Define o esquema (estrutura) da movimentação
const movimentacaoSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true,
    enum: ['receita', 'despesa'] // só aceita esses dois valores
  },
  categoria: {
    type: String,
    required: true
  },
  valor: {
    type: Number,
    required: true,
    min: 0 // não deixa valores negativos
  },
  data: {
    type: Date,
    required: true
  }
}, {
  timestamps: true // cria automaticamente createdAt e updatedAt
});

// Cria o modelo Movimentacao baseado no schema
const Movimentacao = mongoose.model('Movimentacao', movimentacaoSchema);

// Exporta o modelo para ser usado em outros arquivos (como o server.js)
module.exports = Movimentacao;
