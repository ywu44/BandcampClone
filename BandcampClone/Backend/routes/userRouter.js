const router = require("express").Router();
const UserController = require("../controllers/userController");
const { auth_user_session } = require("../middleware/auth");

router.post("/signup", UserController.sign_up);
router.post("/login", UserController.log_in);
router.get("/:username", UserController.get_user);

router.post("/verify", auth_user_session, UserController.verify);

router.put(
  "/addToWishList",
  auth_user_session,
  UserController.add_to_wishlist
);
router.put(
  "/removeFromWishlist",
  auth_user_session,
  UserController.remove_from_wishlist
);

router.put('/followUser', auth_user_session, UserController.follow_user);
router.put('/unfollowUser', auth_user_session, UserController.unfollow_user);
router.put('/followArtist', auth_user_session, UserController.follow_artist);
router.put('/unfollowArtist', auth_user_session, UserController.unfollow_artist);

module.exports = router;
