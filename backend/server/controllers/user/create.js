const jwt = require('jsonwebtoken');

module.exports = ({ express, models, secretOrKey }) => ({
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
          { expiresIn: '10h' },
        );

        res.json({
          success: true,
          message: 'user created',
          token,
        })
      })
      .catch(e => {
        const message = 
          (e.errors)
            ? e.errors[0].message
            : 'error encountered while creating user';
        res.json({
          success: false,
          message,
        });
      })
  }
})