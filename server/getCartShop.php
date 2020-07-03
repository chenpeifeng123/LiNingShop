<?php
    $db=mysqli_connect('localhost','root','','lining');
    mysqli_query($db,"SET NAMES utf8");
    $user=$_REQUEST['user'];
    $sql = "SELECT user,shop.*,rule,good_id,num  
    FROM carlist,shop 
    WHERE shop.id=good_id AND user='$user' 
    ORDER BY good_id ASC";
    $result=mysqli_query($db,$sql);
    $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($data,true);
    mysqli_close($db);
?>