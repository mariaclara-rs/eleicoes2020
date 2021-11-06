
const Candidato = require('../models/candidato');
const { request } = require('express');

module.exports = {

    async cadastrar (request, response) {

        const {cpf, numTitulo, nome, dataNasc, fone, email, partido, cep, cidade, uf, rua, num, bairro, complemento} = request.body;
   
        let candidato = await Candidato.findOne({cpf});
        if (!candidato) {
            candidato = await Candidato.create({
                cpf,
                numTitulo,
                nome, 
                dataNasc,
                fone,
                email,
                partido,
                cep,
                cidade,
                uf,
                rua,
                num,
                bairro,
                complemento
            });
       
        }
        else
            candidato = null;
        return response.json(candidato);
    },

    async listar(request, response) {
        const candidatos = await Candidato.find();
        return response.json(candidatos);

    },

    async alterar(request,response){
        const {cpf, numTitulo, nome, dataNasc, fone, email, partido, cep, cidade, uf, rua, num, bairro, complemento} = request.body;
        const candidato = await Candidato.updateMany(
            {cpf:cpf},
            {
                numTitulo,
                nome, 
                dataNasc,
                fone,
                email,
                partido,
                cep,
                cidade,
                uf,
                rua,
                num,
                bairro,
                complemento
            }  
        );
        return response.json(candidato); 
    },

    async excluir(request, response){
        const {cpf} = request.params;
        const candidato = await Candidato.deleteMany({cpf: cpf});
        return response.json(candidato);
    }

    
}