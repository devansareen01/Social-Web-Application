module.exports.profile = function (req, res) {
    return res.render('users', {
        title: "USERS"
    });
}
//render sign in page
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: "VARTACHAT | Sign Up"
    });
}

//render sign up page
module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: "VARTACHAT | Sign In"
    });
}

//get the sign up data
module.exports.create = function (req, res) {
    //todo
}

// sign in and create a session for user

module.exports.createSession = function (req, res) {
    //todo
}