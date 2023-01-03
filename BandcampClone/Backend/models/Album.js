const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const AlbumSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    require: true,
  },
  cover: {
    type: String,
    require: true,
  },
  releaseDate: {
    type: Date,
    require: true,
  },
  description: {
    type: String,
  },
  genre: {
    type: String,
  },
  format: {
    type: String,
  },
  artist: {
    type: String,
    require: true,
  },
  artistRef: {
    type: String,
  },
  tracks: [
    {
      title: {
        type: String,
        required: true,
        unique: true,
      },
      price: {
        type: Number,
        require: true,
      },
      source: {
        type: String,
        // require: true,
      },
      length: {
        type: Number,
        require: true,
      },
    },
  ],
  ownedBy: [
    {
      _id: {
        type: String,
      },
      username: {
        type: String,
      },
      profilePic: {
        type: String,
      },
    },
  ],
});

const Album = mongoose.model("Album", AlbumSchema, "Album");

module.exports = Album;
