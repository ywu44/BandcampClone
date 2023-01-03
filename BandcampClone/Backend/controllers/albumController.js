const bcrypt = require("bcrypt");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const SALT = +process.env.SALT;
const JWT_KEY = process.env.JWT_KEY;
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Artist = require("../models/Artist");
const Album = require("../models/Album");

exports.get_albums = async (req, res) => {
  try {
    const genre = req.query.genre;
    const format = req.query.format;
    let albums = undefined;
    if (genre && format) {
      albums = await Album.find({
        genre: { $in: genre },
        format: { $in: format },
      });
    } else if (!format && genre) {
      albums = await Album.find({ genre: genre });
    } else if (!genre && format) {
      albums = await Album.find({ format: format });
    } else {
      albums = await Album.find();
    }
    res.status(200).json(albums);
  } catch (error) {
    console.error(error);
  }
};

exports.get_album = async (req, res) => {
  try {
    try {
      const album = await Album.find({ _id: req.params._id });
      if (album.length === 0) {
        res.status(404).json("The album doesn't exist");
      } else {
        res.status(200).json(album[0]);
      }
    } catch (error) {
      res.status(404).json("The album doesn't exist");
    }
  } catch (error) {
    console.error(error);
  }
};
