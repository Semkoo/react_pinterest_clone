/**
 * This file deals with person data, links and etc
 */


const express = require("express")
const router = express.Router()
const moongose = require('mongoose');
const config = require('../../config/config')


//Protecting routes middleware
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {
    session: false
})

//Load Profile Model 
const Profile = require('../../models/Profile');
//Load Users Profile
const User = require('../../models/User');

/**
 * @route GET api/profile/test
 * @desc Test post route
 * @access Public
 */
router.get('/test', (req, res, next) => {
    res.send('Hello World123')
})

/**
 * @route GET api/profile/posts
 * @desc GET current users profie
 * @access Public
 */

/**
 * @route GET api/profile/
 * @desc GET current users profie
 * @access Private
 */
router.get('/', requireAuth, (req, res, next) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {

        })
})





module.exports = router;
