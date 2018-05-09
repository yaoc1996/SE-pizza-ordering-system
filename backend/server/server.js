const app = require('express')();
const bodyParser = require('body-parser');

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];

const passport = require('./middlewares/authentication');
const verifyRole = require('./middlewares/verifyRole');

const router = require('controllers');
const models = require('models');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);
app.use(passport.initialize());

const PORT = process.env.PORT || 3001;

process.setMaxListeners(0);

models.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server is up and running on port', PORT);
    })
  })
