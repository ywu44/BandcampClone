const router = require("express").Router();
const AlbumController = require("../controllers/albumController");
const { auth_session } = require("../middleware/auth");

router.get('/getAlbums', AlbumController.get_albums);
router.get('/getAlbum/:_id', AlbumController.get_album);

module.exports = router;