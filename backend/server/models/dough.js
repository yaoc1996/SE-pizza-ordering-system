module.exports = (sequelize, DataTypes) => {
  const Dough = sequelize.define('dough', {
    typeName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true,
      }
    },
  })

  return Dough;
}