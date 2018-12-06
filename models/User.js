/**
 * Convential for model is to start with captial letter and singler
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema 
const UserSchema = new Schema({
    //THESE ARE FILEDS (LIKE COLUMNS IN MySQL)
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String
    },
    githubId: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('users', UserSchema)
