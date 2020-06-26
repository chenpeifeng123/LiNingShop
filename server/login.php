<?php
// header("content-type:text/html;charset=utf-8");
require('dbCA.php');

$db=new mysql('localhost','root','','mysql');
$tel=$_GET['user'];
$pwd=$_GET['pwd'];

$w=stripos($_SERVER['QUERY_STRING'],"signIn");


$judegTel=$db->select("*","users","WHERE `username`=$tel");
$judegPwd=$db->select("*","users","WHERE `password`=$pwd");
if($w!==5){
    // 注册
    if($judegTel["username"]==$tel){
        $error=array('status' => 'error', 'msg' => '注册失败,该账号已经存在');
        echo json_encode($error);
    }else{
       $db->insert("`users`","`username`,`password`","$tel,$pwd");
       $success=array('status' => 'success', 'msg' => '注册成功');
        echo json_encode($success);
    }
}else{
    // 登录
    if($judegTel["username"]==$tel && $judegPwd['password']==$pwd){
        $s=array('status' => 'success', 'msg' => '恭喜您，登录成功！');
        echo json_encode($s);
    }elseif($judegTel["username"]!=$tel){
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
// $select=$db->select($sql,"SELECT * FROM `users` WHERE `username`=$tel");
// echo $select->num_rows;

// $res=$db->insert("`users`","`username`,`password`","'111','asdasd'");
// echo $res;
// $db->del("`user`","where pid = '9'");
// $db->update("`user`","age=99","pid='2'");
// $arr=$db->select('*','user','where pid="10"');
// print_r($arr);
?>