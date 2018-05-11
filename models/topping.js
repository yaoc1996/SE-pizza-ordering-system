module.exports = (sequelize, DataTypes) => {
  const Topping = sequelize.define('topping', {
    typeName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true,
      }
    },
  })

  return Topping;
}