const express = require('express');
const passport = require('middlewares/authentication');
const verifyRole = require('middlewares/verifyRole');
const models = require('models');

module.exports = {
  Router() {
    const router = express.Router();

    router.post(
      '/',
      passport.authenticate('jwt', { session: false }),
      this.rate,
    )

    return router;
  },
  rate(req, res) {
    models.Rating.findOne({
      where: {
        id: req.body.id, 
      }
    })
      .then(rating => {
        rating.updateAttributes({
          value: parseInt(req.body.value),
          reason: req.body.reason,
          status: 'completed',
        })

        res.json({
          success: true,
          message: 'success put rating',
        })
      })
      .catch(e => {
        console.log(e)

        res.json({
          success: false,
          message: 'error encountered while put rating',
        })
      })
  }
}