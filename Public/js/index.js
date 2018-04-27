function qualify() {

    if ($('#login_name').val() == '') {
        showErrorMsg('login_name', '账号不能为空！');
        return false;
    }
    if ($('#password').val() == '') {
        showErrorMsg('login_pwd', '密码不能为空！');
        return false;
    }

    $('#form1').submit();
}


function showErrorMsg(id, msg) {
    $('#error_msg').html(msg);
    $(id).focus();
}