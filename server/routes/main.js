const router = require('express').Router();

const Task = require('../models/task');
const checkJWT = require('../middlewares/check-jwt');

router.get('/', checkJWT, (req, res, next) => {
    Task.find({owner: req.decoded.user._id})
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

router.get('/newTask', checkJWT, (req, res) =>{
    let newTask = new Task();
    newTask.owner = req.decoded.user._id;
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

router.get('/task/:id', (req, res) => {
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