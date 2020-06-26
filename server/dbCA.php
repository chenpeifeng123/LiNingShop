<?php 
	class mysql{
		private $host;
		private $root;
		private $pwd;
		private $databases;
		private $conn;
		//初始化类
		function __construct($host,$root,$pwd,$databases){
			$this->host = $host;
			$this->root = $root;
			$this->pwd = $pwd;
			$this->databases = $databases;
			$this->connect();
		}
		//连接数据库
		function connect(){
			$this->conn = mysqli_connect($this->host,$this->root,$this->pwd,$this->databases);
			mysqli_query($this->conn,"SET NAMES utf8");
			if(mysqli_connect_errno()) return;
		}
		// 将查询到的数据转换成数组
		/* function arr_ay($result){
			//mysqli_fetch_array(result,resulttype);MYSQLI_ASSOC  关联型数组 MYSQLI_NUM   数字型数组 MYSQLI_BOTH 二者都有（默认）
 			return mysqli_fetch_array($result,MYSQLI_ASSOC);
		} */
		//查询语句
		function select($value,$table,$where){
			$res = mysqli_query($this->conn,"select {$value} from {$table} {$where}");
			$res=mysqli_fetch_array($res,MYSQLI_ASSOC);
			return $res;
        }
        // 增加
		function insert($table,$ziduan,$zhi){
			$res =  mysqli_query($this->conn,"insert into {$table} ({$ziduan}) values({$zhi})");
			return $res;
		}
		//删除数据语句
		function del($title,$where){
			$res = mysqli_query($this->conn,"delete from {$title} {$where}");
			
			return $res;
		}
		//修改语句
		function update($table,$ziduan,$zhi){
			$res = mysqli_query($this->conn,"update {$table} set {$ziduan} where {$zhi}");
			return $res;
		}
		// 关闭数据库
		function dbcolse(){
			mysqli_close($this->conn);
		}
	}
?>