const express = require('express');
const models = require('models');

module.exports = {
    Router() {
      const router = express.Router();
  
      router.post('/', this.createOrder);
  
      return router;
    },
  
    createOrder(req, res) {
      const {
        customerUsername,
        vendorId,
        subtotal,
        tax,
        total,
        tip,
        pizzas,
      } = req.body;

      models.Order.create({
        subtotal,
        tax, 
        total,
        tip,
      })
        .then(order => {
          Promise.all([
            models.User.findOne({
              where: {
                username: customerUsername,
              }
            }),
            models.Store.findOne({
              where: {
                id: vendorId,
              }
            }),
          ])
            .then(([customer, vendor]) => {
              Promise.all(pizzas.map(pizza => 
                models.Pizza.findOne({
                  where: {
                    id: pizza.id,
                  }
                })
              ))
                .then(pizzas => {
                  order.setVendor(vendor)
                  order.setCustomer(customer)
                  order.addPizzas(pizzas)
                })
            })
        })
    }
}

