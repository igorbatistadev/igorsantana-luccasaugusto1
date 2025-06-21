module.exports = (sequelize, DataTypes) => {
  const Venda = sequelize.define('Venda', {
    dataVenda: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'vendas'
  });

  return Venda;
};
