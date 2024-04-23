const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'empresas_mineradoras'
});


connection.connect();


app.get('/empresa/:Nome', (req, res) => {
  const nomeEmpresa = req.params.Nome;
  const sql = `SELECT * FROM empresa WHERE Nome = ?`;

  connection.query(sql, [nomeEmpresa], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao consultar empresa' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Empresa não encontrada' });
      return;
    }

    res.json(results[0]);
  });
});


app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});

