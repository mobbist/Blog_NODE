// 应用程序入口文件

//加载express模块
var express  = require("express");

//创建app应用,相当于 nodeJS的 Http.creatServer()服务端对象
var app  =  express();


//由于客户端返回的都是复杂的页面, 所以string无法满足我们的需求, 需要后端的逻辑和页面的表现分离, 前后端分离,这时候就需要用到模板
//加载模板处理模块
var swig = require("swig");

//配置应用模板
//定义当前因公所使用的模板引擎
//第一个参数: 模板引擎的名称, 同时也是模板文件的后缀, 也可以是.tpl
//第二个参数: 表示用户解析处理模板内容的方法
app.engine("html",swig.renderFile);


//设置模板文件存放的目录,第一个参数必须是views, 第二个参数是目录
app.set("views","./views");

//注册所使用的模板引擎, 第一个参数必须是view engine, 第二个参数和app.engine所定义的模板引擎的名称(第一个参数)是一致的
app.set("view engine","html");
//之后在返回的时候, 使用 res对象中的render方法,第一个参数表示模板的文件, 相对于views目录,第二个参数:传递给模板使用的数据
//res.render("index.html");

//在开发过程中, 需要取消模板缓存,每次改变模板不需要再去重启服务
swig.setDefaults({cache:false});


//在实际开发中, 页面中会有许多的css js img等静态文件需要请求, 这些也都是路由,需要去监听.但是这样写的话则太啰嗦, 
//由于静态文件只要原本的返回给前端就可以, 不需要做什么额外的操作, 所以可以采用设置静态文件托管
//当用户请求的路径中以public开始的, 则调用后面的形式处理, 后面就是一个函数,指定到这个目录下
app.use("/public",express.static(__dirname+'/public'))



//虽然解决了静态文件的处理, 但是应用中还会存在许多的动态请求, 如果全放在这一个文件中必定杂乱无章, 所以需要分模块加载
//这时候就需要用到路由(router)模块
app.use("/admin",require("./routers/admin"));
app.use("/api",require("./routers/api"));
app.use("/users",require("./routers/users"));

//路由绑定
//通过app.get()或app.post()等方法可以把一个url路径和一个或N个函数进行绑定
app.get("/",function(req,res,next){
    //req: request对象, 保存客户端请求相关的一些数据, 同 http:request
    //res: response对象, 服务端输出对象, 提供了一些服务器端输出的相关的一些方法,  同http.reponse
    //next:  方法, 用于执行下一个路径匹配的函数

    //通过res.send(string)发送内容至客户端
    //res.send("hello world");
	res.render("index.html");
})


//加载数据库模块
var mongoose = require("mongoose");


//对数据库进行连接, 连接之前要确保数据库的开启
//开启mongodb  需要https://www.mongodb.com 先下载应用, 然后在目录包里找到  bin目录下的mongod 为mongdb服务端,
//在mac下命令:  ./mongod --dbpath  /Users/biaozhu/Documents/Blog_node/db (指定的数据库存放的地址_,  --port 27017(端口)
//连接数据库
mongoose.connect("mongodb://127.0.0.1:27017",function(err){
	if(err){
		console.log("数据库连接失败");
	}else{
		console.log("数据库连接成功");
		app.listen(8081);
		//连接成功以后监听端口
		
	};
});

