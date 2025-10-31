const db = require('../database/db');

// Função de registro
exports.register = (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) return res.status(400).json({ error: 'Campos obrigatórios' });

  db.run(`INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)`, [nome, email, senha], function(err) {
    if (err) return res.status(400).json({ error: 'Usuário já existe ou erro' });
    res.json({ id: this.lastID, nome, email });
  });
};

// Função de login
exports.login = (req, res) => {
  const { email, senha } = req.body;
  db.get(`SELECT * FROM users WHERE email = ? AND senha = ?`, [email, senha], (err, user) => {
    if (err || !user) return res.status(401).json({ error: 'Credenciais inválidas' });
    res.json({ id: user.id, nome: user.nome, email: user.email });
  });
};

// Função de atualização
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  db.run(`UPDATE users SET nome = ?, email = ?, senha = ? WHERE id = ?`, [nome, email, senha, id], function(err) {
    if (err) return res.status(400).json({ error: 'Erro ao atualizar' });
    res.json({ message: 'Atualizado' });
  });
};