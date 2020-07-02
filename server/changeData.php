<?php
    header("content-type:text/html;charset=utf-8");
    $db=mysqli_connect('localhost','root','','lining');
    mysqli_query($db,"SET NAMES utf8");
    $del=$_REQUEST['del'];
    mysqli_close($db);
?>