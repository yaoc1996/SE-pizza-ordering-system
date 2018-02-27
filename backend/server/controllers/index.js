const path = require('path');
const basename = path.basename(module.filename);

module.exports = (registerRouters, models) => ({
  router() {
    const router = registerRouters(__dirname, basename, models);
    router.get('/get', this.testGet);
    router.post('/post', this.testPost);

    return router;
  },
  testGet(req, res) {
    res.json({ message: 'Reached server for SE-pizza-ordering-system' });
  },
  testPost(req, res) {
    models.User.create(req.body)
      .then(user => res.json(user))
      .catch(err => res.json(err));
  }
})