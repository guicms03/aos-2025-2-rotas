// routes/message.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const User = require('../models/User');

// Create message
router.post('/', async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json(message); // 201 Created
  } catch (error) {
    console.error('Erro ao criar mensagem:', error);
    res.status(500).json({ error: 'Erro interno do servidor' }); // 500
  }
});

// Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.findAll({ include: User });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar mensagens' });
  }
});

// Get message by id
router.get('/:id', async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id, { include: User });
    if (message) return res.json(message);
    res.status(404).json({ error: 'Mensagem não encontrada' }); // 404
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Update message
router.put('/:id', async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (!message) return res.status(404).json({ error: 'Mensagem não encontrada' });

    await message.update(req.body);
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar mensagem' });
  }
});

// Delete message
router.delete('/:id', async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (!message) return res.status(404).json({ error: 'Mensagem não encontrada' });

    await message.destroy();
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar mensagem' });
  }
});

module.exports = router;
