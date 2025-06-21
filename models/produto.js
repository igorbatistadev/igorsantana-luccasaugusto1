module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Produto', {
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    preco: DataTypes.FLOAT
  }, {
    tableName: 'produtos'
  });

  return Product;
};
