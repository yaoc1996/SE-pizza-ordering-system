const express = require('express');
const passport = require('middlewares/authentication');
const verifyRole = require('middlewares/verifyRole');
const models = require('models');

module.exports = {
  Router() {
    const router = express.Router();

    router.post(
      '/',
      passport.authenticate('jwt', { session: false }),
      verifyRole('delivery'),
      this.assignDelivery,
    )

    return router;
  },
  assignDelivery(req, res) {
    models.Order.findOne({
      where: {
        id: req.body.id,
      },
      include: [{
        model: models.Store,
        as: 'vendor',
      }, {
        model: models.Pizza,
        as: 'items',
      }, {
        model: models.User,
        as: 'delivery',
      }, {
        model: models.User,
        as: 'customer',
      }]
  })
      .then(order => {
        order.updateAttributes({
          status: `complete`,
        })

        Promise.all([
          models.Store.findOne({
            where: {
              id: order.vendor.id,
            }
          }),
          models.User.findOne({
            where: {
              id: order.delivery.id,
            }
          }),
          models.User.findOne({
            where: {
              id: order.customer.id,
            }
          }),
          Promise.all(order.items.map(item => 
            models.Pizza.findOne({
              where: {
                id: item.id,
              }
            })
          ))
        ])
          .then(([store, delivery, customer, pizzas]) => {
            pizzas.forEach(pizza => {
              models.Rating.create({
                status: 'pending',
                subject: pizza.name,
                store: store.name,
                source: customer.firstname + ' ' + customer.lastname 
              })
                .then(rating => {
                  pizza.addRating(rating);
                  customer.addSent(rating);
                })
            })

            models.Rating.create({
              status: 'pending',
              subject: store.name,
              store: '',
              source: customer.firstname + ' ' + customer.lastname,
            })
              .then(rating => {
                store.addRating(rating);
                customer.addSent(rating);
              })

            models.Rating.create({
              status: 'pending',
              subject: delivery.firstname + ' ' + delivery.lastname,
              store: store.name,
              source: customer.firstname + ' ' + customer.lastname,
            })
              .then(rating => {
                delivery.addRating(rating);
                customer.addSent(rating);
              })

            models.Rating.create({
              status: 'pending',
              subject: customer.firstname + ' ' + customer.firstname,
              store: '',
              source: delivery.firstname + ' ' + delivery.lastname,
            })
              .then(rating => {
                customer.addRating(rating);
                delivery.addSent(rating);
              })
          })

        res.json({
          success: true,
          message: 'success update order status',
        })
      })
      .catch(e => {
        console.log(e)

        res.json({
          success: false,
          message: 'error encountered while update order status'
        })
      })
  }
}