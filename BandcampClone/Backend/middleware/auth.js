const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const JWT_KEY = process.env.JWT_KEY;

exports.create_user_token = (user) => {
  const userToken = {
    _id: user._id,
    username: user.username,
    userEmail: user.email,
  };
  const accessToken = jwt.sign(userToken, process.env.JWT_KEY);
  return accessToken;
};

exports.auth_user_session = (req, res, next) => {
  try {
    const token = req.body.accessToken;
    if (!token) {
      req.user = undefined;
      return next();
    }
    const verifyToken = jwt.verify(token, JWT_KEY);
    const user = {
      user_id: verifyToken._id,
      username: verifyToken.username,
      userEmail: verifyToken.userEmail,
    };
    if (verifyToken) {
      req.user = user;
      return next();
    }
  } catch (error) {
    res.status(401).json({message: "Please log in to access page!"});
  }
};
