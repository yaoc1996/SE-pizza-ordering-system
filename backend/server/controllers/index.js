const express = require('express');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const basename = path.basename(module.filename);
//test 
function readdirSyncRouters(dirname) {
  const router = express.Router();
  fs
    .readdirSync(dirname)
    .filter(file => 
      (file[0] !== '.') 
      && (file !== 'index.js') 
      && (file.slice(-3) === '.js')
    )
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

router.use('/user', require('./users'));

module.exports = router;