function qualify() {

    if ($('#login_name').val() == '') {
        showErrorMsg('login_name', '账号不能为空！');
        return false;
    }
    if ($('#password').val() == '') {
        showErrorMsg('login_pwd', '密码不能为空！');
        return false;
    }
    var params = {
        'login_name': $('#login_name').val(),
        'password':$('#password').val()
    };
    $.ajax({
        url: "index.php/Home/Index/login",
        type: 'post',
        dataType: 'json',
        data: params,
        success: function(jsonData){
            if(jsonData["code"] === 0){
                $('#form1').submit();
            } else {
                $('#error_msg').html(jsonData["msg"]);
            }
        },
        error: function(){
            $('#error_msg').html("请求出错！");
        }
    });
}


function showErrorMsg(id, msg) {
    $('#error_msg').html(msg);
    $(id).focus();
}