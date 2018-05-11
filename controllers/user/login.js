const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const passport = require('middlewares/authentication');
const models = require('models');

module.exports = {
  Router() {
    const router = express.Router();

    router.post('/', this.login);
    
    return router;
  },

  login(req, res) {
    const {
      email,
      password,
    } = req.body;

    models.User.findOne({
      where: { email },
    })
      .then(user => {
        if (user) {
          if (user.type != 'customer') {
            res.json({
              success: false,
              message: 'this portal is for customers only, use the management portal to login as manager, cook, or delivery worker',
            })
          } else {
            const {
              id,
              passwordHash,
            } = user;
  
            if (bcrypt.compareSync(password, passwordHash)) {
              const payload = { id };
              const token = jwt.sign(payload, passport.secretOrKey, { expiresIn: '10h' });
              res.json({
                success: true,
                message: 'user logged in',
                token,
                user: _.pick(user, ['id', 'firstname', 'lastname', 'email', 'type']),
              });
            } else {
              res.json({
                success: false,
                message: 'incorrect password',
              });
            }
          }
        } else {
          res.json({
            success: false,
            message: 'user does not exist',
          });
        }
      })
      .catch(e => {
        const message =
          (e.errors)
            ? e.errors[0].message
            : 'error encountered during user login';

        console.log(message);

        res.json({
          success: false,
          message,
        })
      })
  }
}