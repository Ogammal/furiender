require("dotenv").config();
var express = require("express");
const session = require('express-session');

var exphbs = require("express-handlebars");
var passport = require("passport")

var db = require("./models");


var app = express();
var PORT = process.env.PORT || 3000;

// Middleware and app configuration
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use(
  session({
    secret: "rHUyjs6RmVOD06OdOTsVAyUUCxVXaWci",
    resave: true,
    saveUninitialized: true
  })
); // session secret
app.use(passport.initialize());
app.use(passport.session());



// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/auth.js")(app, passport);
require("./config/passport/passport.js");
var syncOptions = { force: false };

// Load passport strategies
require("./config/passport/passport.js")(passport, db.User);

if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;