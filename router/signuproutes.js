
var models = require("../models");

function allLetter(inputtxt) {
  var letters = /^[A-Za-z]+$/;
  if (inputtxt.match(letters)) {
    return true;
  } else {
    return false;
  }
}

function signuproutes(app) {
  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  app.post("/signup", function(req, res) {
    var newUser = req.body.name;
    if (!allLetter(newUser)) {
      return res.redirect("/");
    }

    var newPassword = req.body.password;
    var newDisplayName = req.body.userName;
    var newRecord = models.user.build({
      name: newUser,
      password: newPassword,
      displayname: newDisplayName
    });
    newRecord
      .save()
      .then(function(newRecord) {
        res.redirect("/login");
      })
      .catch(function(err) {
        document.getElementById("error").innerHTML = err.message;
        res.redirect("/");
      });
  });
}
module.exports = signuproutes;
