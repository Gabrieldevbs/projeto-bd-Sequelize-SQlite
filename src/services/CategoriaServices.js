const Services = require('./Services.js');

class CategoriaServices extends Services {
    constructor() {
        super('Categoria');
    }
}

module.exports = CategoriaServices;

// este documento passa o modelo Categoria para Services
// ou seja, todos os serviços agora serão voltados para o modelo Categoria
// quando herdados e utilizados em algum lugar como por exemplo em CategoriaController.js