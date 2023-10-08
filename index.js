const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const db = require('./config/mongoose');

//used for session cookes 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const passportJWT = require('./config/passort-jwt');
const passortGoogle = require('./config/passport-google-oauth2');
const MongoStore = require('connect-mongo');
const chatServer = require('http').createServer(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening to port 5000')
// const sassMiddleware = require('node-sass-middleware')
// extract style and scripts from sub pages into the layout

// app.use(sassMiddleware({
//     src: './assets/scss',
//     dest: './assets/css',
//     debug:true,
//     outputStyle:'extended',
//     prefix: '/css'
// }));

const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
// make the uploads path availble to the browser
app.use('/upload', express.static(__dirname + '/upload'));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));
// use express router

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json());
// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'VARTACHAT',
    //todo change the secret before deployment in production mode
    secret: "blah",
    saveUniinitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongooseConnection: db,
            mongoUrl: 'mongodb://127.0.0.1/VARTACHAT_development',
            autoRemove: 'disabled'
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMiddleware.setFlash);

app.use('/', require('./routes'));


app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(` Server is running on port :${port}`);
});