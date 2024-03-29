module.exports = function(app, passport){

var index = require('../routes/index');
var info = require("../routes/info");
var users = require("../controllers/users.js");
// Add routes here
app.get('/', index.view);
app.get("/info", info.viewInfo);

app.get("/signup", function(req,res){
	res.render("signup");
});
app.post("/signup", users.create);

app.post('/login', users.session
);

app.post("/logout", users.logout)

}