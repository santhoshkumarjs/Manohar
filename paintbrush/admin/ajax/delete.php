<?php 
	session_start();
	include_once ('../../framework/initialise/framework.init.php');
	//print_r($request); exit;
	//print_r($request); exit;
	
	if($request['submit'] == 'category'){
		$id = $request['deleteval'];
		$sql = "update category set status = 'inactive' where id = $id";
		$qry = $db['master']->query($sql);
		header("Location:../dashboard.php");
	}
	if($request['submit'] == 'product'){
		$id = $request['deleteval'];
		$sql = "update product set status = 'inactive' where id = $id";
		$qry = $db['master']->query($sql);
		header("Location:../product.php");
	}	
	if($request['submit'] == 'artist'){
		$id = $request['deleteval'];
		$sql = "update artist set status = 'inactive' where id = $id";
		$qry = $db['master']->query($sql);
		header("Location:../artist.php");
	}	
	if($request['submit'] == 'user'){
		$id = $request['deleteval'];
		$sql = "update artist set status = 'inactive' where id = $id";
		$qry = $db['master']->query($sql);
		header("Location:../user.php");
	}				
	if($request['submit'] == 'banner'){
		$id = $request['deleteval'];
		$sql = "update banner set status = 'inactive' where id = $id";
		$qry = $db['master']->query($sql);
		header("Location:../banner.php");
	}
	if($request['submit'] == "faq"){
		$id = $request['deleteval'];
		//$del_sql = "delete from faq where id = $id";
		$del_sql = "update faq set status = 'inactive' where id = $id";
		$db['master']->query($del_sql);
		header("Location: ../faq.php");	
		exit;
	}	
	if($request['submit'] == "newsletter"){
		$id = $request['deleteval'];
		//$del_sql = "delete from faq where id = $id";
		$del_sql = "update newsletter set status = 'inactive' where id = $id";
		$db['master']->query($del_sql);
		header("Location: ../newsletter.php");	
		exit;
	}	
	
?>