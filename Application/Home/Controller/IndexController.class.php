<?php

namespace Home\Controller;

use Think\Controller;


class IndexController extends Controller
{
    public function index()
    {
        $this->display("index");
    }


    public function login()
    {
        $loginName = I("post.login_name");
        $password = I("post.password");
        //两次md5加密
        $password = md5(md5($password));
        $loginUrl = C("HOST_URL") . C("HOST_PORT") . '/dispensary/login';

        $params = array(
            "accountName" => $loginName,
            "pwd" => $password,
            "windowId" => 1
        );

        $result = send_get($loginUrl, $params);

        $result_arr = json_decode($result, true);
        if ($result_arr['code'] == 0) {
            $this->ajaxReturn(array('code' => 0, 'msg' => '登录成功'));
        } else {
            $this->ajaxReturn(array('code' => -1, 'msg' => '账号密码错误'));
        }

    }

    public function loadMainPage(){
        $this->display("Main/main");
    }

    public function changeMainPage(){
        $this->display("Main/mainPage");
    }

    public function changeDispensaryPage(){
        $this->display("Main/dispensaryPage");
    }

    public function changeWindowPage(){
        $this->display("Main/windowPage");
    }
    public function changeAccountPage(){
        $this->display("Main/accountPage");
    }

    public function modifyDispensaryInfo(){
        $this->display("");
    }

}