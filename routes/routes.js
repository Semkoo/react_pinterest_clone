const express = require("express")
const router = express.Router()

const user = require("./api/user");
const profile = require("./api/profile");
const posts = require("./api/posts");

router.use('/user', user);
router.use('/profile', profile);
router.use('/posts', posts)

module.exports = router;
