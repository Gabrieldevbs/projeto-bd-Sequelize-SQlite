const Services = require('./Services.js');

class PessoaServices extends Services {
    constructor() {
        super('Pessoa');
    }

    async pegaMatriculasPorEstudante(id) {
        const estudante = await super.pegaUmRegistroPorId(id);
        const listaMatriculas = await estudante.getAulasMatriculadas();
        return listaMatriculas;
    }

      async pegaCursosPorDocente(id) {
        const docente = await super.pegaUmRegistroPorId(id);
        const listaCursos = await docente.getCursosDocentes();
        return listaCursos;
    }

    async pegaPessoasEscopoTodos(){
        const listaPessoas = await super.pegaRegistrosPorEscopo('todosOsRegistros');
        return listaPessoas;
    }
}

module.exports = PessoaServices;

// este documento passa o modelo Pessoa para Services
// ou seja, todos os serviços agora serão voltados para o modelo Pessoa
// quando herdados e utilizados em algum lugar como por exemplo em PessoaController.js