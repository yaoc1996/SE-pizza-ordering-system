module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    status: {
      type: DataTypes.STRING,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
    },
    tax: {
      type: DataTypes.DECIMAL(10, 2),
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
    },
  })

  Order.associate = models => {
    Order.belongsTo(models.User, {
      as: 'delivery',
      foreignKey: 'deliveryId',
    })
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