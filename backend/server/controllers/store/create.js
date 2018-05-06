const express = require('express');
const _ = require('lodash');
const models = require('models');
const passport = require('middlewares/authentication');
const verifyRole = require('middlewares/verifyRole');

module.exports = {
  Router() {
    const router = express.Router();

    router.post(
      '/', 
      passport.authenticate('jwt', { session: false }), 
      verifyRole('manager'),
      this.createStore
    );

    return router;
  },
  createStore(req, res) {
    const {
      name,
      address,
      lng,
      lat,
    } = req.body;

    models.Store.create({
      name,
      address,
      lng,
      lat,
    })
      .then(store => {
        store.addWorker(req.user)

        res.json({
          success: true,
          message: 'successfully created store',
          store,
        })
      })
      .catch(e => {
        console.log(e)
        
        res.json({
          success: false,
          message: 'error encountered during store create',
        });
      })
  }
}