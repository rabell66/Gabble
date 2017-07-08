const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const session = require("express-session");
const authRoutes = require('./router/authroutes')
const signupRoutes = require('./router/signuproutes')
const messageRoutes = require('./router/messageroutes')
const exitRoutes = require('./router/exitroutes')
const sessionConfig = require("./sessionConfig");
const models = require("./models");
const app = express();
const port = process.env.PORT || 7000;


//Set View Engine
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");
app.use(session(sessionConfig));

//Middleware
app.use("/", express.static("./public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(session())
authRoutes(app)
// app.use('/signup',signupRoute)
signupRoutes(app);
messageRoutes(app);
exitRoutes(app)


// ============================================================
   app.listen(port, function() {
    console.log("Server is running on port", port);
})
