$(function(){
$('.xsmm-img').mousedown(function(){
    var val=$('.password').attr('value');
    if(val==''){
        $('.showword').attr({'value':val});
    }
    else{
        $('.password').hide();
        $('.showword').attr({'value':val}).show();
    }
})
$('.xsmm-img').mouseup(function(){
    var val=$('.showword').attr('value');
    $('.showword').hide();
    $('.password').attr({'value':val}).show();
})
$('.login-form').submit(function(){
    var username=$('.username').val();
    var password=$('.password').val();
    if(username!='admin' || password!=123456){
        if(username=='' || password== ''){
            alert('用户名和密码不能为空！');
            return false;
        }
        alert('用户名或密码错误！');
        return false;
    }
})
})
