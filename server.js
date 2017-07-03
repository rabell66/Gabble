const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const session = require("express-session");
const sessionConfig = require("./sessionConfig")
const app = express();
const port = process.env.PORT || 8000;


//Set View Engine
app.engine("mustache", mustacheExpress());
app.set("views", "./public");
app.set("view engine", "mustache");

//Middleware
app.use("/", express.static("./public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(session(sessionConfig));
















   app.listen(port, function() {
    console.log("Server is running on port", port);
})
