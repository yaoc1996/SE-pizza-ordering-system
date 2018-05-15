const express = require('express');
const sequelize = require('sequelize');
const _ = require('lodash');
const models = require('models');
const passport = require('middlewares/authentication');
const verifyRole = require('middlewares/verifyRole');

module.exports = {
  Router() {
    const router = express.Router();

    router.post('/', this.placeOrder);

    return router;
  },
  placeOrder(req, res) {
    Promise.all([
      models.Store.findOne({
        where: {
          id: req.body.storeId,
        }
      }),
      Promise.all(req.body.pizzas.map(pizza => {
        return models.Pizza.create({
          name: pizza.name,
          description: pizza.description,
          price: parseFloat(pizza.price),
        })
      })),
      models.Order.create({
        status: 'pending',
        subtotal: req.body.subtotal,
        tax: req.body.tax,
        total: req.body.total,
        destination: req.body.destination,
      })
    ])
      .then(([vendor, pizzas, order]) => {
        order.setVendor(vendor)
  
        if (req.body.userId) {
          models.User.findOne({
            where: {
              id: req.body.userId,
            }
          })
            .then(customer => {
              order.setCustomer(customer);
            })
        }
        order.setItems(pizzas)

        res.json({
          success: true,
          message: 'success place order',
        })
      })
      .catch(e => {
        console.log(e)
        res.json({
          success: false,
          message: 'error encountered during place order',
        })
      })
  }
}
