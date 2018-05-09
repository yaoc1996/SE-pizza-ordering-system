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
        model: models.Dough,
        as: 'offeredDough',
      }, {
        model: models.Pizza,
        as: 'menuItems',
      }]
    })
      .then(store => {
        if (store.workers.length < 2) {
          res.json({
            success: false,
            message: 'Store isn\'t open yet',
          })
        } else {
          res.json({
            success: true,
            message: 'successful get store',
            store: store,
          })
        }
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
    Promise.all([
      models.User.findOne({
        where: {
          id: req.user.id,
        },
        include: [{
          model: models.Rating
        }] 
      }),
      models.Store.findOne({
        where: {
          id: req.query.storeId,
        }
      })
    ])
      .then(([user, store]) => {
        Promise.all([
          store.getRequests({
            where: {
              id: req.user.id,
            },
            include: [{
              model: models.Rating,
              where: {
                store: store.name
              }
            }]
          }),
          store.getRegisteredCustomers({
            where: {
              id: req.user.id,
            },
            include: [{
              model: models.Rating,
              where: {
                store: store.name
              }
            }]
          }),
          store.getVip({
            where: {
              id: req.user.id,
            },
            include: [{
              model: models.Rating,
              where: {
                store: store.name
              }
            }]
          })
        ])
        .then(([requests, customers, vips]) => {
          var statusUpdate = null;
          var status = 'NotRegistered';
          console.log(requests.length, customers.length, vips.length)
          if (requests.length > 0) {
            status = 'Visitor';
          } else if (customers.length > 0) {
            status = 'Customer';
            if (customers[0].ratings.length > 3) {
              const totalRating = customers[0].ratings.reduce((x, y) => x+parseInt(y.value), 0)
              const avgRating = totalRating / customers[0].ratings.length
              if (avgRating > 4) {
                store.removeRegisteredCustomer(customers[0])
                store.addVip(customers[0])
                status = 'VIP'
                statusUpdate = 'You have been promoted to VIP status'
              } else if (avgRating < 2) {
                store.removeRegisteredCustomer(customers[0])
                status = 'Visitor';
                statusUpdate = 'You have been demoted to Visitor status'
              }
            }
          } else if (vips.length > 0) {
            status = 'VIP'
            if (vips[0].ratings.length > 3) {
              const totalRating = vips[0].ratings.reduce((x, y) => x+parseInt(y.value), 0) 
              const avgRating = totalRating / vips[0].ratings.length;
              if (avgRating < 4) {
                store.removeVip(vips[0])
                store.addRegisteredCustomer(vips[0])
                status = 'Customer';
                statusUpdate = 'You have been demoted to Customer status'
              } else if (avgRating < 2) {
                store.removeVip(vips[0])
                status = 'Visitor';
                statusUpdate = 'You have been demoted to Visitor status'
              }
            }
          } else {
            status = 'Visitor';
            if (user.ratings.length > 3) {
              const totalRating = user.ratings.reduce((x, y) => x + parseInt(y.value), 0);
              const avgRating = totalRating / user.ratings.length;
              if (avgRating > 4) {
                store.addVip(user)
                status = "VIP";
                statusUpdate = 'You have been promoted to VIP status';
              } else if (avgRating > 2) {
                store.addRegisteredCustomer(user)
                status = "Customer";
                statusUpdate = 'You have been promoted to Customer status';
              }
            }
          }
            res.json({
              success: true,
              message: 'success check registered customer status',
              status,
              statusUpdate,
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