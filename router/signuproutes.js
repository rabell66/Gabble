var models = require("../models");
 var errorMessage;
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
    if (!allLetter(newUser)||newUser == "") {
     errorMessage= "Please re-enter Name";
      return res.render("signup", {errorMessage:errorMessage})
    }

    var newPassword = req.body.password;
    var verification = req.body.passwordVerification;
    if (newPassword !== verification || newPassword == "") {
      errorMessage = "Please re-enter Password";     
      return res.render("signup", {errorMessage:errorMessage});
    }
    var newDisplayName = req.body.userName;
    models.user.findOne({
      displayname:newDisplayName
    })
    .then(function(foundDisplayName){
       if(!foundDisplayName || newDisplayName == ""){
         errorMessage = "That display name already exists"
         return res.render("signup", {errorMessage:errorMessage})
       } 
    var newRecord = models.user.build({
      name: newUser,
      password: newPassword,
      displayname: newDisplayName
    })
    newRecord
      .save()
      .then(function(newRecord) {
        res.redirect("/login");
      })
      .catch(function(err) {
        res.redirect("/");
         });
      });
  });
}
module.exports = signuproutes;
