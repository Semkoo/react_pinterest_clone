/**
 * Convential for model is to start with captial letter and singler
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const isEmpty = require("../services/is-empty");

//Create Schema
const UserSchema = new Schema({
  //THESE ARE FILEDS (LIKE COLUMNS IN MySQL)
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: () => {
      return !isEmpty(this.githubId);
    }
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
  },
  posts: [
    {
      display: {
        type: String,
        default: "public"
      },
      handle: {
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

module.exports = User = mongoose.model("users", UserSchema);
