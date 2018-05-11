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
    Promise.all([
      models.User.findOne({
        where: {
          id: req.user.id
        },
        include: [{
          model: models.Warning
        }]
      }),
      models.Store.findOne({
        where: {
          id: req.user.workPlaceId,
        },
      })
    ])
      .then(([cook, store]) => {
        if (store) {
          store.getMenuItems({
            include: [{
              model: models.Rating,
              order: [['createdAt', 'DESC']],
              limit: 3,
            }]
          })
            .then(menu => {
              var dropped = [];
              menu = menu.filter(pizza => {
                if (pizza.ratings.length > 2) {
                  const totalRating = pizza.ratings.reduce((x, y) => x + parseInt(y.value), 0);
                  const avgRating = totalRating / pizza.ratings.length;
                  
                  if (avgRating < 2) {
                    store.removeMenuItem(pizza)
                    dropped.push(pizza.name)

                    return false
                  }
                }
                return true
              })

              var statusUpdate = null;
              if (dropped.length > 0) {
                statusUpdate = dropped.reduce((x, y) => x + y + ', ', '') + 'has been dropped due to poor ratings. You have received a warning for each dropped pizza.';
                if (cook.warnings.length+dropped.length > 2) {
                  store.removeWorker(cook)
                  models.Salary.destroy({
                    where: {
                      userId: cook.id,
                    }
                  })
                  models.Warning.destroy({
                    where: {
                      userId: cook.id,
                    }
                  })
                  statusUpdate = 'You have been laid off due to poor ratings on 3 or more menu items';
                }
              }

              res.json({
                success: true,
                message: 'success get store',
                store: _.pick(store, ['id', 'name', 'address']),
                menu,
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