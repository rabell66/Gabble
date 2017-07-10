var models = require("../models");



function messageroutes(app) {

  app.post("/like", function(req, res){
    var authorid = req.body.authorid;
    var messageid = req.body.messageid;
       models.like.findOne(
          {where:{
            authorid:authorid,
            messageid:messageid
          }}).then(function(alreadyLiked){
           
       if(alreadyLiked){
         return res.redirect("/")
          }
          var newLike = models.like.build(req.body);
   newLike.save().then(function(savedLike){
     return res.redirect("/");
      } )})
      .catch(function(err) {
        return res.redirect("/login");
      });
    
      
  
  });

  app.post("/delete", function(req, res){
    var authorid = req.body.authorid;
    var messageid = req.body.messageid;
    models.like
    .destroy({
      where:{
        messageid:messageid
      }
    })
    .then(()=>{
    models.message
      .destroy({
        where: {
          id:messageid
        }
      })
      .then(()=> {
        return res.redirect("/");
      })
    })
      .catch(function(err) {
        console.log("This is the", err)
        return res.redirect("/login");
      });
  
  
    
  })

app.get("/message", function(req, res){
   if (req.session.user) {
    res.render("home")
    }
   else {return res.redirect("/login")}
})
app.post("/message", function(req, res){
  
    var newMessage = models.message.build({
      body:req.body.message,
      authorid:req.session.user.id
     
})
    newMessage
      .save()
      .then(function(newMessage) {
        res.redirect("/");
      })
   

      
})};

module.exports = messageroutes