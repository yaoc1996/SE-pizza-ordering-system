const passport = require('passport');
const passportJWT = require('passport-jwt');
const { ExtractJwt, Strategy } = passportJWT;

module.exports = ({ secretOrKey, models }) => {
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
          next(null, false);
        } else {
          next(null, user);
        }
      })
  })

  passport.use(strategy);

  return passport;
}
