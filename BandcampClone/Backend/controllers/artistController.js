const bcrypt = require("bcrypt");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const SALT = +process.env.SALT;
const JWT_KEY = process.env.JWT_KEY;
const jwt = require("jsonwebtoken");

exports.get_artist = async (req, res) => {
  try {
    try {
      const artist = await Artist.find({ _id: req.params._id }).populate(
        "albums"
      );
      if (artist.length === 0) {
        res.status(404).json("The artist doesn't exist");
      } else {
        res.status(200).json(artist[0]);
      }
    } catch (error) {
      res.status(404).json("The artist doesn't exist");
    }
  } catch (error) {
    console.error(error);
  }
};

const User = require("../models/User");
const Artist = require("../models/Artist");
const Album = require("../models/Album");
