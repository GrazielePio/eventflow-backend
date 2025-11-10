const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./eventflow.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err.message);
  } else {
    console.log('Conectado ao banco SQLite.');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS categorias (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS locais (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      endereco TEXT,
      cep TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS eventos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT NOT NULL,
      data TEXT NOT NULL,
      hora TEXT NOT NULL,
      preco REAL NOT NULL,
      categoriaId INTEGER,
      localId INTEGER,
      imagem TEXT,
      FOREIGN KEY (categoriaId) REFERENCES categorias(id),
      FOREIGN KEY (localId) REFERENCES locais(id)
    )
  `);

  db.run(`INSERT OR IGNORE INTO categorias (id, nome) VALUES (1, 'Música'), (2, 'Esportes'), (3, 'Cultura')`);
  db.run(`INSERT OR IGNORE INTO locais (id, nome, latitude, longitude, endereco, cep) VALUES (1, 'Estrada de Ferro Madeira Mamoré', -8.77616, -63.91146, 'Porto Velho, RO', '76801-000')`);
});

module.exports = db;