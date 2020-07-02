<?php
    header("content-type:text/html;charset=utf-8");
    $db=mysqli_connect('localhost','root','','lining');
    mysqli_query($db,"SET NAMES utf8");
   
    $info=$_REQUEST['name'];
    $pageNum=$_REQUEST['pageNum'];
    $s=$pageNum*25;
    $e=($pageNum+1)*25;
    $sql = "SELECT * FROM shop LIMIT $s,$e";
    if($info!=="") $sql="SELECT * FROM `shop` ORDER BY  $info ASC LIMIT $s,$e";
    $result = mysqli_query($db,$sql);
    $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($data,true);
    mysqli_close($db);
?>