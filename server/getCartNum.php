<?php
    $db=mysqli_connect('localhost','root','','lining');
    mysqli_query($db,"SET NAMES utf8");
    $user=$_REQUEST['user'];
    $sql = "SELECT * FROM carlist  WHERE user='$user'";
    $result=mysqli_query($db,$sql);
    $count=mysqli_num_rows($result);
    echo $count;
    mysqli_close($db);
?>