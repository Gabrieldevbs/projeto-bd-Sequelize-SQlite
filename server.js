// Entry point do servidor. Faz a sincronização do banco antes de subir o servidor.
// Comentários: sincronizar o Sequelize garante que as tabelas (models) existam no DB

require('dotenv').config();
const app = require('./src/app');
const { sequelize } = require('./src/db');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    // Sincroniza modelos com o banco de dados (cria tabelas se necessário)
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Servidor escutando na porta ${PORT}`);
    });
  } catch (err) {
    console.error('Erro ao inicializar banco de dados:', err);
    process.exit(1);
  }
})();
