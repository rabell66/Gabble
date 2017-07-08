 var models = require("../models");

function exitroutes(app){


app.get("/logout", function(req, res){
req.session.destroy();
res.redirect("/login")

}
)



}




 module.exports = exitroutes;