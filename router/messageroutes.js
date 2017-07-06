var models = require("../models");



function messageroutes(app) {

app.get("/message", function(req, res){
    res.render("home")
})
app.post("/message", function(req, res){
    console.log("message", req.body.message)

    var newMessage = models.message.build({
      body:req.body.message,
      authorid:req.session.user.id
     
})
    newMessage
      .save()
      .then(function(newMessage) {
        return res.redirect("/message");
      })
})};

module.exports = messageroutes