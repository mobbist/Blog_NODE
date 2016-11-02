$(function(){
	//登录功能
	$(".loginBox").on("click",function(){
		$.ajax({
			type:"post",
			url:"/api/users/login",
			data:{
				username : $(".username").val(),
				passwold : $(".passwold").val()
			},
			dataType:"json",
			success:function(result){
				console.log(result);
			}
		})
	})
})