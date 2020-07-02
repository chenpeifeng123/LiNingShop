<?php

    header("content-type:text/html;charset=utf-8");
    $db=mysqli_connect('localhost','root','','lining');
    mysqli_query($db,"SET NAMES utf8");
    mysqli_set_charset($db,'utf8');
    $user=$_REQUEST['user'];
    $num=$_REQUEST['num'];
    $rule=$_REQUEST['rule'];
    $gid=$_REQUEST['good_id'];
    $info=$_REQUEST['info'];
    // 根据用户名 规格 商品id 整合 商品数量
    // $sel=mysqli_query($db,"SELECT user,rule,good_id,SUM(carlist.num) AS nums FROM carlist

    // 更新查询到的一条数据
   if($info==='auto'){
    $change="UPDATE carlist SET num=$num
    WHERE user='$user' AND rule='$rule' AND good_id=$gid";
    
   }else if($info==='del'){
    $change="DELETE FROM carlist
    WHERE user='$user' AND rule='$rule' AND good_id=$gid";
   }
   else if($info==='delAll'){
    $change="DELETE FROM carlist WHERE user='$user'";
   }
   mysqli_query($db,$change);
    $sel=mysqli_query($db,"SELECT user,shop.*,rule,good_id,num  
    FROM carlist,shop 
    WHERE shop.id=good_id AND user='$user' 
    ORDER BY good_id ASC");
    $sel=mysqli_fetch_all($sel,MYSQLI_ASSOC);
    // 解决乱码
    echo json_encode($sel,JSON_UNESCAPED_UNICODE);
    mysqli_close($db);
?>
