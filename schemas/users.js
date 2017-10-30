

//定义数据的存储结构,相当于定义users表
//定义之前首先要加载mongoose
var mongoose = require("mongoose");

//用户表的结构
module.exports = new mongoose.Schema({
	//每个属性就是一个字段
	username: String,
	password: String
});

//不是直接来操作表结构的schema, 需要去定义一个model类, 在应用当中是操作模型对数据进行CURD
