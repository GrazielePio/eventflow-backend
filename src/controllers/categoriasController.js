const db = require('../database/db');

exports.getCategorias = (req, res) => {
  db.all('SELECT * FROM categorias', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.createCategoria = (req, res) => {
  const { nome } = req.body;
  if (!nome) return res.status(400).json({ error: 'Nome obrigatório' });
  db.run('INSERT INTO categorias (nome) VALUES (?)', [nome], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ id: this.lastID, nome });
  });
};

exports.updateCategoria = (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  db.run('UPDATE categorias SET nome = ? WHERE id = ?', [nome, id], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'Atualizado' });
  });
};

exports.deleteCategoria = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM categorias WHERE id = ?', [id], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'Deletado' });
  });
};