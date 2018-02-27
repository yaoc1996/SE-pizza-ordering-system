const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);

let components = {}

fs
  .readdirSync(__dirname)
  .filter(file => file[0] !== '.' && file !== basename)
  .forEach(file => {
    var name = _.replace(file, '.js', '');
    components[_.camelCase(name)] = require(`./${name}`);
  })

module.exports = components;