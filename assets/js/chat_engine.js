class ChatEngine {
    constructor(chatBoxId, userEmail) {
        this.chatBoxId = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.socket = io.connect('http://localhost:5000');

        if (this.userEmail) {
            this.connectionHandler();
        }
    }

    connectionHandler() {

        let self = this;
        this.socket.on('connect', function () {
            console.log('connection established using sockets');

            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'vartachat'
            })

            self.socket.on('user_joined', function (data) {
                console.log('a user joined', data);
            })
        });

        $('#send-button').click(function () {
            console.log('clicked send button')
            let msg = $('#message-input').val();

            if (msg != '') {
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'vartachat'
                });
            }
        });


        self.socket.on('receive_message', function (data) {
            console.log('message received', data.message);



            let newMessage = $('<li>');

            let messageType = 'other-messages'

            if (data.user_email == self.userEmail) {
                messageType = 'self-message';
            }

            const messageSpan = $('<span>', {
                html: data.message
            });
            if (messageType == 'other-messages') {
                appendOtherMessage(messageSpan);
            } else {
                appendSelfMessage(messageSpan);
            }

        })
        // Append a new self message
        function appendSelfMessage(messageText) {
            const newMessage = $('<li>').addClass('self-messages message');
            const messageSpan = $('<span>').html(messageText);
            newMessage.append(messageSpan);
            $('#chat-messages-list').append(newMessage);
        }

        // Append a new other message
        function appendOtherMessage(messageText) {
            const newMessage = $('<li>').addClass('other-messages message');
            const messageSpan = $('<span>').html(messageText);
            newMessage.append(messageSpan);
            $('#chat-messages-list').append(newMessage);
        }



    }

}