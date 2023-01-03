const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
  },
  location: {
    type: String,
  },
  website: {
    type: String,
  },
  userCollection: [
    {
      type: refType,
      ref: "Album",
    },
  ],
  wishlist: [
    {
      type: refType,
      ref: "Album",
    },
  ],
  followers: [
    {
      type: refType,
      ref: "User",
    },
  ],
  followingUser: [
    {
      type: refType,
      ref: "User",
    },
  ],
  followingArtist: [
    {
      type: refType,
      ref: "Artist",
    },
  ],
});

const User = mongoose.model("User", UserSchema, "User");

module.exports = User;
