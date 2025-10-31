const sqlite3 = require('sqlite3').verbose();

// Cria/abre o banco de dados (arquivo eventflow.db na raiz do backend)
const db = new sqlite3.Database('./eventflow.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err.message);
  } else {
    console.log('Conectado ao banco SQLite.');
  }
});

// Cria tabelas se não existirem (baseado nos seus serviços atuais)
db.serialize(() => {
  // Tabela de usuários
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL
    )
  `);

  // Tabela de categorias
  db.run(`
    CREATE TABLE IF NOT EXISTS categorias (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL
    )
  `);

  // Tabela de locais
  db.run(`
    CREATE TABLE IF NOT EXISTS locais (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      endereco TEXT
    )
  `);

  // Tabela de eventos
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

  // Insere dados iniciais (opcional, para testar)
  db.run(`INSERT OR IGNORE INTO categorias (id, nome) VALUES (1, 'Música'), (2, 'Esportes'), (3, 'Cultura')`);
  db.run(`INSERT OR IGNORE INTO locais (id, nome, latitude, longitude, endereco) VALUES (1, 'Estrada de Ferro Madeira Mamoré', -8.77616, -63.91146, 'Porto Velho, RO')`);
});

module.exports = db;