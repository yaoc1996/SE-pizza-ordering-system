const express = require('express');
const models = require('models');

module.exports = {
    Router() {
      const router = express.Router();
  
      router.post('/', this.createPizza);
  
      return router;
    },

    createPizza(req, res) {
      const {
        pizza,
        crust,
        topping,
      } = req.body;

    models.Pizza.create({
      pizza,
      crust,
      toppings,
    })
      
      .then(pizza => {
        pizza.getTopping()
        pizza.getCrust()
      .then(toppings => {

      }
    }
  }