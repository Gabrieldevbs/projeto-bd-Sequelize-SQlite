const dataSource = require('../database/models');

class Services {
    constructor(nomeDoModel) {
        this.model = nomeDoModel;
    }

    // busca todos os resgistros de um modelo
    async pegaTodosOsRegistros() {
        return dataSource[this.model].findAll();
    }

    async pegaRegistrosPorEscopo(escopo) {
        return dataSource[this.model].scope(escopo).findAll();
    }

    async pegaUmRegistroPorId(id) {
        return dataSource[this.model].findByPk(id);
    }

    // cria um novo registro no modelo
    async criaRegistro(dadosDoRegistro){
        return dataSource[this.model].create(dadosDoRegistro);
    }

    async atualizaRegistro(dadosAtualizados, id) {
        const listaDeResgistroAtualizado = dataSource[this.model].update(dadosAtualizados, {
            where : { id : id}
        });
        if(listaDeResgistroAtualizado[0] === 0){
            return false;
        }
        return true;
    }

    // exclui um novo registro do modelo
    async excluiRegistro(id) {  
        return dataSource[this.model].destroy({ where: { id:id } });
    }
}

module.exports = Services;