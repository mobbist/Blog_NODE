var express = require("express");
//创建一个router对象
var router = express.Router();

router.post("/users/login",function(req,res,next){
	console.log(200);
	res.send("登录成功");
})

module.exports = router;