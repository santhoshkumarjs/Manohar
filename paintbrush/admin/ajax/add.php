<?php 
	session_start();
	include_once ('../../framework/initialise/framework.init.php');
	$timestamp = date("YmdHis");	
	//print_r($request);  exit;
	
	if($request['submitval'] == 'category'){
		$name = $request['category'];
		$desc = $request['desc'];
		$chk_sql = "select name from category where name = '".$name."' and status = 'active'";
		$chk_qry = $db['master']->getOneRow($chk_sql);	   	
		if(!isset($chk_qry['name'])){
			$sql = "insert into category (name, description) values('".$name."','".$desc."')";
			$qry = $db['master']->query($sql);
			//$_SESSION['result_status'] = "Cat";
		}else{
			$_SESSION['result_status'] = "Category Already Exist";
		}			
		header("Location:../dashboard.php");
	}
	if($request['submitval'] == 'artist'){
		$name = $request['name'];	
		$about = $request['about'];
		$dob = $request['dob'];
		$city = $request['city'];
		$state = $request['state'];
		$country = $request['country'];
		$title1 = $request['title1'];
		$desc1 = $request['desc1'];
		$title2 = $request['title2'];
		$desc2 = $request['desc2'];		
		$fb = $request['facebook'];
		$gp = $request['gp'];
		$twitter = $request['twitter'];
		$pr = $request['printrest'];
		
		$chk_sql = "select name from artist where name = '".$name."' and status = 'active'";
		$chk_qry = $db['master']->getOneRow($chk_sql);	   	
		if(isset($chk_qry['name'])){
			$_SESSION['result_status'] = "Artist Name Already Exist";
			header("Location:../artist.php");			
			exit;
		}			
		
		
		
		if($_FILES["backimage"]["name"] != ""){ 
			$backname = $timestamp.$_FILES["backimage"]["name"];		
			$backfolder = "../../resources/uploads/artists/";
			$path = $backfolder.$backname; 	
			move_uploaded_file($_FILES["backimage"]["tmp_name"], $path); 		
		}		
		if($_FILES["pimage"]["name"] != ""){ 
			$pname = $timestamp.$_FILES["pimage"]["name"];		
			$pfolder = "../../resources/uploads/artists/";
			$path = $pfolder.$pname; 	
			move_uploaded_file($_FILES["pimage"]["tmp_name"], $path); 		
		}
		if($_FILES["thumbimage"]["name"] != ""){ 
			$thumbname = $timestamp.$_FILES["thumbimage"]["name"];		
			$thumbfolder = "../../resources/uploads/artists/";
			$path = $thumbfolder.$thumbname; 	
			move_uploaded_file($_FILES["thumbimage"]["tmp_name"], $path); 		
		}		
	
 $sql = "insert into artist (name, image, thumbimage, bannerimage, about, dob, city, state, country, facebook, twitter, googleplus, printrest, title1, desc1, title2, desc2) values('".$name."', '".$pname."', '".$thumbname."','".$backname."', '".$about."','".$dob."','".$city."','".$state."','".$country."','".$fb."','".$twitter."','".$gp."','".$pr."','".$title1."','".$desc1."','".$title2."','".$desc2."')"; 
		$qry = $db['master']->query($sql);	 
		header("Location:../artist.php");
	}		
	if($request['submitval'] == 'product'){
		//print_r($request); exit;
		$name = $request['title'];
		$desc = $request['desc'];
		$code = $request['code'];
		$category = $request['category'];
		$featured = $request['featured'];
		$new_status = $request['new_status'];
		$arttype = $request['arttype'];
		$artsize = $request['artsize'];
		$size = $request['size'];
		$artist = $request['artist'];
		$style = $request['style'];		
		$pcanvas = $request['pcanvas'];
		$ppaper = $request['ppaper'];
		$quantity = $request['quantity'];
		
		if($_FILES["thumbimage"]["name"] != ""){	
			$thumbname = $timestamp.$_FILES["thumbimage"]["name"];
			$thumbfolder = "../../resources/uploads/products/thumb/";
			$thumbpath = $thumbfolder.$thumbname;
			move_uploaded_file($_FILES["thumbimage"]["tmp_name"], $thumbpath); 
		}
		if($_FILES['largeimage']["name"] != ""){
			$largename = $timestamp.$_FILES['largeimage']["name"];
			$largefolder = "../../resources/uploads/products/large/";				 				
			$largepath = $largefolder.$largename; 		        
			move_uploaded_file($_FILES["largeimage"]["tmp_name"], $largepath);
		}
		if($_FILES['videoimage']["name"] != ""){
			$videoname = $timestamp.$_FILES['videoimage']["name"];
			$videofolder = "../../resources/uploads/products/video/";				 				
			$videopath = $videofolder.$videoname; 		        
			move_uploaded_file($_FILES["videoimage"]["tmp_name"], $videopath);
		}		
		
		$sql = "insert into product (name, description, categoryid, artistid, artType, artSize, size, thumbImage, image, videoImage, style, featured, new_status, code, quantity) values('".$name."', '".$desc."', '".$category."', '".$artist."', '".$arttype."', '".$artsize."','".$size."','".$thumbname."','".$largename."', '".$videoname."', '".$style."', '".$featured."', '".$new_status."', '".$code."', '".$quantity."')";	
		$qry = $db['master']->query($sql);
		$productID = $db['master']->getLastID();
		
		foreach($pcanvas as $pcan){
		  if(trim($pcan) != ""){
			$can_sql = "insert into printsize(productid, size, type) values($productID, '".$pcan."', 'canvas')";
			$db['master']->query($can_sql);
		  }
		}
		foreach($ppaper as $paper){
		  if(trim($paper) != ""){
			$can_sql = "insert into printsize(productid, size, type) values($productID, '".$paper."', 'paper')";
			$db['master']->query($can_sql);
		  }
		}					
		header("Location:../product.php");
	}	
	if($request['submitval'] == 'user'){
		$name = $request['name'];
		$sql = "insert into users (name) values('".$name."')";
		$qry = $db['master']->query($sql);
		header("Location:../user.php");
	}	
	if($request['submitval'] == 'banner'){

		$pname = $timestamp.$_FILES["fimage"]["name"];		
		$pfolder = "../../resources/uploads/banner/";
		$path = $pfolder.$pname; 	
        move_uploaded_file($_FILES["fimage"]["tmp_name"], $path); 	
		
		$sql = "insert into banner(image) values('".$pname."')";
		$qry = $db['master']->query($sql);
		header("Location:../banner.php");
	}	
	if($request['submitval'] == 'faq'){	
		$quest = $request['question'];
		$ans = $request['answer'];
		$sql = "insert into faq (question, answer) values('".$quest."', '".$ans."')";
		$db['master']->query($sql);
		header("Location: ../faq.php");	
	}
?>