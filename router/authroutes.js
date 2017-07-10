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
          userMessages = [];
          friendsArray = [];
          messageLength = foundMessages.length
          console.log(foundMessages.length)
          for (i = 0; i <messageLength; i++) {
            console.log(i)
            console.log("this is",foundMessages[i].authorid)
            if (foundMessages[i].authorid !== req.session.user.id){
              
              friendsArray.push(foundMessages[i]);}
              else{
              userMessages.push(foundMessages[i])};
        
            
                
          }
         
          res.render("home", {
            user: req.session.user.displayname,
            userid:req.session.user.id,
            friendsMessages: friendsArray,
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
