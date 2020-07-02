<?php
   
    $db=mysqli_connect('localhost','root','','lining');
    mysqli_query($db,"SET NAMES utf8");
    $size=25;
    $sql="SELECT * FROM `shop`";
    $result = mysqli_query($db,$sql);
    // $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
    $count=mysqli_num_rows($result);
    echo ceil($count/$size);
    mysqli_close($db);
?>