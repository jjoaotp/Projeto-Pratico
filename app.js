const express = require('express');
const pool = require('./database');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//integrando rotas
const clientesRouter = require('./routes/clientes');
app.use('/clientes', clientesRouter);

const acessorioRouter = require('./routes/acessorio');
app.use('/acessorio', acessorioRouter);

const leadsRouter = require('./routes/leads');
app.use('/leads', leadsRouter);

const promocaoRouter = require('./routes/promocao');
app.use('/promocao', promocaoRouter);

const smartphoneRouter = require('./routes/smartphone');
app.use('/smartphone', smartphoneRouter);





app.use(express.static('views'));  // Serve arquivos estáticos (HTML, CSS)

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
