'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    static associate(models) {
      Pessoa.hasMany(models.Curso, {
        foreignKey: 'docente_id',
        as: 'cursosDocentes'
      });
      Pessoa.hasMany(models.Matricula, {
        foreignKey: 'estudante_id',
        //scope: {status: 'matriculado'}, // o scope serve para filtrar os dados que voce quer buscar de uma associação
        as: 'aulasMatriculadas' //O as serve para criar um apelido (alias) para a associação,  o Sequelize cria automaticamente métodos baseados nesse nome como: getAulasMatriculadas(); em PessoaServices.js
      });
    }
  }
  Pessoa.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    cpf: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoa',
    tableName: 'pessoas',
    paranoid: true, // este atributo serve para utilizarmos o soft delete no quando excluido algum registro no banco
    defaultScope: {
      where: { ativo: true,}  //defaultScope serve para criar um filtro padrão nos modelos, neste caso sempre que puxamos a lista de pessoas aparecerão apenas pessoas com a atributo 'ativo: true' não altera a tabela, apenas o modelo.
    },  
    scopes: {
      todosOsRegistros: {
        where: {}
      }
    }
  });
  return Pessoa;
};