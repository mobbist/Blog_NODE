var express = require("express");
//创建一个router对象
var router = express.Router();

router.get("/login",function(req,res,next){
	res.render("login.html");
})

module.exports = router;