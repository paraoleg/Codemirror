const router = require('express').Router();

const isAuth = require('../middlewares/isAuth');
const taskController = require('../controllers/task');

router.get('/', isAuth, taskController.getUserTasks);
router.get('/newTask',  isAuth, taskController.createTask);
router.get('/task/:id', isAuth, taskController.getTask);


module.exports = router;