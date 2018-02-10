<?php
header("Access-Control-Allow-Origin: *");
 session_start();
 require_once ('../framework/initialise/framework.init.php');
 
 global $db, $request, $curl;

 if($request["type"]=="getbanner"){
	$bannerURL = BANNER_URL;
	$resBanner = $db['master']->getResults("SELECT concat('".$bannerURL."',image) as image FROM banner WHERE `status`='active' AND show_status='active'");
	$response['banner'] 	= $resBanner;
	$response['returncode'] = "200";
	$response['returnmsg']  = "success";
	header('Content-type: application/json');
	echo json_encode($response,true);
 }
 
?>
