const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config/config.json')['development'];

const app = express();
const port = 3000;

const sequelize = new Sequelize(config.database, config.username, config.password, config);
const Produto = require('./models/produto')(sequelize, DataTypes);

sequelize.sync();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/produtos/novo', (req, res) => {
  res.render('produtos/form', { produto: {}, action: '/produtos' });
});

app.post('/produtos', async (req, res) => {
  try {
    const { nome, descricao, preco } = req.body;

    if (isNaN(preco)) {
      return res.status(400).send('Preço inválido');
    }

    await Produto.create({
      nome,
      descricao,
      preco: preco
    });

    res.redirect('/produtos');

  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).send('Erro ao criar produto');
  }
});

app.get('/produtos', async (req, res) => {
  const produtos = await Produto.findAll();
  res.render('produtos/lista', { produtos });
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
