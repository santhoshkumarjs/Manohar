<?php 
	session_start();
	unset($_SESSION['isloggedin']);
	unset($_SESSION['username']);
	unset($_SESSION['emailid']);
	unset($_SESSION['time_loggedin']);
	unset($_SESSION['last_loggedin']);
	unset($_SESSION['iduser']); 
	session_destroy();
	if(isset($request['sessionexpired']))
	{
		header("location:login.php?sessionexpired=1");
	}
	else
	{
	  header("location:login.php");
	}
?>