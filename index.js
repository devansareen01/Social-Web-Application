const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

//used for session cookes 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');

// extract style and scripts from sub pages into the layout


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// use express router

app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
    name: 'VARTACHAT',
    //todo change the secret before deployment in production mode
    secret :"blah",
    saveUniinitialized :false,
    resave:false,
    cookie:{
        maxAge:(1000 *60 *100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));


app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(` Server is running on port :${port}`);
});