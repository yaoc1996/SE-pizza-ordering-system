const _ = require('lodash');
const fs = require('fs');

function registerRouters(dir, basename, models) {
  const router = require('express').Router();

  fs
    .readdirSync(dir)
    .filter(file => file[0] !== '.' && file !== basename)
    .forEach(file => {
      var name = _.replace(file, '.js', '');
      router.use(`/${name}`, require(`${dir}/${name}`)(registerRouters, models).router())
    })

  return router;
}

module.exports = registerRouters;