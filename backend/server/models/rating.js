module.exports = (sequelize, DataTypes) => {
  const Rating =  sequelize.define('rating', {
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 0,
        max: 5,
      }
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  })

  Rating.associate = models => {
    Rating.belongsTo(models.User, {
      as: 'source',
    })
    Rating.belongsTo(models.User, {
      as: 'target',
    })
    Rating.belongsTo(models.Pizza, {
      as: 'pizzaTarget',
    });
    Rating.belongsTo(models.Order);
  }

  return Rating;
}