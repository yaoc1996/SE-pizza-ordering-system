const express = require('express');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

module.exports = {
  Router() {
    const router = express.Router();

    router.post('/', this.createUser);

    return router;
  },
  createUser(req, res) {
    const {
      username,
      email,
      password,
      type,
    } = req.body;

    models.User.create({
      username,
      email,
      password,
      type,
    })
      .then(user => {
        const { username } = user;

        const payload = { username };
        const token = jwt.sign(
          payload,
          passport.secretOrKey,
          { expiresIn: '10h' },
        );

        res.json({
          success: true,
          message: 'user created',
          token,
          user: _.pick(user, ['username', 'email', 'type']),
        })
      })
      .catch(e => {
        const message = 
          (e.errors)
            ? e.errors[0].message
            : 'error encountered during user create';

        console.log(message);
        res.json({
          success: false,
          message,
        });
      })
  }
}