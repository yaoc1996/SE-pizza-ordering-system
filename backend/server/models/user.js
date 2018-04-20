const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isAlphanumeric: true,
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
    User.hasMany(models.Rating, {
      as: 'sentRatings',
      foreignKey: 'sourceUsername',
    })
    User.hasMany(models.Rating, {
      as: 'receivedRatings',
      foreignKey: 'targetUsername',
    })
    User.hasMany(models.Order, {
      foreignKey: 'customerUsername'
    });
    User.belongsTo(models.Store, {
      as: 'workPlace',
    })
  }

  User.beforeCreate(user => {
    return new sequelize.Promise(resolve => {
      bcrypt.hash(user.password, null, null, (err, hashed) => resolve(hashed));
    })
      .then(hash => user.passwordHash = hash)
  })

  return User;
}