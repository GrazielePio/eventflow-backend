const db = require('../database/db');

exports.getLocais = (req, res) => {
  db.all('SELECT * FROM locais', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.createLocal = (req, res) => {
  const { nome, latitude, longitude, endereco } = req.body;
  if (!nome || !latitude || !longitude) return res.status(400).json({ error: 'Campos obrigatórios' });
  db.run('INSERT INTO locais (nome, latitude, longitude, endereco) VALUES (?, ?, ?, ?)', [nome, latitude, longitude, endereco], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ id: this.lastID, nome, latitude, longitude, endereco });
  });
};

exports.updateLocal = (req, res) => {
  const { id } = req.params;
  const { nome, latitude, longitude, endereco } = req.body;
  db.run('UPDATE locais SET nome = ?, latitude = ?, longitude = ?, endereco = ? WHERE id = ?', [nome, latitude, longitude, endereco, id], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'Atualizado' });
  });
};

exports.deleteLocal = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM locais WHERE id = ?', [id], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'Deletado' });
  });
};

exports.getLocalById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM locais WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row || {});
  });
};