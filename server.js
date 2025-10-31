const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Importa rotas
const authRoutes = require('./src/routes/auth');
const categoriasRoutes = require('./src/routes/categorias');
const eventosRoutes = require('./src/routes/eventos');
const locaisRoutes = require('./src/routes/locais');

// Inicializa o app Express
const app = express();
const PORT = 3000; // Porta do servidor (altere se necessário)

// Middlewares
app.use(cors()); // Permite requisições do app React Native
app.use(bodyParser.json()); // Processa JSON nas requisições

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/eventos', eventosRoutes);
app.use('/api/locais', locaisRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API EventFlow rodando!');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});