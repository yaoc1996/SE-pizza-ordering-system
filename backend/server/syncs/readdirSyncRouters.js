const express = require('express');
const fs = require('fs');
const _ = require('lodash');

function readdirSyncRouters(dir, models) {
  const router = express.Router();

  fs
    .readdirSync(dir)
    .forEach(file => {
      fs.lstat(`${dir}/${file}`, (err, stats) => {
        if (err) return console.log(err);
        
        const name = _.replace(file, '.js', '');
        const route = file === 'index.js' ? '' : name;

        var subRouter = 
          stats.isDirectory()
            ? readdirSyncRouters(`${dir}/${file}`, models)
            : require(`${dir}/${file}`)(express, models).router()

        router.use(`/${route}`, subRouter);
      })
    })

  return router;
}

module.exports = readdirSyncRouters;