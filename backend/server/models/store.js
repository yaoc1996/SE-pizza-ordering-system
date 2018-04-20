module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('store', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    lng: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: -180, 
        max: 180,
      }
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: -90,
        max: 90,
      }
    }
  })
  
  Store.associate = models => {
    Store.hasMany(models.User, {
      as: 'workers',
      foreignKey: 'workPlaceId',
    });
    Store.hasMany(models.Pizza, {
      as: 'menuItems',
      foreignKey: 'vendorStoreId',
    });
    Store.hasMany(models.Order, {
      as: 'sales',
      foreignKey: 'vendorStoreId',
    });
    Store.hasMany(models.Topping, {
      as: 'offeredToppings',
      foreignKey: 'vendorStoreId',
    })
    Store.hasMany(models.Crust, {
      as: 'offeredCrusts',
      foreignKey: 'vendorStoreId',
    })
  }
  
  Store.prototype.getManager = function() {
    return this.getWorkers({
      where: {
        type: 'manager',
      },
      limit: 1,
    })
      .then(([manager]) => manager);
  }

  Store.prototype.getCooks = function() {
    return this.getWorkers({
      where: {
        type: 'cook',
      }
    })
  }

  Store.prototype.getDeliveryWorkers = function() {
    return this.getWorkers({
      where: {
        type: 'delivery',
      }
    })
  }

  return Store;
}