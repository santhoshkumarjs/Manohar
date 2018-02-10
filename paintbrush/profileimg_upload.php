<?php    session_start(); //echo "sss"; exit;
   include_once ('framework/initialise/framework.init.php');
   global $db, $request; 
   $uid = $_SESSION['user_id'];
    if(isset($_FILES) &&  !empty($_FILES)){  
	   $upload_name        = $_FILES['prof-pic']['name'];		
	   $rand = rand();
	   $img_name = $rand.time().".".$explode_name[1];			  	   
	   $pname = $rand.$_FILES["prof-pic"]["name"];		
	   $pfolder = "resources/uploads/users/";
	   $path = $pfolder.$pname; 		   
	   if(move_uploaded_file($_FILES["prof-pic"]["tmp_name"], $path)){
		   $up_sql = "update users set profileImage = '".$pname."' where id = $uid";
		   $db['master']->query($up_sql);
	   }
	   echo $path;
   }
   
   
?>

