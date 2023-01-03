const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes");
const app = express();
const { auth_user_session } = require("./middleware/auth");

require("dotenv").config({ path: path.join(__dirname, "./.env") });

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", express.json());
app.use("/public", express.static(path.join(__dirname, "/public")));
app.use("/user", routes.UserRouter);
app.use("/artist", routes.ArtistRouter);
app.use("/albums", routes.AlbumRouter);
app.use(morgan("dev"));
// app.set("views", path.join(__dirname, "/views"));
// app.set("view engine", "ejs");


app.all("*", (req, res) => {
  res.status(404).send('404 Error: The page is not found!');
});

module.exports = app;
