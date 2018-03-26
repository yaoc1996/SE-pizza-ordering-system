var modules = {};

const req = require.context('/', false, /\.js/);

req
  .keys()
  .filter(file => 
    file.substr(file.length-3, 3) === '.js' 
    && file !== './index.js'
  )
  .map(item => {
    const module = req(item);
    modules[item.replace(/\.\/|\.js/g, '')] = module.default || module;
    return module;
  })

module.exports = modules;