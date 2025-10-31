const db = require('../database/db');

exports.getEventos = (req, res) => {
  const { search } = req.query;
  let query = `
    SELECT e.*, c.nome as categoriaNome, l.nome as localNome, l.latitude, l.longitude, l.endereco
    FROM eventos e
    LEFT JOIN categorias c ON e.categoriaId = c.id
    LEFT JOIN locais l ON e.localId = l.id
  `;
  const params = [];
  if (search) {
    query += ' WHERE e.nome LIKE ? OR c.nome LIKE ?';
    params.push(`%${search}%`, `%${search}%`);
  }
  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows.map(row => ({
      id: row.id,
      nome: row.nome,
      descricao: row.descricao,
      data: row.data,
      hora: row.hora,
      preco: row.preco,
      categoriaId: row.categoriaId,
      localId: row.localId,
      imagem: row.imagem,
      categoria: { nome: row.categoriaNome },
      local: { nome: row.localNome, latitude: row.latitude, longitude: row.longitude, endereco: row.endereco }
    })));
  });
};

exports.getEventoById = (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT e.*, c.nome as categoriaNome, l.nome as localNome, l.latitude, l.longitude, l.endereco
    FROM eventos e
    LEFT JOIN categorias c ON e.categoriaId = c.id
    LEFT JOIN locais l ON e.localId = l.id
    WHERE e.id = ?
  `;
  db.get(query, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Evento não encontrado' });
    res.json({
      id: row.id,
      nome: row.nome,
      descricao: row.descricao,
      data: row.data,
      hora: row.hora,
      preco: row.preco,
      categoriaId: row.categoriaId,
      localId: row.localId,
      imagem: row.imagem,
      categoria: { nome: row.categoriaNome },
      local: { nome: row.localNome, latitude: row.latitude, longitude: row.longitude, endereco: row.endereco }
    });
  });
};

exports.createEvento = (req, res) => {
  const { nome, descricao, data, hora, preco, categoriaId, localId, imagem } = req.body;
  if (!nome || !descricao || !data || !hora || !preco || !categoriaId || !localId) return res.status(400).json({ error: 'Campos obrigatórios' });
  db.run('INSERT INTO eventos (nome, descricao, data, hora, preco, categoriaId, localId, imagem) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [nome, descricao, data, hora, preco, categoriaId, localId, imagem], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ id: this.lastID, nome, descricao, data, hora, preco, categoriaId, localId, imagem });
  });
};

exports.updateEvento = (req, res) => {
  const { id } = req.params;
  const { nome, descricao, data, hora, preco, categoriaId, localId, imagem } = req.body;
  db.run('UPDATE eventos SET nome = ?, descricao = ?, data = ?, hora = ?, preco = ?, categoriaId = ?, localId = ?, imagem = ? WHERE id = ?', [nome, descricao, data, hora, preco, categoriaId, localId, imagem, id], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'Atualizado' });
  });
};

exports.deleteEvento = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM eventos WHERE id = ?', [id], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'Deletado' });
  });
};