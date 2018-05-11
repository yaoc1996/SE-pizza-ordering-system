const express = require('express');
const _ = require('lodash');
const passport = require('middlewares/authentication');

module.exports = {
  Router() {
    const router = express.Router();

    router.get('/', passport.authenticate('jwt', { session: false }), this.authenticate);

    return router;
  },
  authenticate(req, res) {
    res.status(200).json({
      user: _.pick(req.user, ['id', 'firstname', 'lastname' , 'email', 'type']),
      success: true,
      message: 'user is athenticated',
    });
  }
}