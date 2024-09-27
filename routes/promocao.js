const express = require('express');
const router = express.Router();
const pool = require('../database');

// Rota para inserir promocao
router.post('/inserir', (req, res) => {
  const { id_promocao, nome, descricao, publico_alvo, data_inicio, data_ultimo_contato, ativa } = req.body;
  const query = `
    INSERT INTO promocao (id_promocao, nome, descricao, publico_alvo, data_inicio, data_ultimo_contato, ativa) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `;
  pool.query(query, [id_promocao, nome, descricao, publico_alvo, data_inicio, data_ultimo_contato, ativa], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao inserir promocao: ' + err);
    } else {
      res.send('Promocao inserida com sucesso!');
    }
  });
});

router.get('/consultar', (req, res) => {
    pool.query('SELECT * FROM promocao', (err, result) => {
      if (err) {
        res.status(500).send('Erro ao consultar promocao: ' + err);
      } else {
        res.json(result.rows);
      }
    });
  });

module.exports = router;
