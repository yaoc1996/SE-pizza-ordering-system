var modules = {};

const req = require.context('/', false, /\.js/);

req
  .keys()
  .filter(file => 
    file.substr(file.length-3, 3) === '.js' 
    && file !== './index.js'
  )
  .forEach(item => {
    const module = req(item);
    modules[item.replace(/\.\/|\.js/g, '')] = module.default || module;
  })

module.exports = modules;