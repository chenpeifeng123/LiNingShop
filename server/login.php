<?php
// header("content-type:text/html;charset=utf-8");
error_reporting(0);
require('dbCA.php');
$db=new mysql('localhost','root','','lining');
$user=$_REQUEST['user'];
$pwd=$_REQUEST['pwd'];
$w=stripos($_SERVER['QUERY_STRING'],"signIn");

$judegUser=$db->select("*","users","WHERE `username`='$user'")[0];
$judegPwd=$db->select("*","users","WHERE `password`='$pwd'")[0];

if($w!==5){
    $email=$_GET['email'];
    if($judegUser['username']==$user){
        $error=array('status' => 'error','msg' => '注册失败,该账号已经存在');
        echo json_encode($error);
    }else{
       $db->insert("`users`","`username`,`password`,`emails`","'{$user}','{$pwd}','{$email}'");
       $success=array('status' => 'success', 'msg' => '注册成功');
        echo json_encode($success);
    }
}else{
    if($judegUser['username']==$user && $judegPwd['password']==$pwd){
        $s=array('status' => 'success', 'msg' => '恭喜您，登录成功！');
        echo json_encode($s);
    }elseif($judegUser["username"]!=$user){
        $e=array('status' => 'error', 'msg' => '登录失败，用户名不存在！');
        echo json_encode($e);
    }else{
        $es=array('status' => 'error', 'msg' => '登录失败，密码不正确！');
        echo json_encode($es);
    }
}

/* 
    注册成功：{"status":"success",msg:"注册成功"}
    注册失败：{"status":"error",msg:"注册失败，该账户已经存在"}
    登录成功：{"status":"success",msg:"恭喜您，登录成功！"}
    登录失败：{"status":"error",msg:"登录失败，用户名不存在！"}
    登录失败：{"status":"error",msg:"登录失败，密码不正确！"}   

*/

?>