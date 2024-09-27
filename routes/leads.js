const express = require('express');
const router = express.Router();
const pool = require('../database');
const dayjs = require('dayjs');

// Rota para inserir lead
router.post('/inserir', (req, res) => {
    function formatarData(data) {
        return dayjs(data).format('YYYY-MM-DD');
      }

  let { num_celular, nome, interesse, instagram, fonte_captacao, data_registro, data_ultimo_contato, ativo } = req.body;
  data_registro = formatarData(data_registro)
  data_ultimo_contato = formatarData(data_ultimo_contato)

  const query = `
    INSERT INTO leads (num_celular, nome, interesse, instagram, fonte_captacao, data_registro, data_ultimo_contato, ativo) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `;
  pool.query(query, [num_celular, nome, interesse, instagram, fonte_captacao, data_registro, data_ultimo_contato, ativo], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao inserir lead: ' + err);
    } else {
      res.send('Lead inserido com sucesso!');
    }
  });
});

router.get('/consultar', (req, res) => {
    pool.query('SELECT * FROM leads', (err, result) => {
      if (err) {
        res.status(500).send('Erro ao consultar Leads: ' + err);
      } else {
        res.json(result.rows);
      }
    });
  });

module.exports = router;
