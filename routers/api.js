var express = require("express");
//创建一个router对象
var router = express.Router();
//引入模型类, 用来操作数据库
var User = require("../models/Users");


//定义一个全局的返回data,根据具体的业务逻辑, 可以对这个对象进行调整
var responseData;

//中间件,当只要有请求到这个API,就初始化这个对象
router.use(function(req,res,next){
	responseData = {
		code:0,
		message:""
	}
	next();
})



router.post("/users/register",function(req,res,next){

	//通过在bodyparser中设置, 在这里通过前端post提交过来, req下已经有body属性
	//简单注册验证
	// 1.用户名密码不能为空
	// 2.两次密码输入必须一致
	var username = req.body.username;
	var password = req.body.password;
	var rePassword = req.body.rePassword;
	if(username == "" || password==""){
		responseData.code = 1;
		responseData.message = "用户名或密码不能为空"
		res.json(responseData);
		return
	}
	if(password != rePassword){
		responseData.code = 1;
		responseData.message = "两次输入密码不一致"
		res.json(responseData);
		return
	}

	// 3.用户是否已经被注册(数据库查询),
	//如果数据库中已经存在和我们要注册的用户名同名的数据, 表示该用户已经被注册了,
	//需要引入在之前定义好的模型类, 通过模型类去操作数据库

	//详情参考mongoose的文档,   find, findone  查找,  查找一条, 类方法,   save  对象方法需要实例化
	//首先要从数据库中查找是否有同名的用户名,找到一条就够, 所以使用findOne,返回是的一个promise对象,可以使用then
	User.findOne({
		username:username 	//查询条件就是usernname 是否是传进来的username
	}).then(function(userInfo){
		//如果有数据, 表示已经被注册
		if(userInfo){
			responseData.code = 1;
			responseData.message = "用户已经被注册了"
			res.json(responseData);
			return
		};
		//保存用户注册的信息到数据库中
		//保存用户数据不要去操作数据库, 而是操作User的构造函数, 通过这个函数new出来的对象来保存,
		//给这个对象加上username属性, password属性, 再调用他的私有方法保存.一个对象代表一条记录
		var user = new User({
			username:username,
			password:password
		});
		//将save()方法的返回, 也是一个promise对象可以再继续then
	    user.save().then(function(newUserInfo){  //新添加的信息, 当save()成功会走这里
			console.log(55);
			responseData.code = 0;
			responseData.message = "保存成功"
			res.json(responseData);
			return
		});;
	})
	//res.send({name:"注册API"});
})

router.post("/users/login",function(req,res,next){
	console.log(req.body);
	//通过在bodyparser中设置, 在这里通过前端post提交过来, req下已经有body属性
	//这里进行登录验证


	res.send({name:"登录成功"});
})


module.exports = router;
