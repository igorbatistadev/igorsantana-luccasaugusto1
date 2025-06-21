const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config/config.json')['development'];

const app = express();
const port = 3000;

// Sequelize
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const Produto = require('./models/produto')(sequelize, DataTypes);

sequelize.sync();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
