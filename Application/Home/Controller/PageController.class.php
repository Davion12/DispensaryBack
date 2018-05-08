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
       $dispensaryTable = M("dispensary_room");
       $result = $dispensaryTable->select();
        $this->ajaxReturn($result);
    }

    /**
     * 获取窗口信息接口
     */
    public function getWindowInfo(){
        $dispensaryTable = M("dispensary_window");
        $result = $dispensaryTable->select();
        $this->ajaxReturn($result);
    }

    public function getAccountInfo(){
        $dispensaryTable = M("dispensary_account");
        $result = $dispensaryTable->select();
        $this->ajaxReturn($result);
    }

    public function deleteDispensaryInfo(){
        $params = I('param.');
        $dispensaryTable = M("dispensary_room");
        $result = $dispensaryTable->where($params)->delete();
        $this->ajaxReturn($result);
}
    public function deleteWindowInfo(){
        $params = I('param.');
        $dispensaryTable = M("dispensary_window");
        $result = $dispensaryTable->where($params)->delete();
        $this->ajaxReturn($result);
    }
    public function deleteAccountInfo(){
        $params = I('param.');
        $dispensaryTable = M("dispensary_account");
        $result = $dispensaryTable->where($params)->delete();
        $this->ajaxReturn($result);
    }

    public function modifyDispensaryInfo(){
        $params = I('param.');
        $dispensaryTable = M("dispensary_room");
        $find = $dispensaryTable->where(array("room_id" => $params["room_id"]))->select();
        if(count($find) == 0){
            $result = $dispensaryTable->add($params);
        } else {
            $result = $dispensaryTable->save($params);
        }
        $this->ajaxReturn($result);
    }

    public function modifyWindowInfo(){
        $params = I('param.');
        $dispensaryTable = M("dispensary_window");
        $find = $dispensaryTable->where(array("window_id" => $params["window_id"]))->select();
        if(count($find) == 0){
            $result = $dispensaryTable->add($params);
        } else {
            $result = $dispensaryTable->save($params);
        }
        $this->ajaxReturn($result);
    }
    public function modifyAccountInfo(){
        $params = I('param.');
        $params['window_id'] = 1;
        $params['auth_token'] = "cec37e0974";
        $dispensaryTable = M("dispensary_account");
        $find = $dispensaryTable->where(array("account_id" => $params["account_id"]))->select();
        if(count($find) == 0){
            $result = $dispensaryTable->add($params);
        } else {
            $result = $dispensaryTable->save($params);
        }
        $this->ajaxReturn($result);
    }

}