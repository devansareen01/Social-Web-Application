const chatSockets = function (socketServer) {
    const io = require('socket.io')(socketServer, {
        cors: {
            origin: 'http://localhost:8000', // Specify the allowed origin
            methods: ['GET', 'POST'], // Specify the allowed HTTP methods
        },
    });

    io.sockets.on('connection', function (socket) {
        console.log('New connection received', socket.id);

        socket.on('disconnect', function () {
            console.log('Socket disconnected!');
        });

        socket.on('join_room', function (data) {
            console.log('join request recived', data);

            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined', data);
        });

        socket.on('send_message', function (data) {
            io.in(data.chatroom).emit('receive_message', data);
        })
        // Add your socket event handlers here
    });
};

module.exports = {
    chatSockets: chatSockets,
};
