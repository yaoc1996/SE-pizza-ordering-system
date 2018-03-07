const app = require('express')();
const bodyParser = require('body-parser');

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];
const secretOrKey = config['secretOrKey'];

const readdirSyncModels = require('./syncs/readdirSyncModels');
const readdirSyncRouters = require('./syncs/readdirSyncRouters');

const models = readdirSyncModels(
  `${__dirname}/models`, 
  config,
);

const passport = require('./middlewares/authentication')(
  secretOrKey, 
  models,
);

const router = readdirSyncRouters(
  `${__dirname}/controllers`, 
  models, 
  passport,
  secretOrKey,
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);
app.use(passport.initialize());

const PORT = process.env.PORT || 3001;

models.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server is up and running on port', PORT);
    })
  })