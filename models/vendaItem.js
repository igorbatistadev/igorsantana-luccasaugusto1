module.exports = (sequelize, DataTypes) => {
  const VendaItem = sequelize.define('VendaItem', {
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precoUnitario: {  
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    tableName: 'venda_items'
  });

  return VendaItem;
};