const app = require('express')();
const bodyParser = require('body-parser');

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];

const readdirSyncModels = require('./syncs/readdirSyncModels');
const models = readdirSyncModels({
  dirname: `${__dirname}/models`, 
  config,
});

const passport = require('./middlewares/authentication')({
  secretOrKey: config['secretOrKey'],
  models,
});
const verifyRole = require('./middlewares/verifyRole');

const readdirSyncRouters = require('./syncs/readdirSyncRouters');
const router = readdirSyncRouters({
  dirname: `${__dirname}/controllers`, 
  models, 
  passport,
  verifyRole,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);
app.use(passport.initialize());

const PORT = process.env.PORT || 3001;

models.sequelize.sync({ force: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server is up and running on port', PORT);
      require('./test')()
    })
  })
