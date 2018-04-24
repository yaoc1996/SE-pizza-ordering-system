module.exports = (sequelize, DataTypes) => {
  const Pizza = sequelize.define('pizza', {
    name: {
      type: DataTypes.STRING,
      defaultValue: 'regular',
    },
  })

  Pizza.associate = models => {
    Pizza.hasMany(models.Rating);
    Pizza.hasMany(models.Topping);
    Pizza.hasOne(models.Crust)
  }

  return Pizza;
}