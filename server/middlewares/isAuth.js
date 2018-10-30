const passport = require('passport');

module.exports = function(req, res, next) {
    passport.authenticate('jwt', {
        session: false
    })(req, res, next);
}