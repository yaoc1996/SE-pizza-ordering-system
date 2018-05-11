module.exports = (sequelize, DataTypes) => {
  const Pizza = sequelize.define('pizza', {
    name: {
      type: DataTypes.STRING,
      defaultValue: 'regular',
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    }
  })

  Pizza.associate = models => {
    Pizza.hasMany(models.Rating);
    Pizza.hasMany(models.Topping);
    Pizza.hasOne(models.Dough)
  }

  return Pizza;
}