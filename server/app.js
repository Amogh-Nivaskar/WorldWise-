if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const ExpressError = require("./utils/ExpressError");
const citiesRoutes = require("./Routes/cities");
const User = require("./models/User");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/WorldWiseDB")
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride("_method"));

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const PORT = process.env.PORT || 5000;

const sessionConfig = {
  secret: "thisshouldbeabettersecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // expires in a week
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/cities", citiesRoutes);

// app.get("/", (req, res) => {
//   console.log("got req");
//   res.send({ hello: "world" });
// });

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  err.message = err.message || "Something Went Wrong !!!";
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}.`);
});
