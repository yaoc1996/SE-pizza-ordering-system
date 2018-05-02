const express = require('express');
const models = require('models');

module.exports = {
    Router() {
      const router = express.Router();
  
      router.get('/', this.customerRating);
  
      return router;
    },

    customerRating(req, res){
      if (!req.body.value || !req.body.reason){
        res.status(400).json({sucess: false, msg: 'Not enough ratings'});
      } else {
        models.user.find({
          where: {

          }
        })
      }
    }
}