const models = require('models');
const passport = require('passport');
const passportJWT = require('passport-jwt');

const env = process.env.NODE_ENV || 'development';
const { secretOrKey } = require('config/config.json')[env];
const { ExtractJwt, Strategy } = passportJWT;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey,
};

const strategy = new Strategy(jwtOptions, (jwt_payload, next) => {
  models.User.findOne({
    where: {
      username: jwt_payload.username,
    },
  })
    .then(user => {
      if (!user) {
        next(null, null);
      } else {
        next(null, user);
      }
    })
})

passport.use(strategy);
passport.secretOrKey = secretOrKey;  

module.exports = passport;
