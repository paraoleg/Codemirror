const router = require('express').Router();

const isAuth = require('../middlewares/isAuth');
const authController = require('../controllers/auth.js')


router.post('/signup', authController.signUp);
router.post('/login', authController.login);

router.get('/profile', isAuth, authController.getProfile);

module.exports = router;