const express = require('express');
const models = require('models');
const passport = require('middlewares/authentication');
const verifyRole = require('middlewares/verifyRole');
const _ = require('lodash');

module.exports = {
  Router() {
    const router = express.Router();

    router.get(
      '/',
      passport.authenticate('jwt', { session: false }),
      verifyRole('cook'),
      this.getStore,
    )

    router.post(
      '/',
      passport.authenticate('jwt', { session: false }),
      verifyRole('cook'),
      this.postStore,
    )
    
    return router;
  },
  getStore(req, res) {
    models.Store.findOne({
      where: {
        id: req.user.workPlaceId,
      }
    })
      .then(store => {
        if (store) {
          store.getMenuItems()
            .then(menu => {
              res.json({
                success: true,
                message: 'success get store',
                store: _.pick(store, ['id', 'name', 'address']),
                menu,
              })
            })
        } else {
          res.json({
            success: true,
            message: 'cannot find workplace',
          })
        }
      })
      .catch(e => {
        console.log(e)

        res.json({
          success: false,
          message: 'error encountered while trying to get store',
        })
      })
  },
  postStore(req, res) {
    Promise.all([
      models.Store.findOne({
        where: {
          id: req.body.storeId
        }
      }),
      models.User.findOne({
        where: {
          id: req.user.id,
        }
      })
    ])
      .then(([store, cook]) => {
        if (store) {
          cook.setWorkPlace(store)
          cook.createSalary({
            amount: 0,
          })
          store.getMenuItems()
            .then(menu => {
              res.json({
                success: true,
                message: 'success set store',
                store: _.pick(store, ['id', 'name', 'address']),
                menu,
              })
            })
        } else {
          res.json({
            success: true,
            message: 'store does not exist',
          })
        }
      })
      .catch(e => {
        console.log(e)

        res.json({
          success: false,
          message: 'error encountered while trying to set store',
        })
      })
  }
}