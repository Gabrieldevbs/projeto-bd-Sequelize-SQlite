// Rotas de autenticação (registro e login)
// Comentários: implementa registro (hash de senha) e login (gera JWT)

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { models } = require('./db');
require('dotenv').config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'trocar_em_producao';

// Registro de usuário
router.post('/auth/register', async (req, res) => {
  try {
    const { nome, email, senha, curso } = req.body;
    if (!nome || !email || !senha) return res.status(400).json({ error: 'nome, email e senha são obrigatórios' });

    const existing = await models.Usuario.findOne({ where: { email } });
    if (existing) return res.status(409).json({ error: 'E-mail já cadastrado' });

    const senha_hash = await bcrypt.hash(senha, 10);
    const user = await models.Usuario.create({ nome, email, senha_hash, curso });

    // não retornar o hash de senha na resposta
    const { senha_hash: _, ...userData } = user.toJSON();
    return res.status(201).json(userData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno' });
  }
});

// Login autenticado via email + senha
router.post('/auth/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ error: 'email e senha são obrigatórios' });

    const user = await models.Usuario.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

    const match = await bcrypt.compare(senha, user.senha_hash);
    if (!match) return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    const { senha_hash: _, ...userData } = user.toJSON();
    return res.json({ user: userData, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno' });
  }
});

module.exports = router;
