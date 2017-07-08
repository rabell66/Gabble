var models = require("../models");

function authroutes(app) {
  app.get("/", function(req, res) {
    if (req.session.user) {
      models.message
        .findAll({
          order: [["createdAt", "DESC"]],

          include: [
            {
              model: models.user,
              as: "author"
            },
            {
              model: models.like,
              as: "likes",
              include: {
                model: models.user,
                as: "author"
              }
            }
          ]
        })
        .then(function(foundMessages) {
          let userMessages = [];
          
          for (i = 0; i < foundMessages.length; i++) {
            
            if ((foundMessages[i].authorid == req.session.user.id)) {
              userMessages.push(foundMessages[i]);
              foundMessages.splice(i, 1);
            }
          }

          res.render("home", {
            userid: req.session.user.displayname,
            friendsMessages: foundMessages,
            userMessage: userMessages
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
