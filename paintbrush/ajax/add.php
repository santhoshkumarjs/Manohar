<?php session_start();
require_once('../framework/initialise/framework.init.php');     
require_once('../functions.php');
//print_r($request); exit;

if($request['type'] == 'addtofavorite'){
	$userid = $request['userid'];
	$productid = $request['productid'];
	
	$chksql = "select id from favorite where userid = $userid and productid = $productid and status = 'active'";
	$chkdata = $db['master']->getOneRow($chksql);
	if(!isset($chkdata['id'])){		
		$insql = "insert into favorite(userid, productid) values ($userid, $productid)";
		$db['master']->query($insql);
	}
}

if($request['submit'] == 'register'){
	$email = $request['email'];
	$name = $request['name'];
	$password = $request['password'];
	$sql = "insert into users(name, password, emailid) values('".$name."', '".$password."', '".$email."')";
	$db['master']->query($sql);
    $_SESSION['user_id'] = $db['master']->getLastID();
	$_SESSION['username'] = $name;	
	//echo $_SERVER['REQUEST_URI']; exit;
	if(isset($_SESSION['prev_page'])){ 
	  header("Location: ../".$_SESSION['prev_page']); 
	}else{ 
	  header("Location: ../account.php");
    }
}
if($request['submit'] == 'login'){
	$email = $request['email'];	
	$password = $request['password'];
	$sql = "select * from users where emailid = '".$email."' and password = '".$password."'";
	$loginResult = $db['master']->getOneRow($sql);
	
	if($loginResult){
		$_SESSION['user_id'] = $loginResult['id'];
		$_SESSION['username'] = $loginResult['name'];
		echo "success";	
	}else{
		$chk_sql = "select * from users where emailid = '".$email."'";	
		$chkResult = $db['master']->getOneRow($chk_sql);		
		if($chkResult)
		   echo "fail";
	    else
		   echo "notexist";		
	}
}
if($request['type'] == "password"){
	$pass = $request['pass'];
	$uid = $_SESSION['user_id']; 
	$sql = "update users set password = '".$pass."' where id = $uid";
	$qry = $db['master']->query($sql);
}
if($request['submit'] == "pricerequest"){
	$email = $request['emailid'];
	$msg = $request['msg'];
	$msisdn = $request['msisdn'];
	$size = $request['size'];
	$name = $request['username'];
	$pid = $request['pid'];
	if(!isset($_SESSION['user_id']))
		$userid = 0;
	else
		$userid = $_SESSION['user_id'];
	
	$sql = "insert into pricerequest(productid, userid, name, mobileno, emailid, size, message) values($pid, $userid, '".$name."', '".$msisdn."', '".$email."', '".$size."', '".$msg."')";	
	$db['master']->query($sql);
	$product_sql = "select name from product where id = $pid";
	$product = $db['master']->getOneRow($product_sql);

	// Send Mail
	if($email != '') {
		$subject = 'Request for Price';
		$email_content = 'Request for Price of below product<br>';
		$email_content .= 'Name : '.$name.'<br>';
		$email_content .= 'Mobilenumber : '.$msisdn.'<br>';
		$email_content .= 'Email ID : '.$email.'<br>';
		$email_content .= 'Product Name : '.$product['name'].'<br>';
		$email_content .= 'Size : '.$size.'<br>';
		$email_content .= 'Message : '.$msg.'<br>';
		//console(LOG_LEVEL_INFO, "Sending Mail to Admin ::  Subject :: ".$subject." :: Body :: ".$email_content);
		//sendemail('antony.jj@m-tutor.com,qc.support@m-tutor.com,radhika.r@m-tutor.com', $subject, $email_content);
		sendemail('antony.jj@m-tutor.com', $subject, $email_content);
		sendemail('qc.support@m-tutor.com', $subject, $email_content);
		sendemail('radhika.r@m-tutor.com', $subject, $email_content);

	}	
	echo "success";
}
if($request['submit'] == "newsletter"){
	$email = $request['email'];
	
	// Check Email Already Exists
	$email_exists = $db['master']->getOneRow("SELECT email FROM newsletter WHERE STATUS='active' AND email='".$email."' ");
	if(empty($email_exists)) {
		$sql = "insert into newsletter(email) values('".$email."')";
		$db['master']->query($sql);	
		echo '1';
	} else {
		echo '0';
	}
}
if($request['submit'] == "contactus"){
	$name = $request['name'];
	$email = $request['email'];
	$subject = $request['subject'];
	$msg = $request['message'];	
	$sql = "insert into contactus(name, email, subject, message) values('".$name."', '".$email."','".$subject."','".$msg."')";
	$db['master']->query($sql);
	$_SESSION['add_status'] = "success";
	header("Location: ../contact.php");
}
if($request['submit'] == "shipaddr"){
	$uid = $_SESSION['user_id'];
	$name = $request['usrname'];
	$addr1 = $request['addr1'];
	$addr2	=  $request['addr2'];
	$city =  $request['city'];
	$pincode = $request['pincode'];
	$sql = "insert into shippingaddress(userid, name, addr1, addr2, city, pincode) values($uid, '".$name."', '".$addr1."', '".$addr2."', '".$city."', '".$pincode."') on duplicate key update name = '".$name."', addr1 = '".$addr1."', addr2 = '".$addr2."', city = '".$city."', pincode = '".$pincode."'";
	$db['master']->query($sql);	
	header("Location: ../shipaddr.php");
}
?>