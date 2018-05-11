module.exports = (sequelize, DataTypes) => {
  const Salary = sequelize.define('salary', {
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    }
  })

  Salary.associate = models => {
    Salary.belongsTo(models.User)
  }

  return Salary;
}