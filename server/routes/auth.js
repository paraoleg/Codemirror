const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const config = require('../config/config')
const checkJWT = require('../middlewares/check-jwt')

router.post('/signup', (req, res, next) => {
    newUser = new User();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.setPassword(req.body.password);
    
    User.findOne({email: req.body.email}, (err, user) => {
        if(user) {
            res.json({
                success: false,
                message: 'Account with that email is already exist'
            });
        } else {
            newUser.save();

            var token = jwt.sign({
                user: newUser
            }, config.secret, {
                expiresIn: '7d'
            });

            res.json({
                success: true,
                message: 'Enjoy your token',
                token: token
            });
        }
    });
    
});

router.post('/login', (req, res, next) => {

    User.findOne({email: req.body.email}, (err, user) => {
        if(err) throw err;

        if(!user){
            res.json({
                success: false,
                message: 'Auth failed, user not found'
            });
        } else {
            var validPassword = user.validPassword(req.body.password);
            if(!validPassword){
                res.json({
                    success: false,
                    message: 'Auth failed, wrong password'
                });
            } else {
                var token = jwt.sign({
                    user: user
                }, config.secret, {
                    expiresIn: '7d'
                });

                res.json({
                    success: true,
                    message: 'Enjoy your token',
                    token: token
                }); 
            }
        }    
    });
    
});

router.route('/profile')
    .get(checkJWT, (req, res, next) => {
        User.findOne({_id: req.decoded.user._id}, (err, user) => {
            res.json({
                success: true,
                user: user,
                message: 'Successful'
            });
        });
    });

module.exports = router;