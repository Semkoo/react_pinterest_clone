/**
 * This is an attempt of me creating a pintress clone  
 */

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan')



//Routes
const router = require('./routes/routes');


//Create the app on express
const app = express();



//DB Config 
const db_key = require('./config/config').mongoURI;
//Connect to MongoDB
mongoose.connect(db_key, {
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

//Basic route test
app.get('/', (req, res, next) => {
    res.send('Hello World')
})

//Use API Routes
app.use('/api', router);

const port = process.env.PORT || 5000;
const host = process.env.HOST || process.env.IP || 'localhost';
app.listen(port, () => console.log(`Server running at http://${host}:${port}`));
