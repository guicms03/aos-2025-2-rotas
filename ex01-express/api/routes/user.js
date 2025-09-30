// routes/user.js
import express from'express';
const router= express.Router();
import models from "../models/index.js"

// Create user
router.post('/', async (req, res) => {
  try {
    const user = await models.User.create(req.body);
    res.status(201).json(user); // 201 Created
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' }); // 500
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await models.User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// Get user by id
router.get('/:id', async (req, res) => {
  try {
    const user = await models.User.findByPk(req.params.id);
    if (user) return res.json(user);
    res.status(404).json({ error: 'Usuário não encontrado' }); // 404
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const user = await models.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const user = await models.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    await user.destroy();
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
});

export default router
