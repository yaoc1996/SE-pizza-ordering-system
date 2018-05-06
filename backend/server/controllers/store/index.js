const express = require('express');
const _ = require('lodash');
const models = require('models');
const passport = require('middlewares/authentication');
const verifyRole = require('middlewares/verifyRole');

module.exports = {
  Router() {
    const router = express.Router();

    router.get(
      '/', 
      this.getStore,
    );

    return router;
  },
  getStore(req, res) {
    models.Store.findOne({
      where: {
        id: req.body.storeId,
      },
      include: [{
        model: models.User,
        as: 'workers',
        where: {
          type: 'cook',
        },
        attributes: ['id', 'firstname', 'lastname', 'email']
      }, {
        model: models.Topping,
        as: 'offeredToppings',
      }, {
        model: models.Dough,
        as: 'offeredDough',
      }, {
        model: models.Pizza,
        as: 'menuItems',
      }]
    })
      .then(store => {
        res.json({
          success: true,
          message: 'successful get store',
          store: store,
        })
      })
      .catch(e => {
        console.log(e)
        
        res.json({
          success: false,
          message: 'error encountered during get store',
        });
      })
  }
}