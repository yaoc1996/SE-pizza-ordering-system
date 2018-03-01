const  _ = require('lodash');
const path = require('path');

const basename = `./${path.basename(module.i)}`;
const components = {};

require.context(__dirname, true, /\.js*$/)
  .keys()
  .filter(file => 
    file !== basename
    && _.replace(file, '/index.js', '').split('/').length < 3)
  .forEach(file => {
    const extractName = _.flow(
      _.bind(_.split, null, _, '/'),
      x => x[1],
      _.bind(_.replace, null, _, '.js', ''),
    )
    const comp = require(`${file}`);
    components[extractName(file)] = comp.default ? comp.default : comp;
  })
  
module.exports = components;