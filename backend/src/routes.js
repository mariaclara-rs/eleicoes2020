const { Router } = require('express');
const routes = Router();

const candidatoController = require('./controllers/candidatoController');
const usuarioController = require('./controllers/usuarioController');

//para cadastrar
routes.post('/candidatos', candidatoController.cadastrar);

//para listar
routes.get('/candidatos', candidatoController.listar);

routes.put('/candidatos',candidatoController.alterar);

routes.delete('/candidatos/:cpf',candidatoController.excluir);

routes.get('/usuarios/pesquisa', usuarioController.listar);
//login
routes.get('/usuarios/:email/:senha', usuarioController.listarporEmailSenha);


module.exports = routes;