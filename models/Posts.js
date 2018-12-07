/**
 * Convential for model is to start with captial letter and singler
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const PostsSchema = new Schema({
  //Assoicate User with this
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  //Searching/etc
  posts: [
    {
      hadle: {
        type: String,
        require: true,
        max: 40
      },
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
    }
  ]
});

module.exports = Posts = mongoose.model("profile", ProfileSchema);
