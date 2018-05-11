const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    },
    passwordHash: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [['customer', 'manager', 'cook', 'delivery']],
      }
    }
  })

  User.associate = models => {
    User.hasMany(models.Rating)
    User.hasMany(models.Rating, {
      as: 'sent',
      foreignKey: 'senderId',
    })
    User.hasMany(models.Order, {
      foreignKey: 'customerId'
    });
    User.hasMany(models.Order, {
      as: 'deliveredOrder',
      foreignKey: 'deliveryId',
    })
    User.belongsTo(models.Store, {
      as: 'workPlace',
      foreignKey: 'workPlaceId',
    })
    User.belongsToMany(models.Store, {
      as: 'requests',
      through: 'userRequests',
    })
    User.hasOne(models.Salary);
    User.hasMany(models.Warning);
  }

  User.beforeCreate(user => {
    return new sequelize.Promise(resolve => {
      bcrypt.hash(user.password, null, null, (err, hashed) => resolve(hashed));
    })
      .then(hash => user.passwordHash = hash)
  })

  return User;
}