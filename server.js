const express = require('express');
const app = require('express')();
const bodyParser = require('body-parser');

const passport = require('./middlewares/authentication');
const verifyRole = require('./middlewares/verifyRole');

const router = require('controllers');
const models = require('models');

const path = require('path')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);
app.use(passport.initialize());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'frontend/pizza-ordering-system/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/pizza-ordering-system/build/index.html'))
  })
}

const PORT = process.env.PORT || 3001;

process.setMaxListeners(0);

models.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server is up and running on port', PORT);
    })
  })
