var models = require("../models");

function authroutes(app) {
  app.get("/", function(req, res) {
    if (req.session.user) {
      models.message.findAll({}).then(function(foundMessage) {
        console.log("foundmessage", foundMessage);
        res.render("home", {
          userid: req.session.user.displayname,
          friendsMessages: foundMessage
        });
        // render home
      });
    } else {
      res.render("login"); // rename to login
    }
  });

  app.get("/login", function(req, res) {
   res.render("login");
  });

  app.post("/login", function(req, res) {
    var username = req.body.userName;
    var password = req.body.password;
    models.user
      .findOne({
        where: {
          name: username,
          password: password
        }
      })
      .then(function(foundUser) {
        req.session.user = foundUser;
        return res.redirect("/");
      })
      .catch(function(err) {
        return res.redirect("/login");
      });
  });
  
}

module.exports = authroutes;
