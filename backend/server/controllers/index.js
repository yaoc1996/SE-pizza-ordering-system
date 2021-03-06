const express = require('express');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const basename = path.basename(module.filename);

function readdirSyncRouters(dirname) {
  const router = express.Router();
  fs
    .readdirSync(dirname)
    .filter(file => (file[0] !== '.') && ((file !== 'index.js') || (dirname !== __dirname)))
    .forEach(file => {
      fs.lstat(`${dirname}/${file}`, (err, stats) => {
        if (err) return console.log(err);
        
        const name = _.replace(file, '.js', '');
        const route = file === 'index.js' ? '' : name;

        var subRouter = 
          stats.isDirectory()
            ? readdirSyncRouters(`${dirname}/${file}`)
            : require(`${dirname}/${file}`).Router()

        router.use(`/${route}`, subRouter);
      })
    })

  return router;
}


const router = readdirSyncRouters(__dirname);

router.get('/', (req, res) => {
  res.send('Welcome to the online pizza delivery system API.')
})

module.exports = router;