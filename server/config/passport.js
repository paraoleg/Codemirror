const passport = require('passport');
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

const User = require('../models/user');
const config = require('./config');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
function(email, password, cb) {
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return cb(null, false, {
          message: 'User not found'
        });
      }

      if (!user.validPassword(password)) {
        return cb(null, false, {
          message: 'Auth failed, wrong password'
        });
      }
      
      return cb(null, user);
    })
    .catch(err => {
      return cb(err, false, {
        message: 'Database error'
      });
    });
}));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey   : config.secret
},
function (jwtPayload, cb) {
  User.findOne({_id: jwtPayload.user._id})
      .then(user => {
          return cb(null, user);
      })
      .catch(err => {
          return cb(err);
      });
}));