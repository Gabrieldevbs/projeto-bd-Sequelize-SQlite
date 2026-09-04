// Instância do Sequelize configurada para usar SQLite
// Comentários: este arquivo cria a conexão com o DB e inicializa os models

const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
require('dotenv').config();

const storagePath = process.env.DATABASE_FILE || path.join(__dirname, '..', 'database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,
  logging: false, // desabilitar logs SQL por padrão
});

// Inicializa os models definidos em /src/models
const defineModels = require('./models');
const models = defineModels(sequelize, DataTypes);

module.exports = {
  sequelize,
  models,
};
