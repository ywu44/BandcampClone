const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  profilePic: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  albums: [
    {
      type: refType,
      ref: "Album",
    },
  ],
});

const Artist = mongoose.model("Artist", ArtistSchema, "Artist");

module.exports = Artist;
