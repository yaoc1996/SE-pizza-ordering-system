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
        dough,
        toppings,
      } = req.body;

    models.Pizza.create({
      pizza,
    })
      .then(pizza => {
        toppings.forEach(topping => {
          pizza.createTopping({
            typeName: topping.typeName
          })
        })
        pizza.createDough({
          typeName: dough.typeName,
        })
      })
    }
}