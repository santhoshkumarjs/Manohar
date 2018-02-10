<?php require '../../framework/initialise/framework.init.php'; 

if($request['check'] == 'prodcode'){
	$pcode = $request['pcode'];
	$sql = "select * from product where code = '".$pcode."' and status = 'active'";
	$data = $db['master']->getResults($sql);
	if(count($data) > 0) echo "true"; else echo "false";	
}
?>