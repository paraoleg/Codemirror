const router = require('express').Router();

const Task = require('../models/task');
const isAuth = require('../middlewares/isAuth');

router.get('/', isAuth, (req, res) => {
    Task.find({owner: req.user._id})
        .then(tasks => {
            res.json({
                success: true,
                tasks: tasks
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                success: false,
                message: 'Error: ' + err
            });
        });
});

router.get('/newTask',  isAuth, (req, res) =>{
    let newTask = new Task();
    newTask.owner = req.user._id;
    newTask.content = '//New task'
    newTask.save()
        .then(data => res.json({
            success: true,
            taskId: data._id            
        }))
        .catch(err => {
            console.log(err);
            res.json({
                success: false,
                message: err
            }); 
        });
});

router.get('/task/:id', isAuth, (req, res) => {
    if(req.params.id){
        Task.findOne({_id: req.params.id})
            .then(data => {
                res.json({
                    success: true,
                    task: data
                });
            })
            .catch(err => {
                console.log(err);
                res.json({
                    success: false,
                    message: err
                }); 
            });
    } else {
        res.json({
            success: false,
            message: 'Wrong address'
        }); 
    }
});


module.exports = router;