var models = require("../models");



function messageroutes(app) {

  app.post("/like", function(req, res){
  
  var newLike = models.like.build(req.body);
   newLike.save().then(function(savedLike){
     res.redirect("/");
    
   })
    
  })

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
        return res.redirect("/");
      })


      
})};

module.exports = messageroutes