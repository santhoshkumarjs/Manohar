<?php 
	session_start();
	include_once ('../../framework/initialise/framework.init.php');
	//print_r($request); exit;
	
	if($request['type'] == 'product'){
		$id = $request['id'];
		$sql = "select * from product where id = $id";
		$data = $db['master']->getOneRow($sql);	
		echo $result = json_encode($data, true);
	}	
	if($request['type'] == 'artist'){
		$id = $request['id'];
		$sql = "select * from artist where id = $id";
		$data = $db['master']->getOneRow($sql);	
		echo $result = json_encode($data, true);
	}	
	if($request['type'] == 'category'){
		$id = $request['id'];
		$sql = "select * from category where id = $id";
		$data = $db['master']->getOneRow($sql);	
		echo $result = json_encode($data, true);
	}	
?>