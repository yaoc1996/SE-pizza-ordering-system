const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const passport = require('middlewares/authentication');

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
          const {
            username,
            passwordHash,
          } = user;

          if (bcrypt.compareSync(password, passwordHash)) {
            const payload = { username };
            const token = jwt.sign(payload, passport.secretOrKey, { expiresIn: '10h' });
            res.json({
              success: true,
              message: 'user logged in',
              token,
              user: _.pick(user, ['username', 'email', 'type']),
            });
          } else {
            res.json({
              success: false,
              message: 'incorrect password',
            });
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