const express = require('express');
const models = require('models');
const passport = require('middlewares/authentication');
const verifyRole = require('middlewares/verifyRole');
const _ = require('lodash');
const Op = require('sequelize').Op;

module.exports = {
  Router() {
    const router = express.Router();

    router.get(
      '/',
      passport.authenticate('jwt', { session: false }),
      verifyRole('delivery'),
      this.getStore,
    )

    router.post(
      '/',
      passport.authenticate('jwt', { session: false }),
      verifyRole('delivery'),
      this.postStore,
    )
    
    return router;
  },
  getStore(req, res) {
    Promise.all([
      models.User.findOne({
        where: {
          id: req.user.id,
        },
        include: [{
          model: models.Rating,
          where: {
            value: {
              [Op.in]: [1, 2, 3, 4, 5],
            }
          },
          order: [['createdAt', 'DESC']],
          limit: 3,
        }, {
          model: models.Warning,
          order: [['createdAt', 'DESC']],
        }]
      }),
      models.Store.findOne({
        where: {
          id: req.user.workPlaceId,
        }
      })
    ]) 
    .then(([delivery, store]) => {
      if (store) {
        var statusUpdate = null;
  
        if (delivery.ratings.length === 3 && delivery.ratings[0].createdAt.toString() !== delivery.warnings[0].ratingRef.toString()) {
          const totalRating = delivery.ratings.reduce((x, y) => x+parseInt(y.value), 0)
          const avgRating = totalRating / delivery.ratings.length;

          if (avgRating < 2) {
            delivery.createWarning({
              ratingRef: delivery.ratings[0].createdAt,
            });
            statusUpdate = 'You received a warning because your last 3 deliveries received an average rating of < 2';
            if (delivery.warnings.length > 2) {
              statusUpdate = 'You have been laid off after receiving your 3rd warning.'
              store.removeWorker(delivery);
              models.Salary.destroy({
                where: {
                  userId: delivery.id,
                }
              })
              models.Warning.destroy({
                where: {
                  userId: delivery.id,
                }
              })
            }
          }
        }
        store.getSales({
          where: {
            status: 'ready'
          }
        })
          .then(orders => {
            res.json({
              success: true,
              message: 'success get store',
              store: _.pick(store, ['id', 'name', 'address']),
              orders,
              statusUpdate,
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
      .then(([store, delivery]) => {
        if (store) {
          delivery.setWorkPlace(store)
          delivery.createSalary({
            amount: 0
          })
          store.getSales({
            where: {
              status: `${delivery.id}`,
            }
          })
            .then(orders => {
              res.json({
                success: true,
                message: 'success set store',
                store,
                orders,
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