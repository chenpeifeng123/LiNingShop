<?php
    header("content-type:text/html;charset=utf-8");
    $db=mysqli_connect('localhost','root','','lining');
    mysqli_query($db,"SET NAMES utf8");
    $ids=$_REQUEST['ids'];
    $sql="SELECT details.*,shop.info,shop.src,shop.price FROM details,shop WHERE details.id=shop.id AND details.id=$ids";
    $result = mysqli_query($db,$sql);
    $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
    //查询数量
    $re=mysqli_query($db,"SELECT * FROM details WHERE id=1001");
    $dt=mysqli_fetch_all($re,MYSQLI_ASSOC);
    
    echo json_encode(array_merge($dt,$data),true);
    mysqli_close($db);
?>