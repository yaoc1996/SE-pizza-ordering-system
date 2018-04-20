const express = require('express');
const fs = require('fs');
const _ = require('lodash');

function readdirSyncRouters(params) {
  const router = express.Router();
  const { dirname } = params;

  if (!dirname || dirname[0] !== '/') {
    throw "readdirSync with relative path is not allowed";
  }

  fs
    .readdirSync(dirname)
    .forEach(file => {
      fs.lstat(`${dirname}/${file}`, (err, stats) => {
        if (err) return console.log(err);
        
        const name = _.replace(file, '.js', '');
        const route = file === 'index.js' ? '' : name;

        var subRouter = 
          stats.isDirectory()
            ? readdirSyncRouters(_.assign(
                params, 
                { dirname: `${dirname}/${file}` }
              ))
            : require(`${dirname}/${file}`)(_.omit(params, ['dirname'])).router()

        router.use(`/${route}`, subRouter);
      })
    })

  return router;
}

module.exports = readdirSyncRouters;