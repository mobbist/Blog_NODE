$(function(){
	//登录功能
	$(".loginBox").on("click",function(){
		$.ajax({
			type:"post",
			url:"/api/users/login",
			data:{
				username : $(".username").val(),
				password : $(".password").val()
			},
			dataType:"json",
			success:function(result){
				console.log(result);
			}
		})
	})

	$(".registerBox").on("click",function(){
		$.ajax({
			type:"post",
			url:"/api/users/register",
			data:{
				username : $(".username").val(),
				password : $(".password").val(),
				rePassword: $(".rePassword").val()
			},
			dataType:"json",
			success:function(result){
				console.log(result);
			}
		})
	})
})
