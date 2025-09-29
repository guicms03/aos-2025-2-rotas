const express = require('express');
const app = express();
const sequelize = require('./config/database');

// Middlewares
app.use(express.json());

// Rotas
app.use('/user', require('./routes/user'));
app.use('/message', require('./routes/message'));

// Conecta e sincroniza o banco
sequelize.sync()
  .then(() => {
    console.log('Conectado ao banco com sucesso.');
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar no banco:', err);
  });
