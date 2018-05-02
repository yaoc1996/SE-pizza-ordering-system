const express = require('express');
const models = require('models');

module.exports = {
    Router() {
      const router = express.Router();
  
      router.post('/', this.createOrder);
  
      return router;
    },
  
    createOrder(req, res) {
      const {
      subtotal,
      tax,
      total,
      tip,
    } = req.body;
      
    models.User.findOne({
      where: { email },
    })
    .then(user =>{
      if(!user){
        res.statu(400).json({success: false, msg: 'Please create your own pizza'})
      } else {
        models.order.create({
          where: {
            
          }
        })
      }

    });
  }
}
