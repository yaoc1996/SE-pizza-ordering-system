module.exports = (sequelize, DataTypes) => {
  const Warning = sequelize.define('warning', {
    ratingRef: {
      type: DataTypes.DATE,
    }
  })
  return Warning;
}