/**
 * This is an attempt of me creating a pintress clone  
 */

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const config = require('./config/config')


//Middleware Protection
const passport = require('passport');
// Passport Config
require("./services/passport")(passport);



//Routes
const router = require('./routes/routes');


//Create the app on express
const app = express();



//DB Config 
// const db_key = require('./config/config').mongoURI;
//Connect to MongoDB
mongoose.connect(config.mongoURI, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log("Mongo DB Connected!");
    })
    .catch(err => {
        console.error(err);
    });



//Body parser middleware. This middle allows to do req.body 
app.use(bodyParser.urlencoded({
    extended: false
}))
//Parse in json format
app.use(bodyParser.json());

//Log the api requests temporary 
app.use(morgan('dev'));

//Protecting our routes, we initialize the passport middleware
// app.use(session({ secret: config.secretOrKey }));
app.use(passport.initialize());
app.use(passport.session());

// CORS Support
app.use((req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, x-request-metadata');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Basic route test
app.get('/', (req, res, next) => {
    var html = "<ul>\
                <li><a href='/api/user/auth/github'>GitHub</a></li>\
                <li><a href='/api/user/logout'>logout</a></li>\
              </ul>";
    res.send(html);


})

//Use API Routes
app.use('/api', router);

const port = process.env.PORT || 5000;
const host = process.env.HOST || process.env.IP || 'localhost';
app.listen(port, () => console.log(`Server running at http://${host}:${port}`));
