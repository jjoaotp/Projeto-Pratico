const express = require('express');
const router = express.Router();
const pool = require('../database');
const dayjs = require('dayjs');

// Rota para inserir cliente
router.post('/inserir', (req, res) => {
    console.log(req.body)
    function formatarData(data) {
        return dayjs(data).format('YYYY-MM-DD');
      }

    let { cpf, nome, sobrenome, numero_celular, instagram, data_inicio, data_ultimo_contato, ativo } = req.body;

    data_inicio = formatarData(data_inicio)
    data_ultimo_contato = formatarData(data_ultimo_contato)
    
    console.log({data_inicio, data_ultimo_contato})

    const query = `
                    INSERT INTO cliente (cpf, nome, sobrenome, numero_celular, instagram, data_inicio, data_ultimo_contato, ativo) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                    `;
    pool.query(query, [cpf, nome, sobrenome, numero_celular, instagram, data_inicio, data_ultimo_contato, ativo], (err, result) => {
    if (err) {
        res.status(500).send('Erro ao inserir cliente: ' + err);
    } else {
        
    }
    });
});

router.get('/consultar', (req, res) => {
    pool.query('SELECT * FROM cliente', (err, result) => {
      if (err) {
        res.status(500).send('Erro ao consultar clientes: ' + err);
      } else {
        res.json(result.rows);
      }
    });
  });

module.exports = router;
