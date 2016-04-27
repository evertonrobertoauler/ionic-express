var passport = require('passport');
var LocalStrategy = require('passport-local');
var BearerStrategy = require('passport-http-bearer');
var CryptoJS = require('crypto-js');
var jwt = require('jsonwebtoken');

var config = require('./config');
var models = require('./models');

function corsMiddleware(req, res, next) {
  res.set({
    'Access-Control-Allow-Origin': req.headers.origin,
    'Access-Control-Allow-Headers': req.headers['access-control-request-headers'] || 'Origin, X-Requested-With, Content-Type, Accept,cache-control',
    'Access-Control-Allow-Methods': req.headers['access-control-request-method'] || 'GET,PUT,PATCH,POST,DELETE,OPTIONS'
  });

  req.method === 'OPTIONS' ? res.end() : next();
}

function createJwt(user) {
  var payload = {
    id: user.id,
    name: user.name,
    email: user.email
  };

  return jwt.sign(payload, config.auth.secret);
}

function encryptPassword(password) {
  if (password && password.length > 6)
    return CryptoJS.HmacSHA3(password, config.auth.secret) .toString();
}

function validatePassword(plainPassword, encryptedPassword) {
  return encryptPassword(plainPassword) === encryptedPassword;
}

passport.use(new LocalStrategy(function (email, password, done) {
  models.Users
    .findOne({where: {email: email}})
    .then(function (user) {
      done(null, user && validatePassword(password, user.password) ? user : false);
    })
    .catch(done);
}));

passport.use(new BearerStrategy(function (token, done) {
  try {
    var user = jwt.verify(token, config.auth.secret);
    done(null, user);
  } catch (err) {
    done(err);
  }
}));

module.exports = {
  corsMiddleware: corsMiddleware,
  passport: passport,
  createJwt: createJwt,
  encryptPassword: encryptPassword,
  login: passport.authenticate('local', { session: false }),
  loginRequired: passport.authenticate('bearer', { session: false })
};
