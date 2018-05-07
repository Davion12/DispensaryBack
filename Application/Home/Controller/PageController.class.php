<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/3
 * Time: 16:58
 */

namespace Home\Controller;


use Think\Controller;

class PageController extends Controller
{
    /**
     * 获取药房信息接口
     */
    public function getDispensaryInfo(){
        $getRoomsUrl = C("HOST_URL") . C("HOST_PORT") . '/dispensary/rooms';
        $result = send_get($getRoomsUrl, array());
        $result_arr = json_decode($result, true);
        if ($result_arr['code'] == 0) {
            $this->ajaxReturn($result_arr);
        } else {
            $this->ajaxReturn(array('code' => -1, 'msg' => '获取药房信息失败'));
        }
    }

    /**
     * 获取窗口信息接口
     */
    public function getWindowInfo(){
        $getRoomsUrl = C("HOST_URL") . C("HOST_PORT") . '/dispensary/windows';
        $result = send_get($getRoomsUrl, array());
        $result_arr = json_decode($result, true);
        if ($result_arr['code'] == 0) {
            $this->ajaxReturn($result_arr);
        } else {
            $this->ajaxReturn(array('code' => -1, 'msg' => '获取窗口信息失败'));
        }
    }

    public function getAccountInfo(){
        $getRoomsUrl = C("HOST_URL") . C("HOST_PORT") . '/dispensary/accounts';
        $result = send_get($getRoomsUrl, array());
        $result_arr = json_decode($result, true);
        if ($result_arr['code'] == 0) {
            $this->ajaxReturn($result_arr);
        } else {
            $this->ajaxReturn(array('code' => -1, 'msg' => '获取账号信息失败'));
        }
    }
}