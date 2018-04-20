const express = require('express');
const _ = require('lodash');

module.exports = ({ passport }) => {
  return ({
    router() {
      const router = express.Router();

      router.get('/', passport.authenticate('jwt', { session: false }), this.authenticate);

      return router;
    },
    authenticate(req, res) {
      res.status(200).json(_.pick(req.user, ['username', 'email', 'type']));
    }
  });
}