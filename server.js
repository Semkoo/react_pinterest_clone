/**
 * This is an attempt of me creating a pintress clone
 */

const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const config = require("./config/config");

//Middleware Protection
const passport = require("passport");
// Passport Config
require("./services/passport")(passport);

//Routes
const router = require("./routes/routes");
//Create the app on express
const app = express();

//DB Config
// const db_key = require('./config/config').mongoURI;
//Connect to MongoDB
mongoose
  .connect(
    config.mongoURI, {
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log("Mongo DB Connected!");
  })
  .catch(err => {
    console.error(err);
  });

//Body parser middleware. This middle allows to do req.body
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
//Parse in json format
app.use(bodyParser.json());

//Log the api requests temporary
app.use(morgan("dev"));

//Protecting our routes, we initialize the passport middleware
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
// app.use(passport.initialize());
// app.use(passport.session());

// CORS Support
// app.use(CORS);
// //Basic route test
// app.get("/", (req, res, next) => {
//   var html =
//     "<ul>\
//                 <li><a href='/api/user/auth/github'>GitHub</a></li>\
//                 <li><a href='/api/user/logout'>logout</a></li>\
//               </ul>";
//   res.send(html);
// });
// app.get("/logout", function(req, res) {
//   console.log("logging out");
//   req.logout();
//   res.redirect("/");
// });
//Use API Routes
app.use("/api", router);

let port = process.env.PORT || 5000;

//If C9 ide
if (port == 8080) {
  //Set the port to 8081
  port = 8081;
}

const host = process.env.HOST || process.env.IP || "localhost";
app.listen(port, () => console.log(`Server running at http://${host}:${port}`));
