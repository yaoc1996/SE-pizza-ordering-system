const express = require('express');

module.exports = ({ passport }) => ({
  router() {
    const router = express.Router();

    router.get('/', (req, res) => {
      res.send('Welcome to the online pizza delivery system API.')
    })

    return router;
  }
})