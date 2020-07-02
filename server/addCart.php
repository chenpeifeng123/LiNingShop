<?php

header("content-type:text/html;charset=utf-8");
$db=mysqli_connect('localhost','root','','lining');
mysqli_query($db,"SET NAMES utf8");
$user=$_REQUEST['user'];
$rule=$_REQUEST['liIndex'];
$num=$_REQUEST['num'];
$gid=$_REQUEST['good_id'];
$res = mysqli_query($db,"SELECT * FROM carlist 
WHERE user='$user' AND good_id=$gid AND rule='$rule'");
$res=mysqli_fetch_all($res,MYSQLI_ASSOC);
if(!$res){
    $sql="INSERT into carlist (user,good_id,rule,num)values('$user',$gid,'$rule',$num)";
}else{
    $sql="UPDATE carlist SET num=num+$num 
    WHERE user='$user'AND rule='$rule' AND good_id=$gid";
}
mysqli_query($db,$sql);
mysqli_close($db);

?>
