const socketIO = require('socket.io');
const ot = require('ot');
var roomList = {};

const Task = require('./models/task');

module.exports = function(server){
    let str = '//Let\'s start coding.. \n\n';

    const io = socketIO(server);
    io.on('connection', function(socket){
        socket.on('join', function (data) {
            if(!roomList[data.room]){
                var socketIOServer = new ot.EditorSocketIOServer(str, [], data.room, function(socket, cb) {
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
        });

        socket.on('disconnect', () => {
            socket.leave(socket.room);
        });
    });
}