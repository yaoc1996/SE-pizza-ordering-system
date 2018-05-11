const express = require('express');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const models = require('models');
const passport = require('middlewares/authentication');

module.exports = {
  Router() {
    const router = express.Router();

    router.post('/', this.createUser);

    return router;
  },
  createUser(req, res) {
    const {
      email,
      password,
      type,
    } = req.body;

    const firstname = req.body.firstname[0].toUpperCase() + req.body.firstname.slice(1)
    const lastname = req.body.lastname[0].toUpperCase() + req.body.lastname.slice(1)

    models.User.create({
      firstname,
      lastname,
      email,
      password,
      type,
    })
      .then(user => {
        const { id } = user;

        const payload = { id };
        const token = jwt.sign(
          payload,
          passport.secretOrKey,
          { expiresIn: '10h' },
        );

        res.json({
          success: true,
          message: 'user created',
          token,
          user: _.pick(user, ['id', 'firstname', 'lastname', 'email', 'type']),
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