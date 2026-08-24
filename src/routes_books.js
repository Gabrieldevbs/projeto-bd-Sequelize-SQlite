// Rotas básicas para CRUD de livros
// Comentários: criação, listagem, detalhe, edição e remoção (verifica proprietário)

const express = require('express');
const { sequelize, models } = require('./db');
const auth = require('./auth_middleware');

const router = express.Router();

// Criar um novo livro (autenticado)
router.post('/books', auth, async (req, res) => {
  try {
    const { titulo, autor, editora, isbn, categoria, descricao, imagemCapa } = req.body;
    if (!titulo || !autor) return res.status(400).json({ error: 'titulo e autor são obrigatórios' });

    const livro = await models.Livro.create({
      usuarioId: req.user.id,
      titulo,
      autor,
      editora,
      isbn,
      categoria,
      descricao,
      imagemCapa,
      disponivel: true,
    });

    return res.status(201).json(livro);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno' });
  }
});

// Listar livros (público). Suporta query string ?q=texto para busca simples em título/autor
router.get('/books', async (req, res) => {
  try {
    const q = req.query.q;
    const where = {};
    if (q) {
      // busca simples usando LIKE (SQLite)
      where[sequelize.Op.or] = [
          { titulo: { [sequelize.Op.like]: `%${q}%` } },
          { autor: { [sequelize.Op.like]: `%${q}%` } },
      ];
    }

    const livros = await models.Livro.findAll({ where });
    return res.json(livros);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno' });
  }
});

// Detalhe do livro
router.get('/books/:id', async (req, res) => {
  try {
    const livro = await models.Livro.findByPk(req.params.id);
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });
    return res.json(livro);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno' });
  }
});

// Editar livro (somente proprietário)
router.put('/books/:id', auth, async (req, res) => {
  try {
    const livro = await models.Livro.findByPk(req.params.id);
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });
    if (livro.usuarioId !== req.user.id) return res.status(403).json({ error: 'Ação não permitida' });

    const updatable = ['titulo','autor','editora','isbn','categoria','descricao','imagemCapa','disponivel'];
    updatable.forEach((field) => {
      if (req.body[field] !== undefined) livro[field] = req.body[field];
    });

    await livro.save();
    return res.json(livro);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno' });
  }
});

// Remover livro (somente proprietário)
router.delete('/books/:id', auth, async (req, res) => {
  try {
    const livro = await models.Livro.findByPk(req.params.id);
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });
    if (livro.usuarioId !== req.user.id) return res.status(403).json({ error: 'Ação não permitida' });

    await livro.destroy();
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno' });
  }
});

module.exports = router;
