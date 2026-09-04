-- SQL inicial de referência para o esquema MVP (SQLite / Postgres compatível com pequenos ajustes)

CREATE TABLE usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  senha_hash TEXT NOT NULL,
  curso VARCHAR(100),
  reputacao DECIMAL(2,1) DEFAULT 5.0,
  ativo BOOLEAN DEFAULT TRUE,
  createdAt DATETIME,
  updatedAt DATETIME
);

CREATE TABLE livros (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuarioId INTEGER NOT NULL,
  titulo VARCHAR(200) NOT NULL,
  autor VARCHAR(150) NOT NULL,
  editora VARCHAR(150),
  isbn VARCHAR(30),
  categoria VARCHAR(80),
  descricao TEXT,
  imagemCapa TEXT,
  estadoConservacao VARCHAR(50),
  disponivel BOOLEAN DEFAULT TRUE,
  createdAt DATETIME,
  updatedAt DATETIME,
  FOREIGN KEY(usuarioId) REFERENCES usuarios(id)
);

CREATE TABLE solicitacoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  livroId INTEGER NOT NULL,
  solicitanteId INTEGER NOT NULL,
  mensagem TEXT,
  status INTEGER NOT NULL DEFAULT 0,
  createdAt DATETIME,
  updatedAt DATETIME,
  FOREIGN KEY(livroId) REFERENCES livros(id),
  FOREIGN KEY(solicitanteId) REFERENCES usuarios(id)
);

CREATE TABLE emprestimos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  livroId INTEGER NOT NULL,
  proprietarioId INTEGER NOT NULL,
  leitorId INTEGER NOT NULL,
  dataInicio DATETIME NOT NULL,
  dataPrevista DATETIME NOT NULL,
  dataDevolucao DATETIME,
  status INTEGER NOT NULL DEFAULT 0,
  createdAt DATETIME,
  updatedAt DATETIME,
  FOREIGN KEY(livroId) REFERENCES livros(id),
  FOREIGN KEY(proprietarioId) REFERENCES usuarios(id),
  FOREIGN KEY(leitorId) REFERENCES usuarios(id)
);
