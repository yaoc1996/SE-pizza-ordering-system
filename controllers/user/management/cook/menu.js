const express = require('express');
const models = require('models');
const passport = require('middlewares/authentication');
const verifyRole = require('middlewares/verifyRole');
const _ = require('lodash');

module.exports = {
  Router() {
    const router = express.Router();

    router.post(
      '/',
      passport.authenticate('jwt', { session: false }),
      verifyRole('cook'),
      this.addMenuItem,
    )

    router.delete(
      '/',
      passport.authenticate('jwt', { session: false }),
      verifyRole('cook'),
      this.removeMenuItem,
    )

    return router;
  },

  addMenuItem(req, res) {
    models.Store.findOne({
      where: {
        id: req.user.workPlaceId,
      }
    })
      .then(store => {
        store.createMenuItem({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
        })
          .then(pizza => {
            res.json({
              success: true,
              message: 'success add menu item',
              pizza,
            })
          })
      })
      .catch(e => {
        console.log(e)

        res.json({
          success: false,
          message: 'error encountered while add menu item',
        })
      })
  },

  removeMenuItem(req, res) {
    models.Pizza.destroy({
      where: {
        id: req.body.itemId,
      }
    })
      .then(() => {
        res.json({
          success: true,
          message: 'success remove menu item',
        })
      })
      .catch(e => {
        console.log(e)

        res.json({
          success: false,
          message: 'error encountered while remove menu item',
        })
      })
  }
}