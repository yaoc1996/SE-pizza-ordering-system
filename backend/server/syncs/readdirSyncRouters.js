const express = require('express');
const fs = require('fs');
const _ = require('lodash');

function readdirSyncRouters({ dirname, models, passport, secretOrKey }) {
  const router = express.Router();

  fs
    .readdirSync(dirname)
    .forEach(file => {
      fs.lstat(`${dirname}/${file}`, (err, stats) => {
        if (err) return console.log(err);
        
        const name = _.replace(file, '.js', '');
        const route = file === 'index.js' ? '' : name;

        var subRouter = 
          stats.isDirectory()
            ? readdirSyncRouters({
                dirname: `${dirname}/${file}`, 
                models,
                passport,
                secretOrKey,
              })
            : require(`${dirname}/${file}`)({
                express, 
                models,
                passport,
                secretOrKey,
            }).router()

        router.use(`/${route}`, subRouter);
      })
    })

  return router;
}

module.exports = readdirSyncRouters;