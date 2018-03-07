const jwt = require('jsonwebtoken');

module.exports = (express, models, passport, secretOrKey) => ({
  router() {
    const router = express.Router();

    router.post('/', this.createUser);

    return router;
  },

  createUser(req, res) {
    const {
      username,
      email,
      password,
    } = req.body;

    models.User.create({
      username,
      email,
      password,
    })
      .then(user => {
        const { username } = user;
        const payload = { username };
        const token = jwt.sign(
          payload,
          secretOrKey,
        );

        res.json({
          success: true,
          message: 'user created',
          token,
        })
      })
      .catch(e => {
        console.log(e.errors);
        res.json({
          success: false,
          message: 'error encountered while creating user', 
        });
      })
  }
})