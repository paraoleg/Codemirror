const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const config = require('../config/config')
const checkJWT = require('../middlewares/check-jwt')

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

    User.findOne({ email: req.body.email })
        .then(user => {
            if(!user){
                res.json({
                    success: false,
                    message: 'Auth failed, user not found'
                });
            } else {
                let isPasswordValid = user.validPassword(req.body.password);
                if(!isPasswordValid){
                    res.json({
                        success: false,
                        message: 'Auth failed, wrong password'
                    });
                } else {
                    const token = jwt.sign({ user: user }, config.secret, { expiresIn: '7d' });
                    res.json({
                        success: true,
                        message: 'Enjoy your token',
                        token
                    }); 
                }
            }    
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'Auth failed, Database error'
            });
        });
    
});

router.route('/profile')
    .get(checkJWT, (req, res) => {
        User.findOne({ _id: req.decoded.user._id })
            .then(user => {
                res.json({
                    success: true,
                    message: 'Successful',
                    user
                });
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: 'Do not found user',
                });
            });
    });

module.exports = router;