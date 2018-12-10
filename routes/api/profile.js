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
  // { "posts.display": { $all: ["public"] } }
  // 'Friends.id': req.body.id
  User.find()
    // .selectAll({ posts: { { display: "public" } } })
    .then(data => {
      // console.log(data);
      let posts = [];
      // let post = [];

      var post = data.map((value, index) => {
        if (Object.keys(value.posts).length > 0) {
          return value.posts;
        }
      });
      console.log(post);
      for (var i = 0; i < post.length; i++) {
        // console.log(post[i].length);
        for (var j = 0; j < post[i].length; j++) {
          posts.push(post[i][j]);
        }
      }

      // for (var key in data) {
      //   if (data[key].posts.length > 0) {
      //     // console.log(data[key].posts);
      //   }
      //   // posts.push(data[key].posts);
      // }
      // for (var key in posts) {
      //   post.push(posts[key]);
      //   // posts.push(data[key].posts);
      // }
      // console.log(posts);
      if (!posts) {
        res.status(404).json({ no_posts: "there are no posts" });
      }
      res.status(200).json(post);
    })
    .catch(err => {
      console.error(err);
      res.status(404).json({ no_posts: "there are no posts" });
    });
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
