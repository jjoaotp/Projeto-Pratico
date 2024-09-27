const express = require('express');
const router = express.Router();
const pool = require('../database');

// Rota para inserir acessorio
router.post('/inserir', (req, res) => {
  const { id_acessorio, nome, descricao,cpf_client} = req.body;
  const query = `
    INSERT INTO acessorio (id_acessorio, nome, descricao,cpf_client) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `;
  pool.query(query, [id_acessorio, nome, descricao,cpf_client], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao inserir acessorio: ' + err);
    } else {
      res.send('Acessorio inserido com sucesso!');
    }
  });
});

router.get('/consultar', (req, res) => {
    pool.query('SELECT * FROM acessorio', (err, result) => {
      if (err) {
        res.status(500).send('Erro ao consultar acessorio: ' + err);
      } else {
        res.json(result.rows);
      }
    });
  });

module.exports = router;
