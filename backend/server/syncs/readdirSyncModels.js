const fs = require('fs');
const Sequelize = require('sequelize');
const path = require('path');

module.exports = ({ dirname, config }) => {
  const db = {};

  const sequelize = 
    (config.use_env_variable)
      ? new Sequelize(process.env[config.use_env_variable])
      : new Sequelize(
          config.database, 
          config.username, 
          config.password, 
          config
        );

  fs
    .readdirSync(dirname)
    .filter(file => 
      (file[0] !== '.') 
      && (file !== 'index.js') 
      && (file.slice(-3) === '.js')
    )
    .forEach(file => {
      const model = sequelize.import(path.join(dirname, file));
      const modelName = `${model.name.charAt(0).toUpperCase()}${model.name.slice(1)}`;
      db[modelName] = model;
    });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;

  return db;
}