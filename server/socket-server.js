const socketIO = require('socket.io');
const ot = require('ot');

const Task = require('./models/task');
const Message = require('./models/message');


let roomList = {};

module.exports = function(server){
    let str = '//Let\'s start coding..';

    const io = socketIO(server);
    io.on('connection', function(socket){
        socket.on('join', function (data) {
            if(!roomList[data.room]){
                let socketIOServer = new ot.EditorSocketIOServer(str, [], data.room, function(socket, cb) {
                    const taskContent = this.document;
                    Task.findByIdAndUpdate(data.room, {content: taskContent}, function(err){
                        if(err) return cb(false);
                        cb(true);
                    });
                });
                roomList[data.room] = socketIOServer;
            }
            roomList[data.room].addClient(socket);
            roomList[data.room].setName(socket, data.username);
            socket.room = data.room;
            socket.join(data.room);
            
        })
        socket.on('newMessage', data => {
            io.to(socket.room).emit('newMessage', data);
            let message = new Message()
            message.owner = data.owner;
            message.text = data.text;
            message.date = Date.now();
            message.save()
                .then(message => {
                    Task.findByIdAndUpdate(
                        { _id: socket.room },
                        { $push: { messages: [message] }}
                    )
                    .catch(err => console.log(err));
                })            
            
        });

        socket.on('disconnect', () => {
            socket.leave(socket.room);
        });
    });
}