$(document).ready(function () {
    $(".send").click(function () {
        const message = $("#input").val();
        const toUser = currentChatPartner.id;

        // Create a data object to send to the server
        const data = {
            from: currentUser.id,
            to: toUser,
            message: message,
        };

        // Send an AJAX POST request to store the message in the database
        $.ajax({
            type: "POST",
            url: "/chat/addMessage",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function (response) {
                // Handle success, e.g., clear the input field
                $("#input").val("");
            },
            error: function (error) {
                // Handle errors
                console.error("Error:", error);
            }
        });
    });
});
