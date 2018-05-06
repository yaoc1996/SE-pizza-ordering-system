module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
    },
    tax: {
      type: DataTypes.DECIMAL(10, 2),
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
    },
    tips: {
      type: DataTypes.DECIMAL(10, 2),
    },
  })

  Order.associate = models => {
    Order.belongsTo(models.User, {
      as: 'customer',
      foreignKey: 'customerId',
    });
    Order.belongsTo(models.Store, {
      as: 'vendor',
      foreignKey: 'vendorStoreId',
    });
    Order.hasMany(models.Pizza, {
      as: 'items',
      foreignKey: 'orderId',
    });
  }

  return Order;
}