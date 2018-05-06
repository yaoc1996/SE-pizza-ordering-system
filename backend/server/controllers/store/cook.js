const express = require('express');
const passport = require('middlewares/authentication');
const verifyRole = require('middlewares/verifyRole');
const models = require('models');

module.exports = {
  Router() {
    const router = express.Router();

    router.get(
      '/', 
      passport.authenticate('jwt', { session: false }), 
      verifyRole('manager'),
      this.getCooks
    );

    router.post(
      '/add',
      passport.authenticate('jwt', { session: false }),
      verifyRole('manager'),
      this.addCook,
    );

    return router;
  },
  getCooks(req, res) {
    models.User.findOne({
      where: req.user,
    })
      .then(manager => {
        manager.getWorkPlace()
          .then(store => {
            store.getCooks()
              .then(cooks => {
                res.json({
                  success: true,
                  message: 'successful get cooks',
                  cooks,
                })
              })
          })
      })
      .catch(e => {
        console.log(e)
        
        res.json({
          success: false,
          message: 'error encountered during get cooks',
        });
      })
  },
  addCook(req, res) {
    Promise.all([
      models.User.findOne({
        where: req.user,
      }),
      models.User.findOne({
        where: {
          username: req.body.cookUsername,
        }
      })
    ])
      .then(([manager, cook]) => {
        manager.getWorkPlace()
          .then(store => {
            store.addWorker(cook)
          })

      })
      .catch(e => {
        console.log(e)
        
        res.json({
          success: false,
          message: 'error encountered during get cooks',
        });
      })
  }
}