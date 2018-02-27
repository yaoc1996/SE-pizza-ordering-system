const app = require('express')();
const bodyParser = require('body-parser');

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];

const syncs = require('./syncs');
const models = require('./models')(syncs.registerModels, config).models();
const router = require('./controllers')(syncs.registerRouters, models).router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

const PORT = process.env.PORT || 3001;

models.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server is up and running on port', PORT);
    })
  })