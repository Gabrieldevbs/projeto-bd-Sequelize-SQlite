const Services = require('./Services.js');

class MatriculaServices extends Services {
    constructor() {
        super('Matricula');
    }
}

module.exports = MatriculaServices;

// este documento passa o modelo Matricula para Services
// ou seja, todos os serviços agora serão voltados para o modelo Matricula
// quando herdados e utilizados em algum lugar como por exemplo em MatriculaController.js