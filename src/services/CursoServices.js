const Services = require('./Services.js');

class CursoServices extends Services {
    constructor() {
        super('Curso');
    }

}

module.exports = CursoServices;

// este documento passa o modelo Curso para Services
// ou seja, todos os serviços agora serão voltados para o modelo Curso
// quando herdados e utilizados em algum lugar como por exemplo em CursoController.js