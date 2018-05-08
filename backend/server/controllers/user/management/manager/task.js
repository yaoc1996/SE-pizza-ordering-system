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
      verifyRole('manager'),
      this.assignDelivery,
    )

    return router;
  },
  assignDelivery(req, res) {
    Promise.all([
      models.User.findOne({
        where: {
          id: req.body.deliveryId,
        }
      }),
      models.Order.findOne({
        where: {
          id: req.body.id,
        }
      })
    ])
      .then(([delivery, order]) => {
        delivery.addDeliveredOrder(order);
        order.updateAttributes({
          status: 'ready',
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