<?php 		
	require_once( ROOT_DIR.'framework/initialise/framework.init.php');
		
   function getArtistByID($id){
	   global $db;
	   $sql = "select name from artist where id = $id";
	   $data = $db['master']->getOneRow($sql);	 
	   return $data['name'];
   }
   function getCategoryByID($id){
	   global $db;
	   $sql = "select name from category where id = $id";
	   $data = $db['master']->getOneRow($sql);	 
	   return $data['name'];	   
   }
   function getStyleByID($id){
	   global $db;
	   $sql = "select name from style where id = $id";
	   $data = $db['master']->getOneRow($sql);	 
	   return $data['name'];	   
   }
   function getFavoriteStatus($pid, $uid){
	   global $db;
	   $sql = "select id from favorite where userid = $uid and productid = $pid and status = 'active'";
	   $data = $db['master']->getOneRow($sql);	 
	   if($data['id']) return true; else return false;	   
   }
  function getFavoriteCount($pid){
	   global $db;
	   $sql = "select count(id) as total from favorite where productid = $pid and status = 'active'";
	   $data = $db['master']->getOneRow($sql);	 
	   return $data['total'];	   
   }
  function getCountByAuthor($id){
	   global $db;
	   $sql = "select count(id) as total from product where artistid = $id and status = 'active'";
	   $data = $db['master']->getOneRow($sql);	 
	   return $data['total'];	  
  }
  function getAllProductByCategory($catID){
	  global $db;
	 /* $sql = "select id, name, thumbImage, image from product where status = 'active' and categoryid = $catID and quantity != 0"; */
	  $sql = "select id, name, thumbImage, image, quantity from product where status = 'active' and categoryid = $catID";	  
	  $data = $db['master']->getResults($sql);
	 // print_r($data);
	  return $data;
  }
	
	function sendemail($to_email, $subject, $email_content){

		require_once(ROOT_DIR."framework/library/mail/mail.class.inc");
		//global $log, $mail;			
		$mail = new Mailer();
		$mail->CharSet = "UTF-8"; 
		$mail->IsSMTP();                     // set mailer to use SMTP
		$mail->Host = "192.168.100.7"; //"mail.symbioticinfo.com";  // specify main and backup server
		$mail->SMTPAuth = true; // Turn on SMTP Authentication
		//$mail->SMTPSecure = false;
		$mail->Username = "deepakaran.b";  // SMTP username
		$mail->Password = "De@sym1"; // SMTP password
		$mail->From = 'alerts@m-tutor.com';
		$mail->FromName = 'alerts@m-tutor.com';
		$mail->IsHTML(true); 
		$mail->Subject 	= $subject;			
		$mail->Body    	= $email_content;
		$mail->AddAddress($to_email);
		//$mail->SMTPDebug = true;		
		//console(LOG_LEVEL_INFO,"Inside mail function ::".var_export($mail, true));
		if($mail->Send()){
			//console(LOG_LEVEL_INFO,"Mail sent successfully");
		}else{
			//console(LOG_LEVEL_INFO,"Mail sending failed");
		}
		//console(LOG_LEVEL_INFO,"Inside mail function After ::".var_export($mail, true));
	}
	function sanitize_mail($message) {
		$search = array(
			'/\>[^\S ]+/s',  // strip whitespaces after tags, except space
			'/[^\S ]+\</s',  // strip whitespaces before tags, except space
			'/(\s)+/s'       // shorten multiple whitespace sequences
		);

		$replace = array(
			'>',
			'<',
			'\\1'
		);

		$message = preg_replace($search, $replace, $message);	
			return $message;
	}	
?>