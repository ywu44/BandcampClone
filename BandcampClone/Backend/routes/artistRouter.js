const router = require("express").Router();
const ArtistController = require("../controllers/artistController");
const { auth_session } = require("../middleware/auth");

router.get('/getArtist/:_id', ArtistController.get_artist);

module.exports = router;