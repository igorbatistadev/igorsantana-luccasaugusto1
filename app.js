const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config/config.json')['development'];

const app = express();
const port = 3000;

const sequelize = new Sequelize(config.database, config.username, config.password, config);
const Produto = require('./models/produto')(sequelize, DataTypes);

const Venda = require('./models/venda')(sequelize, DataTypes);
const VendaItem = require('./models/vendaItem')(sequelize, DataTypes);

Venda.hasMany(VendaItem, { foreignKey: 'idVenda' });
VendaItem.belongsTo(Venda, { foreignKey: 'idVenda' });

Produto.hasMany(VendaItem, { foreignKey: 'idProduto' });
VendaItem.belongsTo(Produto, { foreignKey: 'idProduto' });

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

app.get('/produtos/editar/:id', async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);
  res.render('produtos/form', { produto, action: '/produtos/' + produto.id });
});

app.post('/produtos/:id', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);

    if (!produto) {
      return res.status(404).send('Produto não encontrado');
    }

    const { nome, descricao, preco } = req.body;

    if (isNaN(preco)) {
      return res.status(400).send('Preço inválido');
    }

    await produto.update({
      nome,
      descricao,
      preco
    });

    res.redirect('/produtos');

  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).send('Erro ao atualizar produto');
  }
});

app.get('/produtos/deletar/:id', async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);
  await produto.destroy();
  res.redirect('/produtos');
});

app.get('/vendas/nova', async (req, res) => {
  const produtos = await Produto.findAll();
  res.render('vendas/form', { produtos, formatCurrency });
});

app.post('/vendas', async (req, res) => {
  let { produtos, quantidades } = req.body;

  if (!Array.isArray(produtos)) {
    produtos = [produtos];
    quantidades = [quantidades];
  }

  const venda = await Venda.create();

  for (let i = 0; i < produtos.length; i++) {
    const quantidade = parseInt(quantidades[i], 10);
    const produto = await Produto.findByPk(produtos[i]); 

    if (quantidade > 0 && produto) {
      await VendaItem.create({
        idVenda: venda.id,
        idProduto: produto.id,
        quantidade: quantidade,
        precoUnitario: produto.preco
      });
    }
  }

  res.redirect('/vendas');
});

app.get('/vendas', async (req, res) => {
  const vendas = await Venda.findAll({
    include: {
      model: VendaItem,
      include: Produto
    }
  });

  res.render('vendas/lista', { vendas, formatCurrency });
});

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
