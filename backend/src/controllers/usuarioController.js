const Usuario = require('../models/usuarios');
const { request } = require('express');

module.exports = {
    async listar(request, response){
        const {email, senha} = request.query;
       
        const us = await Usuario.findOne({
            senha: senha,
            email: email 
        });

        return response.json(us);
    },
    async listarporEmailSenha (request, response) {
        const {email, senha} = request.params;//quando passa parametro na rota
       
        let us = null;
        us = await Usuario.findOne({senha: senha});

        return response.json(us);

    },

}