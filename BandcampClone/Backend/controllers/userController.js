const bcrypt = require("bcrypt");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const SALT = +process.env.SALT;
const JWT_KEY = process.env.JWT_KEY;
const jwt = require("jsonwebtoken");
const { create_user_token } = require("../middleware/auth");

const User = require("../models/User");
const Artist = require("../models/Artist");
const Album = require("../models/Album");

exports.sign_up = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const passwordHash = await bcrypt.hash(password, SALT);
    const user = {
      username: username,
      email: email,
      password: passwordHash,
      profilePic: "https://f4.bcbits.com/img/0018818200_41.jpg",
      location: "Somewhere on earth",
      website: "soundcloud.com",
      userCollection: [],
      wishlist: [],
      followers: [],
      followingUser: [],
      followingArtist: [],
    };
    let createdUser;
    try {
      createdUser = await User.create(user);
    } catch (err) {
      throw new Error("The user already exists!");
    }
    res.status(201).json({
      message: `You have successfully created ${createdUser.username}`,
    });
  } catch (error) {
    console.error(error);
    res.status(409).json({ error: "The user already exists!" });
  }
};

exports.log_in = async (req, res) => {
  try {
    const { userInput, password } = req.body;
    let useEmailToLogIn = userInput.includes("@") ? true : false;
    let user;
    if (!useEmailToLogIn) {
      user = await User.findOne({ username: userInput });
    } else {
      user = await User.findOne({ email: userInput });
    }
    if (!user) {
      res.status(404).json({ error: "User doesn't exist" });
    } else {
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (passwordCheck) {
        const userToken = {
          _id: user._id,
          username: user.username,
          userEmail: user.email,
          userPFP: user.profilePic,
        };
        const accessToken = jwt.sign(userToken, JWT_KEY);
        res.status(200).json({
          user: userToken,
          accessToken: accessToken,
        });
      } else {
        res.status(409).json({ error: "Password is not correct!" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(409).json({ error: error });
  }
};

exports.get_user = async (req, res) => {
  try {
    const username = req.params.username;
    let user = await User.find({ username: username })
      .populate("userCollection")
      .populate("wishlist")
      .populate("followers")
      .populate("followingUser")
      .populate("followingArtist");
    if (user.length === 0) {
      res.status(404).json({ message: "Can't find user!" });
    } else {
      user[0].password = "";
      for (let i = 0; i < user[0].followers.length; i++) {
        user[0].followers[i].password = "";
      }
      for (let i = 0; i < user[0].followingUser.length; i++) {
        user[0].followingUser[i].password = "";
      }
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error);
  }
};

exports.verify = async (req, res) => {
  try {
    if (req.user) {
      res.status(200).json({ message: req.user });
    } else {
      res.status(401).json({ message: "Not Authorized" });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.add_to_wishlist = async (req, res) => {
  try {
    if (req.user) {
      const albumId = req.body.albumId;
      let user = await User.findOne({ username: req.user.username }).populate(
        "wishlist"
      );
      const albumToAdd = await Album.findOne({ _id: albumId });
      const userWishlist = user.wishlist;
      let validInputFlag = true;
      for (let wlAlbum of userWishlist) {
        if (wlAlbum._id.toString() === albumToAdd._id.toString()) {
          validInputFlag = false;
        }
      }
      if (validInputFlag) {
        userWishlist.push(albumToAdd);
        const userUpdated = await User.findOneAndUpdate(
          { _id: user._id },
          { wishlist: userWishlist },
          { new: true }
        );
        res.status(204).json(userUpdated);
      } else {
        res.status(409).json({ message: "User has liked the album" });
      }
    } else {
      console.log("Not Authorized");
      res.status(401).json({ message: "Not Authorized" });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.remove_from_wishlist = async (req, res) => {
  try {
    if (req.user) {
      const albumId = req.body.albumId;
      let user = await User.findOne({ username: req.user.username }).populate(
        "wishlist"
      );
      const albumToRemove = await Album.findOne({ _id: albumId });
      const userWishlist = user.wishlist;
      for (let i = 0; i < userWishlist.length; i++) {
        if (userWishlist[i]._id.toString() === albumToRemove._id.toString()) {
          userWishlist.splice(i, 1);
        }
      }
      const userUpdated = await User.findOneAndUpdate(
        { _id: user._id },
        { wishlist: userWishlist },
        { new: true }
      );
      res.status(204).json(userUpdated);
    } else {
      console.log("Not authorized");
      res.status(401).json({ message: "Not Authorized" });
    }
  } catch (error) {
    console.error(error);
  }
};
exports.follow_user = async (req, res) => {
  try {
    if (req.user) {
      const username = req.body.username;
      let user = await User.findOne({ username: req.user.username }).populate(
        "followingUser"
      );
      const userToFollow = await User.findOne({ username: username }).populate(
        "followers"
      );
      const userFollowingUser = user.followingUser;
      let validInputFlag = true;
      for (let user of userFollowingUser) {
        if (user.username === username) {
          validInputFlag = false;
        }
      }
      if (validInputFlag) {
        userFollowingUser.push(userToFollow);
        const userUpdated = await User.findOneAndUpdate(
          { _id: user._id },
          { followingUser: userFollowingUser },
          { new: true }
        );
        const followedUserFollowers = userToFollow.followers;
        followedUserFollowers.push(userUpdated);
        const userFollowedUpdated = await User.findOneAndUpdate(
          { _id: userToFollow._id },
          { followers: followedUserFollowers },
          { new: true }
        );
        res.status(204).json([userUpdated, userFollowedUpdated]);
      } else {
        res.status(409).json({ message: "User has followed the user" });
      }
    } else {
      console.log("Not Authorized");
      res.status(401).json({ message: "Not Authorized" });
    }
  } catch (error) {
    console.error(error);
  }
};
exports.unfollow_user = async (req, res) => {
  try {
    if (req.user) {
      const username = req.body.username;
      let user = await User.findOne({ username: req.user.username }).populate(
        "followingUser"
      );
      const userToUnfollow = await User.findOne({
        username: username,
      }).populate("followers");
      const userFollowingUser = user.followingUser;
      for (let i = 0; i < userFollowingUser.length; i++) {
        if (userFollowingUser[i].username === userToUnfollow.username) {
          userFollowingUser.splice(i, 1);
        }
      }
      const userUpdated = await User.findOneAndUpdate(
        { _id: user._id },
        { followingUser: userFollowingUser },
        { new: true }
      );

      const unfollowedYserFollowingUsers = userToUnfollow.followers;
      for (let i = 0; i < unfollowedYserFollowingUsers.length; i++) {
        if (unfollowedYserFollowingUsers[i].username === user.username) {
          unfollowedYserFollowingUsers.splice(i, 1);
        }
      }
      const unfollowedUserUpdated = await User.findOneAndUpdate(
        { _id: userToUnfollow._id },
        { followers: unfollowedYserFollowingUsers },
        { new: true }
      );
      res.status(204).json([userUpdated, unfollowedUserUpdated]);
    } else {
      console.log("Not authorized");
      res.status(401).json({ message: "Not Authorized" });
    }
  } catch (error) {
    console.error(error);
  }
};
exports.follow_artist = async (req, res) => {
  try {
    if (req.user) {
      const artistName = req.body.artistName;
      let user = await User.findOne({ username: req.user.username }).populate(
        "followingArtist"
      );
      const artistToFollow = await Artist.findOne({ name: artistName });
      const userFollowingArtist = user.followingArtist;
      let validInputFlag = true;
      for (let artist of userFollowingArtist) {
        if (artist.name === artistToFollow.name) {
          validInputFlag = false;
        }
      }
      if (validInputFlag) {
        userFollowingArtist.push(artistToFollow);
        const userUpdated = await User.findOneAndUpdate(
          { _id: user._id },
          { followingArtist: userFollowingArtist },
          { new: true }
        );
        res.status(204).json(userUpdated);
      } else {
        res.status(409).json({ message: "User has liked the artist" });
      }
    } else {
      console.log("Not Authorized");
      res.status(401).json({ message: "Not Authorized" });
    }
  } catch (error) {
    console.error(error);
  }
};
exports.unfollow_artist = async (req, res) => {
  try {
    if (req.user) {
      const artistName = req.body.artistName;
      let user = await User.findOne({ username: req.user.username }).populate(
        "followingArtist"
      );
      const artistToUnfollow = await Artist.findOne({ name: artistName });
      const userFollowingArtists = user.followingArtist;
      for (let i = 0; i < userFollowingArtists.length; i++) {
        if (userFollowingArtists[i].name === artistToUnfollow.name) {
          userFollowingArtists.splice(i, 1);
        }
      }
      const userUpdated = await User.findOneAndUpdate(
        { _id: user._id },
        { followingArtist: userFollowingArtists },
        { new: true }
      );
      res.status(204).json(userUpdated);
    } else {
      console.log("Not authorized");
      res.status(401).json({ message: "Not Authorized" });
    }
  } catch (error) {
    console.error(error);
  }
};
