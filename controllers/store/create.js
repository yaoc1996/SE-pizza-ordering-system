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

    const randomId = Math.floor(Math.random()*90000) + 10000;

    models.Store.findOne({
      where: {
        id: randomId,
      }
    })
      .then(store => {
        if (store) {
          this.createStore(req, res);
        } else {
          Promise.all([
            models.Store.create({
              name,
              address,
              lng,
              lat,
              id: randomId,
            }),
            models.User.findOne({
              where: {
                id: req.user.id,
              },
            })
          ])
            .then(([store, manager]) => {
              console.log(store)
              store.addWorker(manager)
              manager.setWorkPlace(store)
              
      
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
      })
    }
}