module.exports = (sequelize, DataTypes) => {
  const Rating =  sequelize.define('rating', {
    value: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5,
      }
    },
    reason: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    status: {
      type: DataTypes.STRING,
    },
    subject: {
      type: DataTypes.STRING,
    },
    store: {
      type: DataTypes.STRING, 
    },
    source: {
      type: DataTypes.STRING,
    }
  })

  return Rating;
}