/**
 * Convential for model is to start with captial letter and singler
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema 
const ProfileSchema = new Schema({
    //Assoicate User with this
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    //Searching/etc
    hadle: {
        type: String,
        require: true,
        max: 40
    },
    posts: [{
        title: {
            type: String,
            require: true

        },
        href_link: {
            type: String,
            require: true
        },
        description: {
            type: String
        }
    }]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
