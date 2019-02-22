const Task = require('../models/task');

exports.getUserTasks = (req, res) => {
    Task.find({owner: req.user._id})
        .then(tasks => {
            res.json({
                success: true,
                tasks
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                success: false,
                message: 'Error: ' + err
            });
        });
}

exports.createTask = (req, res) =>{
    let newTask = new Task();
    newTask.owner = req.user._id;
    newTask.content = '//Let\'s start coding..'
    newTask.save()
        .then(data => res.json({
            success: true,
            taskId: data._id            
        }))
        .catch(err => {
            res.json({
                success: false,
                message: err
            }); 
        });
}

exports.getTask = (req, res) => {
    if(req.params.id){
        Task.findOne({_id: req.params.id})
            .populate({
                path: 'messages',
                populate: { path: 'owner', select: 'name -_id' }
              })
            .then(task => {
                res.json({
                    success: true,
                    task
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
}