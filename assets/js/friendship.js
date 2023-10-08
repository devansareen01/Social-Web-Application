


const fromUserId = '<%= profile.user._id%>';
const toUserId = '<%= user._id%>';




async function toggleFriendship() {
    console.log(fromUserId);
    console.log(toUserId);
    try {

        const respone = await fetch('/users/check-friendShip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        //ok is boolean function
        if (respone.ok) {
            const data = await respone.json();
            const isFriend = data.isFriend;

            if (isFriend) {
                await removeFriend();
            } else {
                await addFriend();
            }
        } else {

            console.error('Failed to check friendship status');

        }
    } catch (error) {

        console.error('Error:', error);
    }
}
async function addFriend() {
    try {

        const response = await fetch('/users/add-friend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fromUserId, toUserId }),
        });

        if (response.ok) {
            document.getElementById('friendship-button').innerText = 'Remove Friend';
            console.log('Friend added successfully');
        } else {
            console.error('Failed to add friend');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function removeFriend() {
    try {
        const response = await fetch('/users/remove-friend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fromUserId, toUserId }),
        });

        if (response.ok) {
            document.getElementById('friendship-button').innerText = 'Add Friend';
            console.log('Friend removed successfully');
        } else {
            console.error('Failed to remove friend');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

