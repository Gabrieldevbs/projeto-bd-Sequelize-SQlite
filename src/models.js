// Definição dos models principais usados no MVP
// Comentários: define Usuario, Livro, Solicitacao e Emprestimo com associações básicas

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(150), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    senha_hash: { type: DataTypes.TEXT, allowNull: false },
    curso: { type: DataTypes.STRING(100), allowNull: true },
    reputacao: { type: DataTypes.DECIMAL(2,1), defaultValue: 5.0 },
    ativo: { type: DataTypes.BOOLEAN, defaultValue: true },
  }, {
    tableName: 'usuarios',
    timestamps: true,
  });

  const Livro = sequelize.define('Livro', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuarioId: { type: DataTypes.INTEGER, allowNull: false },
    titulo: { type: DataTypes.STRING(200), allowNull: false },
    autor: { type: DataTypes.STRING(150), allowNull: false },
    editora: { type: DataTypes.STRING(150) },
    isbn: { type: DataTypes.STRING(30) },
    categoria: { type: DataTypes.STRING(80) },
    descricao: { type: DataTypes.TEXT },
    imagemCapa: { type: DataTypes.TEXT },
    estadoConservacao: { type: DataTypes.STRING(50) },
    disponivel: { type: DataTypes.BOOLEAN, defaultValue: true },
  }, {
    tableName: 'livros',
    timestamps: true,
  });

  const Solicitacao = sequelize.define('Solicitacao', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    livroId: { type: DataTypes.INTEGER, allowNull: false },
    solicitanteId: { type: DataTypes.INTEGER, allowNull: false },
    mensagem: { type: DataTypes.TEXT },
    status: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }, // 0=pendente,1=aprovada,2=recusada
  }, {
    tableName: 'solicitacoes',
    timestamps: true,
  });

  const Emprestimo = sequelize.define('Emprestimo', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    livroId: { type: DataTypes.INTEGER, allowNull: false },
    proprietarioId: { type: DataTypes.INTEGER, allowNull: false },
    leitorId: { type: DataTypes.INTEGER, allowNull: false },
    dataInicio: { type: DataTypes.DATE, allowNull: false },
    dataPrevista: { type: DataTypes.DATE, allowNull: false },
    dataDevolucao: { type: DataTypes.DATE, allowNull: true },
    status: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }, // 0=ativo,1=finalizado
  }, {
    tableName: 'emprestimos',
    timestamps: true,
  });

  // Associações
  Usuario.hasMany(Livro, { foreignKey: 'usuarioId' });
  Livro.belongsTo(Usuario, { foreignKey: 'usuarioId' });

  Livro.hasMany(Solicitacao, { foreignKey: 'livroId' });
  Solicitacao.belongsTo(Livro, { foreignKey: 'livroId' });

  Usuario.hasMany(Solicitacao, { foreignKey: 'solicitanteId' });
  Solicitacao.belongsTo(Usuario, { foreignKey: 'solicitanteId' });

  Livro.hasMany(Emprestimo, { foreignKey: 'livroId' });
  Emprestimo.belongsTo(Livro, { foreignKey: 'livroId' });

  Usuario.hasMany(Emprestimo, { foreignKey: 'proprietarioId', as: 'emprestimosProprietario' });
  Usuario.hasMany(Emprestimo, { foreignKey: 'leitorId', as: 'emprestimosLeitor' });

  Emprestimo.belongsTo(Usuario, { foreignKey: 'proprietarioId', as: 'proprietario' });
  Emprestimo.belongsTo(Usuario, { foreignKey: 'leitorId', as: 'leitor' });

  return {
    Usuario,
    Livro,
    Solicitacao,
    Emprestimo,
  };
};
