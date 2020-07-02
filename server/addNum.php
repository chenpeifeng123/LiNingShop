<?php
    $ids=$_REQUEST['ids'];
    $num=$_REQUEST['num'];
    $db=mysqli_connect('localhost','root','','lining');
    mysqli_query($db,"SET NAMES utf8");
    $sql = "UPDATE details SET num=$num WHERE id=$ids";
    mysqli_query($db,$sql);
    mysqli_close($db);
?>