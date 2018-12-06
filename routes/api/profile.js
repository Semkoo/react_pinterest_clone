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
    Profile.findOne({
            user: req.user.id
        })
        .populate('user', ['name', 'avatar'])
        .then((profile_res) => {
            if (!profile_res) {
                // errors.no_profile = "There is no profile for this user"
                res.status(404).json({ no_profile: "There is no profile for this user" })
            }
            res.status(200).json(profile_res);
        })
        .catch((error) => {
            console.log(error);
            res.status(404).json(error);
        });
})

module.exports = router;
