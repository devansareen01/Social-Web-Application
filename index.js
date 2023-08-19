
const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.urlencoded());
app.use(cookieParser());
// use express router
app.use('/', require('./routes'));
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(express.static('./assets'));




app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(` Server is running on port :${port}`);
});