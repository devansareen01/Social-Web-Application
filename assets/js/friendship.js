
class ToggleFriendship {
    constructor(buttonElement, fromUserId, toUserId) {
        this.buttonElement = buttonElement;
        this.isFriend = false;
        this.fromUserId = fromUserId;
        this.toUserId = toUserId;
        this.initializeState();
        this.addClickHandler();
    }

    initializeState() {
        console.log('Initializing state...');
        // Initialize the friendship status based on the server's response
        // You should load this from the server
        $.ajax({
            type: 'POST',
            url: '/users/check-friendShip',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({ fromUserId: this.fromUserId, toUserId: this.toUserId }), // Use this.fromUserId and this.toUserId
            success: (data) => {
                // console.log('Sending AJAX request with payload:', { fromUserId: this.fromUserId, toUserId: this.toUserId });
                // console.log('Friendship status loaded:', data);
                this.isFriend = data.isFriend;
                this.updateButtonText();
            },
            error: (error) => {
                console.error('Failed to initialize friendship status: ' + JSON.stringify(error));
            }
        });
    }


    addClickHandler() {
        $(this.buttonElement).click(() => {
            this.toggle();
        });
    }

    toggle() {
        // Toggle the friendship status (isFriend)
        this.isFriend = !this.isFriend;

        // Implement logic to add or remove a friend based on the current state
        if (this.isFriend) {
            this.addFriend();
        } else {
            this.removeFriend();
        }
        this.updateButtonText(); 2   2
    }

    updateButtonText() {
        const buttonText = this.isFriend ? 'Unfollow' : 'Follow';
        $(this.buttonElement).text(buttonText);
    }

    addFriend() {
        // Implement adding a friend here, e.g., using AJAX
        // Update the server's state accordingly
        $.ajax({
            type: 'POST',
            url: '/users/add-friend',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({ fromUserId: this.fromUserId, toUserId: this.toUserId }),
            success: function () {
                console.log('Friend added successfully');
            },
            error: function (error) {
                console.error('Failed to add friend: ' + JSON.stringify(error));
            }
        });
    }

    removeFriend() {
        // Implement removing a friend here, e.g., using AJAX
        // Update the server's state accordingly
        $.ajax({
            type: 'POST',
            url: '/users/remove-friend',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({ fromUserId: this.fromUserId, toUserId: this.toUserId }),
            success: function () {
                console.log('Friend removed successfully');
            },
            error: function (error) {
                console.error('Failed to remove friend: ' + JSON.stringify(error));
            }
        });
    }
}
