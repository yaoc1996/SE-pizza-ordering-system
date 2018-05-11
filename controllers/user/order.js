const express = require('express');
const passport = require('middlewares/authentication');
const verifyRole = require('middlewares/verifyRole');
const models = require('models');
const Op = require('sequelize').Op;

module.exports = {
  Router() {
    const router = express.Router();

    router.get(
      '/',
      passport.authenticate('jwt', { session: false }),
      verifyRole('all'),
      this.getOrders,
    )

    return router;
  },
  getOrders(req, res) {
    models.User.findOne({
      where: {
        id: req.user.id,
      }
    })
      .then(user => {
        Promise.all([
          user.getOrders({
            where: {
              [Op.or]: [{
                status: 'pending',
              }, {
                status: 'ready',
              }]
            },
            include: [{
              model: models.Store,
              as: 'vendor',
            }]
          }),
          user.getSent({
            where: {
              status: 'pending',
            }
          }),
        ])
          .then(([pendingOrders, pendingRatings]) => {
            res.json({
              success: true,
              message: 'success get orders',
              pendingOrders,
              pendingRatings,
            })
          })

      })
      .catch(e => {
        console.log(e)

        res.json({
          success: false,
          message: 'error encountered while get orders',
        })
      })
  }
}