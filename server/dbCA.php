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
	
		//查询语句
		function select($value,$table,$where){
			$res=mysqli_query($this->conn,"select {$value} from {$table} {$where};");
			// if (!$res) {
			// 	printf("Error: %s\n", mysqli_error($this->conn));
			// 	exit();
			//    }
			// $res=mysqli_fetch_array($res,MYSQLI_ASSOC);
			$res=mysqli_fetch_all($res,MYSQLI_ASSOC);
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