//不是直接来操作表结构的schema, 需要去定义一个model类, 在应用当中是操作模型对数据进行CURD

var mongoose = require("mongoose");  
//把定义的schema加载进来
var usersSchema = require("../schemas/users.js");

//model方法创建一个模型类,定义模型的名字,和响应的schema, 最后再返回出去
module.exports = mongoose.model("User",usersSchema);