// Arquivo principal da aplicação Express (configura middlewares e rotas)
// Comentários: este arquivo registra os middlewares globais e monta as rotas

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Observação: os arquivos de rota estão no nível src/ neste esqueleto inicial
const authRoutes = require('./routes_auth');
const bookRoutes = require('./routes_books');

const app = express();

// Middlewares básicos: JSON body parsing, CORS e segurança HTTP headers
app.use(express.json());
app.use(cors());
app.use(helmet());

// Rotas públicas/sem autenticação
app.get('/teste', (req, res) => {
  // Rota de teste simples para verificar se a API está no ar
  res.status(200).send({ mensagem: 'boas-vindas à API' });
});

// Rotas moduladas (auth, books)
app.use(authRoutes);
app.use(bookRoutes);

module.exports = app;
