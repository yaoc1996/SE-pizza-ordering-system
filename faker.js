const colors = require('colors');
const faker = require('faker');
const _ = require('lodash');

const app = require('express')();
const bodyParser = require('body-parser');

const config = require('./config/config.json')['production'];

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

const latmax = 40.765067,
      latmin = 40.736844,
      lngmax = -73.975399,
      lngmin = -74.004285;

const pizzaTypes = [
  "French Bread",
  "Baked Ziti Pizza",
  "Grandma Slice",
  "New York Slice",
  "Chicago Pizza",
  "Smoked Salmon Pizza",
  "White/Bianca",
  "Califlower Crusted Pizza",
  "Sicilian",
  "Neapolitan",
  "Tarte Flamebee",
  "Pissaladiere",
  "Roman Al Taglio",
  "Quattro Formaggi",
  "Hawaiian",
  "Maltese",
  "Scottish Pizza Crunch",
  "Tuna and Sweet Corn",
  "White Clam Pizza",
  "Quad City",
  "St. Louis",
  "Greek",
  "Tomato Pie",
  "Carbonara",
  "Pizza Cone",
  "Sausage Stuffed Crust",
  "Mexican",
  "Pizza Romana",
  "Pizza Viennese",
]

models.sequelize.sync({ 
  force: true,
  logging: false,
})
  .then(() => {
    console.log("\nCleaning...".green)
    
    console.log("\nGenerating Database Data".green)
    generate(50) 
    
  })
  
  function generate(n) {
    if (n === 0) {
      models.sequelize.close()
      
      return
    }
      models.Store.create({
        name: faker.company.companyName() + ' Pizzeria',
        address: faker.address.streetAddress('###')+' Manhattan, NY '+faker.address.zipCode(),
        lng: lngmin + (lngmax - lngmin) * Math.random(),
        lat: latmin + (latmax - latmin) * Math.random(),
        id: Math.floor(Math.random()*90000) + 10000,
      })
      .then(store => {
        const p = () => store.createMenuItem({
            name: _.sample(pizzaTypes),
            description: faker.lorem.paragraph().slice(0, 250),
            price: 8 + Math.random()*12,
          })
        const ps = [p(), p(), p(), p(), p()]
        Promise.all([
          store.createWorker({
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            password: 'pw1',
            type: 'manager',
          }),
          store.createWorker({
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            password: 'pw1',
            type: 'delivery',
          }),
          store.createWorker({
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            password: 'pw1',
            type: 'cook',
          }),
          store.createWorker({
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            password: 'pw1',
            type: 'cook',
          }),
          Promise.all(ps)
        ])
          .then(() => {
            generate(n-1)
          })
      })
      
    }
  
