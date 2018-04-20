module.exports = (sequelize, DataTypes) => {
  const Crust = sequelize.define('crust', {
    typeName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true,
      }
    },
  })

  return Crust;
}