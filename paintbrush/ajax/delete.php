<?php require '../framework/initialise/framework.init.php'; 
//print_r($request); exit;


if($request['submit'] == 'wishlist'){
	$pid = $request['pid'];
	$uid = $request['uid'];
	$sql = "update favorite set status = 'inactive' where userid = $uid and productid = $pid";
	$db['master']->query($sql);
}
?>