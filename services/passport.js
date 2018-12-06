const JwtStrategy = require('passport-jwt').Strategy;
const GitHubStrategy = require('passport-github').Strategy;

const ExtractJwt = require('passport-jwt').ExtractJwt;
// const db_handler = require('../services/database');
//Database Handler
const mongoose = require('mongoose');
const User = require('./../models/User.js');
mongoose.model('users');
const config = require('../config/config');



const jwtOptions = {};
/**
 * @desc This is extracting the token from the header when we send over the api call.
 * @type Bearer Token
 */
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.secretOrKey;

module.exports = (passport) => {
    // passport.serializeUser(function(user, done) {
    //     // placeholder for custom user serialization
    //     // null is for errors
    //     done(null, user);
    // });

    // passport.deserializeUser(function(user, done) {
    //     // placeholder for custom user deserialization.
    //     // maybe you are going to get the user from mongo by id?
    //     // null is for errors//     done(null, user);
    // });


    passport.use('jwt', new JwtStrategy(jwtOptions, (jwt_payload, done) => {
        //Returns the payload we created under login route
        // console.log(jwt_payload);
        User.findById(jwt_payload.id)
            .then((user) => {
                if (user) {
                    return done(null, user)
                }
                return done(null, false)
            })
            .catch((err) => {
                console.log(err);
                return done(null, false)
            })

    }));
    passport.use('github', new GitHubStrategy({
            clientID: 'e349192644915f298e96',
            clientSecret: 'f2e46f1611e227eac5faee9f47be7178be73c1a5',
            callbackURL: "http://test1-semir121.c9.io:8080/api/user/auth/github"
        },
        (accessToken, refreshToken, profile, done) => {
            // console.log(profile._json)
            User.findOneAndUpdate({
                githubId: profile.id
            }, {
                $set: {
                    name: profile._json.name,
                    email: profile._json.email,
                    avatar: profile._json.avatar_url,
                    githubId: profile.id
                }
            }, {
                new: true, // return new doc if one is upserted
                upsert: true // insert the document if it does not exist
            }).then(user => {
                if (user) {
                    // console.log(user)
                    return done(null, user)
                }
                return done(null, false)
            }).catch((err) => {
                console.error(err);
                return done(null, false)
            });
        }));
}
