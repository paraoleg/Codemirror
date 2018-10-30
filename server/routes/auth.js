const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/user');

const config = require('../config/config');
const isAuth = require('../middlewares/isAuth');

router.post('/signup', (req, res) => {
    let newUser = new User();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.setPassword(req.body.password);
    
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user) {
                res.json({
                    success: false,
                    message: 'Account with that email is already exist'
                });
            } else {
                newUser.save();
                var token = jwt.sign({ user: newUser }, config.secret, { expiresIn: '7d' });
                console.log(token)
                res.json({
                    success: true,
                    message: 'Enjoy your token',
                    token
                });
            }
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'Auth failed, Database error'
            });
        });
});

router.post('/login', (req, res) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.json({
                success: false,
                message: info ? info.message : 'Login failed'
            });
        }

        req.login(user, {session: false}, err => {
            if (err) {
                console.log(err);
                return res.json({
                    success: false,
                    message: 'Login failed'
                });
            }

            const token = jwt.sign({ user }, config.secret, { expiresIn: '7d' });
            res.json({
                success: true,
                message: 'Enjoy your token',
                token
            }); 
        });
    })(req, res);
});

router.route('/profile')
    .get(isAuth, (req, res) => {
        console.log(req.user);
        if (!req.user){
            res.json({
                success: false,
                message: 'Do not found user',
            });
        } else {
            User.findOne({ _id: req.user._id })
            .then(user => {
                res.json({
                    success: true,
                    message: 'Successful',
                    user
                });
            })
            .catch(err => {
                console.log('Err' + err)
                res.json({
                    success: false,
                    message: 'Do not found user',
                });
            });
        }
        
    });

module.exports = router;