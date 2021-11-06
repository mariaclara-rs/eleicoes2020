const mongoose = require('mongoose')

const UsuarioSchema = new mongoose.Schema({

    email: String,
    senha: String,
})

module.exports = mongoose.model('Usuario', UsuarioSchema);