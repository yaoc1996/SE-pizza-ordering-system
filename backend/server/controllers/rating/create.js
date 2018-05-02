const express = require('express');
const models = require('models');

module.exports = {
    Router() {
      const router = express.Router();
  
      router.post('/', this.createRating);
  
      return router;
    },
    createRating(req, res) {
      const {
        value,
        reason,
        source,
        target,
      } = req.body;
      
      models.Rating.create({
        value,
        reason,
      })
        .then(rating => {
          Promise.all([
            models.User.findOne({
              where: {
                username: source,
              }
            }),
            models.User.findOne({
              where: {
                username: target,
              }
            })
          ])
          .then(([source, target]) => {
              rating.setSource(source)
              rating.setTarget(target)
            })
        })
<<<<<<< 0bb1286a3ecb0959ff18e709dce1f2aebb9c91c3
    }

  
}
=======
    }
>>>>>>> controllers'
