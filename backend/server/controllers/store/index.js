const express = require('express');
const sequelize = require('sequelize');
const _ = require('lodash');
const models = require('models');
const passport = require('middlewares/authentication');
const verifyRole = require('middlewares/verifyRole');

module.exports = {
  Router() {
    const router = express.Router();

    router.get('/nearby', this.getNearbyStores);
    router.get('/customer', passport.authenticate('jwt', { session: false }), this.checkRegistered);
    router.put('/register', passport.authenticate('jwt', { session: false }), this.register);
    router.get('/', this.getStore);

    return router;
  },
  getStore(req, res) {
    models.Store.findOne({
      where: {
        id: req.query.storeId,
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
  },
  getNearbyStores(req, res) {
    const {
      lng,
      lat,
    } = req.query;

    models.Store.findAll({
      attributes: ['id', 'name', 'address', 'lng', 'lat']
    })
      .then(stores => {
        res.json({
          stores: _.slice(_.sortBy(stores, store => Math.pow((store.lat - lat), 2) + Math.pow(store.lng - lng, 2)), 0, req.query.limit),
          success: true,
          message: 'successful get nearby stores',
        })
      });
  },
  checkRegistered(req, res) {
    models.Store.findOne({
      where: {
        id: req.query.storeId,
      }
    })
      .then(store => {
        Promise.all([
          store.getRequests({
            where: {
              id: req.user.id,
            }
          }),
          store.getRegisteredCustomers({
            where: {
              id: req.user.id,
            }
          })
        ])
          .then(([requests, customers]) => {
            res.json({
              success: true,
              message: 'success check registered customer status',
              isRegistered: requests.length > 0 || customers.length > 0,
            })
          })
          .catch(e => {
            console.log(e)
            
            res.json({
              success: false,
              message: 'error encountered during check registered',
            });
          })
      })
  },
  register(req, res) {
    console.log(req.user)
    Promise.all([
      models.User.findOne({
        where: {
          id: req.user.id,
        }
      }),
      models.Store.findOne({
        where: {
          id: req.query.storeId,
        }
      }),
    ])
      .then(([user, store]) => {
        store.addRequest(user)
        res.json({
          success: true,
          message: 'success store register',
        })
      })
      .catch(e => {
        console.log(e)
        
        res.json({
          success: false,
          message: 'error encountered during store register',
        });
      })
  }
}