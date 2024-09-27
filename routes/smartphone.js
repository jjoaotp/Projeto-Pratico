const express = require('express');
const router = express.Router();
const pool = require('../database');

// Rota para inserir smartphone
router.post('/inserir', (req, res) => {
  const { num_serie, modelo, cor, armazenamento, cpf_cliente} = req.body;
  const query = `
    INSERT INTO smartphone (num_serie, modelo, cor, armazenamento, cpf_cliente) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `;
  pool.query(query, [num_serie, modelo, cor, armazenamento, cpf_cliente], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao inserir smartphone: ' + err);
    } else {
      res.send('smartphone inserido com sucesso!');
    }
  });
});

router.get('/consultar', (req, res) => {
    pool.query('SELECT * FROM smarthphone', (err, result) => {
      if (err) {
        res.status(500).send('Erro ao consultar smartphones: ' + err);
      } else {
        res.json(result.rows);
      }
    });
  });

module.exports = router;
