/**
 * This file deals with person data, links and etc
 */

const express = require("express");
const router = express.Router();
const moongose = require("mongoose");
const config = require("../../config/config");

//Protecting routes middleware
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", {
  session: false
});

//Load Profile Model
// const Posts = require("../../models/Posts");
//Load Users Profile
const User = require("../../models/User");

/**
 * @route GET api/profile/test
 * @desc Test post route
 * @access Public
 */
router.get("/test", (req, res, next) => {
  res.send("Hello World123");
});

/**
 * @route GET api/profile/posts
 * @desc GET all the posts to show to public
 * @access Public
 */
router.get("/posts", (req, res, next) => {
  // User.count()
  //   .then(res => {
  //     console.log(res);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  // Get a random entry
  var random = Math.floor(Math.random() * 8);
  //fetch one offset by our random #
  User.findRandom(
    { "posts.display": "public" },
    { posts: 1 },
    { count: 8 },
    function(err, results) {
      if (err) {
        console.error(err);
        res.status(404).json({ no_posts: "there are no posts" });
      } else {
        let articles = [];
        for (var key in results) {
          if (results[key].posts) {
            for (var id in results[key].posts) {
              if (results[key].posts[id].display == "public") {
                articles.push(results[key].posts[id]);
              }
            }
          }
        }
        // console.log(articles[0].display);
        if (!articles) {
          res.status(404).json({ no_posts: "there are no posts" });
        }
        res.status(200).json(articles);
        console.log(results);
      }
    }
  );
  // .then(results => {
  //   let articles = [];
  //   for (var key in results) {
  //     if (results[key].posts) {
  //       for (var id in results[key].posts) {
  //         if (results[key].posts[id].display == "public") {
  //           articles.push(results[key].posts[id]);
  //         }
  //       }
  //     }
  //   }
  //   // console.log(articles[0].display);
  //   if (!articles) {
  //     res.status(404).json({ no_posts: "there are no posts" });
  //   }
  //   res.status(200).json(articles);
  // })
  // .catch(err => {
  //   console.error(err);
  //   res.status(404).json({ no_posts: "there are no posts" });
  // });
});

/**
 * @route GET api/profile/
 * @desc GET current users profie
 * @access Private
 */
router.get("/", requireAuth, (req, res, next) => {
  User.findOne({
    _id: req.user._id
  })
    .then(profile => {
      if (!profile) {
        // errors.no_profile = "There is no profile for this user"
        res
          .status(404)
          .json({ no_profile: "There is no profile for this user" });
      }
      delete profile.password;
      res.status(200).json(profile);
    })
    .catch(error => {
      console.log(error);
      res.status(404).json(error);
    });
});
/**
 * @route POST api/profile/post
 * @desc Create a new post and publish
 * @access Private
 */
router.post("/post", requireAuth, (req, res, next) => {
  //Pull the result only to this route
  const postFields = {};
  //Default by the requireAuth
  //   postFields.user = req.user.id;
  //Add the links/title/description
  //TODO: VALIDATION
  postFields.handle = req.body.handle;
  postFields.display = req.body.display;
  postFields.title = req.body.title;
  postFields.href_link = req.body.href_link;
  postFields.description = req.body.description;
  console.log(postFields);
  //Find the db person
  User.findOne({
    _id: req.user._id
  })
    .then(profile => {
      //   if (profile) {

      //   }
      // Add to posts array
      profile.posts.unshift(postFields);
      profile
        .save()
        .then(profile => res.status(200).json(profile))
        .catch(err => {
          res.status(500);
          console.error(err);
        });
    })
    .catch(err => {
      res.status(500);
      console.error(err);
    });
});
/**
 * @route PUT api/profile/post/:id
 * @desc Update post with the id
 * @access Private
 */
router.post("/post/:id", requireAuth, (req, res, next) => {
  //TODO
});
/**
 * @route DELETE api/profile/post/:id
 * @desc DELETE post with the id
 * @access Private
 */
router.delete("/post/:id", requireAuth, (req, res, next) => {
  User.findOne({
    _id: req.user._id
  })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.posts
        .map(item => item.id)
        .indexOf(req.params.id);

      // Splice out of array
      profile.posts.splice(removeIndex, 1);

      // Save
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => {
      console.log(err);
      res.status(404).json(err);
    });
});

module.exports = router;
