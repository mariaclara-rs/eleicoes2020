
const mongoose = require('mongoose');

const CandidatoSchema = new mongoose.Schema({
    cpf: String,
    numTitulo: String,
    nome: String, 
    dataNasc: String,
    fone: String,
    email: String,
    partido: String,
    cep: String,
    cidade: String,
    uf: String,
    rua: String,
    num: Number,
    bairro: String,
    complemento: String,
})

module.exports = mongoose.model('Candidato', CandidatoSchema);
