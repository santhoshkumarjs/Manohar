<?php 
include_once ('../framework/initialise/framework.init.php');
	session_start();
	$email = $_SESSION['emailid'];	
	unset($_SESSION['iduser']);
	unset($_SESSION['username']);
	unset($_SESSION['email']);
	unset($_SESSION['utype']);
	session_destroy();
	if(isset($request['sessionexpired']))
	{
	    console ( LOG_LEVEL_INFO, ' UserAction - '.$email.' session expired.');
		header("location:signin.php?sessionexpired=1");
	}
	else
	{
	  console ( LOG_LEVEL_INFO, ' UserAction - '.$email.' logout the application.');
	  header("location:signin.php");
	}
?>