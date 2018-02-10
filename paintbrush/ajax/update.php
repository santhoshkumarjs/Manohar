<?php require '../framework/initialise/framework.init.php'; 
//print_r($request); exit;


if($request['submit'] == 'register'){
	$email = $request['email'];
	$name = $request['name'];
	$password = $request['password'];
	$sql = "insert into users(name, password, emailid) values('".$name."', '".$password."', '".$email."')";
	$db['master']->query($sql);
    $_SESSION['user_id'] = $db['master']->getLastID();
	$_SESSION['username'] = $name;	
	//echo $_SERVER['REQUEST_URI']; exit;
	header("Location: ../account.php");
}
if($request['submit'] == 'login'){
	$email = $request['email'];	
	$password = $request['password'];
	$sql = "select * from users where emailid = '".$email."' and password = '".$password."'";
	$loginResult = $db['master']->getOneRow($sql);
	
	$_SESSION['user_id'] = $loginResult['id'];
	$_SESSION['username'] = $loginResult['name'];
	
	if($loginResult){
		echo "success";
	  //header("Location: account.php");	
	}else{
		echo "fail";
	}
}

if($request['submitval'] == "profile"){
	$name = trim($request['username']);
	$email = trim($request['useremail']);
	$userid = $_SESSION['user_id'];
	$sql = "update users set name = '".$name."', emailid = '".$email."' where id = $userid";
	$qry = $db['master']->query($sql);
	$_SESSION['username'] = $name;
	header("Location: ../account.php");
}

?>