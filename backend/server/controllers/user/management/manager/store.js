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
      verifyRole('manager'),
      this.getStore,
    )
    router.put(
      '/request/approve',
      passport.authenticate('jwt', { session: false }),
      verifyRole('manager'),
      this.approveCustomer,
    )
    router.put(
      '/request/reject',
      passport.authenticate('jwt', { session: false }),
      verifyRole('manager'),
      this.rejectCustomer,
    )
    router.post(
      '/salary',
      passport.authenticate('jwt', { session: false }),
      verifyRole('manager'),
      this.changeSalary,
    )

    return router
  },
  getStore(req, res) {
    models.Store.findOne({
      where: {
        id: req.user.workPlaceId,
      }
    })
      .then(store => {
        if (!store) {
          res.json({
            success: true,
            message: 'have not set up store',
            store,
          })
        } else {
          Promise.all([
            store.getMenuItems(),
            store.getCooks(),
            store.getDeliveryWorkers(),
            store.getRequests({
              attributes: ['firstname', 'lastname', 'id'],
            }),
            store.getSales({
              where: {
                status: 'pending',
              },
              include: [{
                model: models.Pizza,
                as: 'items',
              }, {
                model: models.User,
                as: 'customer',
              }]
            }),
            store.getRatings({
              where: {
                value: {
                  [Op.lt]: 3,
                }
              }
            }),
          ])
            .then(([menu, cooks, delivery, requests, orders, ratings]) => {
              res.json({
                success: true,
                message: 'successful get store',
                store,
                menu,
                cooks,
                delivery,
                requests,
                orders,
                ratings,
              })
          
            })

        }
      })
      .catch(e => {
        console.log(e)
        res.json({
          success: false,
          message: 'error encountered while get store',
        })
      })
  },
  approveCustomer(req, res) {
    Promise.all([
      models.User.findOne({
        where: {
          id: req.body.customerId,
        }
      }),
      models.User.findOne({
        where: {
          id: req.user.id,
        }
      })
    ])
      .then(([customer, manager]) => {
        manager.getWorkPlace()
          .then(store => {
            store.removeRequest(customer)
            store.addRegisteredCustomer(customer)

            res.json({
              success: true,
              message: 'success approve request',
            })
          })
      })
      .catch(e => {
        console.log(e)
        res.json({
          success: false,
          message: 'error encountered while approve request',
        })
      })
  },
  rejectCustomer(req, res) {
    Promise.all([
      models.User.findOne({
        where: {
          id: req.body.customerId,
        }
      }),
      models.User.findOne({
        where: {
          id: req.user.id,
        }
      })
    ])
      .then(([customer, manager]) => {
        manager.getWorkPlace()
          .then(store => {
            store.removeRequest(customer)

            res.json({
              success: true,
              message: 'success reject request',
            })
          })
      })
      .catch(e => {
        console.log(e)
        res.json({
          success: false,
          message: 'error encountered while reject request',
        })
      })
  },
  changeSalary(req, res) {
    models.Salary.findOne({
      where: {
        userId: req.body.id,
      }
    })
      .then(salary => {
        salary.updateAttributes({
          amount: parseFloat(req.body.amount),
        })

        res.json({
          success: true,
          message: 'success change salary',
        })
      })
      .catch(e => {
        console.log(e)

        res.json({
          success: false,
          message: 'error encountered during change salary',
        })
      })
  }
}