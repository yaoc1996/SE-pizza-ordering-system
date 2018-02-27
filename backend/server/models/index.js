const path = require('path');
const basename = path.basename(module.filename);

module.exports = (registerModels, config) => ({
  models() {
    return registerModels(__dirname, basename, config);
  }
})