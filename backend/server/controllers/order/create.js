// const express = require('express');
// const models = require('models');

// module.exports = {
//     Router() {
//       const router = express.Router();
  
//       router.post('/', this.createOrder);
  
//       return router;
//     },

//     createOrder(req, res){
//       const {
//         pizza
//       } = req.body;

//     models.Order.create({
//       subtotal,
//       tax,
//       total,
//       tips,
//     })
//       .then(pizza =>{
//         if (!pizza){
//           return res.status(404).json({
//             message: "No pizza ordered"
//           });
//         } else {

//         }
//       }) 
    
    
//     }