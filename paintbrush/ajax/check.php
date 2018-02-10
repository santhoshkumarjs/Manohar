<?php require '../framework/initialise/framework.init.php'; 
require_once('../functions.php');

if($request['check'] == 'emailExist'){
	$email = $request['email'];
	$sql = "select * from users where emailid = '".$email."' and status = 'active'";
	$data = $db['master']->getResults($sql);
	if(count($data) > 0) echo "true"; else echo "false";	
}
if($request['check'] == 'sendPassword'){
	$email = $request['email'];
	$sql = "select password from users where emailid = '".$email."' and status = 'active'";
	$data = $db['master']->getOneRow($sql);
	if(!isset($data['password'])){ echo "noemail"; exit; }	
		$password = $data['password'];		
		$subject = 'Forgot password for Paintbrush';
		$email_content = 'Your password for Paintbrush<br>';
		$email_content .= 'EmailID : '.$email.'<br>';
		$email_content .= 'Password : '.$password.'<br>';
		//echo $email, $subject, $email_content;
		sendemail($email, $subject, $email_content);	
}
?>