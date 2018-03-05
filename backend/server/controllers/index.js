module.exports = (express, models) => ({
  router() {
    const router = express.Router();
    router.get('/', (req, res) => {
      res.send('root');
    })

    return router;
  }
})