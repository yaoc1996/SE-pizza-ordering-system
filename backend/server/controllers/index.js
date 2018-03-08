module.exports = ({ express }) => ({
  router() {
    const router = express.Router();
    router.get('/', (req, res) => {
      res.send('root');
    })

    return router;
  }
})