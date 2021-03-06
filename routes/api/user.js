/**
 * This file will deal with authentication and login
 */
const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const config = require("../../config/config");
const jwt = require("jsonwebtoken");

//Load User Model
const User = require("../../models/User");

//Protecting routes middleware
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", {
  session: false
});
const requireGithubAuth = passport.authenticate("github", {
  scope: ["user:email"]
});

/**
 * @route GET api/user/test
 * @desc Test GET ROUTE
 * @access Public
 **/
router.get("/test", (req, res, next) => {
  res.send("Hello World123");
});

/**
 * @route POST api/user/register
 * @desc Register a user
 * @access Public
 **/
router.post("/register", (req, res, next) => {
  //Validation required
  //TODO:
  //Check if user already exists
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already in use" });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200", //Size
          r: "pg", //Rating
          d: "mm" //Default
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar: avatar,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            throw err;
          }
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              throw err;
            } else {
              newUser.password = hash;
              //Mongose save method
              newUser
                .save()
                .then(user => {
                  res.status(200).json(user);
                })
                .catch(err => {
                  res.status(500);
                  console.error(err);
                });
            }
          });
        });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(400).json(err);
    });
});

/**
 * @route POST api/user/login
 * @desc Login User / Return JWT token
 * @access Public
 **/
router.post("/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    //Check for user
    if (!user) {
      return res.status(404).json({ no_user: "User not found" });
    } else {
      //Check Password after if user exists
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          //If true user matched
          //Create JWT payload
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
          };
          // Sign Token
          jwt.sign(
            payload,
            config.secretOrKey,
            {
              expiresIn: config.tokenLife
            },
            (err, token) => {
              res.status(200).json({
                sucess: true,
                token: "Bearer " + token
              });
            }
          );
        })
        .catch(err => {
          return res.status(400);
        });
    }
  });
});

/**
 * @route POST api/user/auth/github
 * @desc This will call GitHub Login process
 * @access Public
 **/
router.get(
  "/auth/github",
  passport.authenticate("github", {
    session: false,
    scope: ["user:email"]
  })
);
/**
 * @route POST api/user/auth/github
 * @desc GitHub will call this URL as the callback
 * @access Private
 **/
router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/",
    session: false
  }),
  (req, res) => {
    // console.log("erer");
    // res.send("You've reached the callback");
    //   console.log(query);
    //   const { query } = req;
    //   const { code } = query;
    //   if (!code) {
    //     return res.send({
    //       sucess: false,
    //       message: "Error on code"
    //     });
    //   }
    //   // res.json(req.user);
    //Create JWT payload
    // console.log(req.user);
    const payload = {
      id: req.user.id,
      name: req.user.name,
      avatar: req.user.avatar
    };
    // Sign Token
    jwt.sign(
      payload,
      config.secretOrKey,
      {
        expiresIn: config.tokenLife
      },
      (err, token) => {
        if (err) throw err;
        // res.send("Hello");
        // const result = {
        //   sucess: true,
        //   token: "Bearer " + token
        // };
        // res.status(200).json({
        //   sucess: true,
        //   token: "Bearer " + token
        // });
        // res.send(result);
        res.redirect(`http://localhost:3000/SocialAccess/${token}`);
        // const htmlWithEmbeddedJWT = `
        //   <html>
        //     <script>
        //       // Save JWT to localStorage
        //       window.localStorage.setItem('jwtToken', '${token}');
        //       // Redirect browser to root of application
        //       window.location.href = "/";;
        //     </script>
        //   </html>`;
        // const htmlWithEmbeddedJWT = `
        // <!doctype html>
        // <html lang="en">
        // <head>
        //   <title>Login successful</title>
        // </head>
        // <body>
        //   <h1>Success</h1>
        //   <p>You are authenticated...</p>
        // </body>
        // <script>
        //   document.body.onload = function() {
        //     // var injectedUser =JSON.stringify(${token})  ;
        //     window.opener.postMessage(
        //       {
        //         token: "Bearer ${token}",
        //         status: 'success'
        //       },
        //       window.opener.location
        //     );
        //   };
        // </script>
        // </html>`;

        // res.send(htmlWithEmbeddedJWT);
      }
    );
  }
);

/**
 * @route GET api/user/current
 * @desc Return current user
 * @access Private
 */
router.get("/current", requireAuth, (req, res, next) => {
  res.status(200).json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});
/**
 * @route GET api/user/auth
 * @desc Return current user
 * @access Private
 */
router.get("/authSocial", requireAuth, (req, res, next) => {
  res.status(200).json({ sucess: true });
});

module.exports = router;
