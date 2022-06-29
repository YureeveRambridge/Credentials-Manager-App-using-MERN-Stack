const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");

/* .env package to access process.env.{secret-variable}*/
require("dotenv/config");

const app = express();

/* Mongoose import */
const mongoose = require("mongoose");


/*link to routers*/
const indexRouter = require("./routes/routers");

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API Running");
  });
}

/* Connection to MongoDB, this is a pending connection from localhost and we still need to add a piece of code
 * that will let us know when we are connected*/
mongoose.connect(

  /* passes down the connection string provided by mongodb*/
  process.env.CONNECT_MONGO_DB,

  /*additional options according to https://mongoosejs.com/docs/index.html*/
  { useNewUrlParser: true, useUnifiedTopology: true },

  /*callback function if error occurs during initial connection*/
  (error) => {
    console.log(`Initial Connection errors: ${error}`);
  }
);

/* Notification of a successful/unsuccessful connect to DB */
mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);
mongoose.connection.once("open", function () {
  console.log(`Connected Successful`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
