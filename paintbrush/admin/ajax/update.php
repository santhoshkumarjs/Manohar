<?php //error_reporting(E_ALL);
	session_start();
	include_once ('../../framework/initialise/framework.init.php');

	$timestamp = date("YmdHis");
	//print_r($request); exit;
	
	if($request['editsubmitval'] == 'category'){
		$name = $request['editcategory'];
		$id = $request['editval'];
		$edesc = $request['edesc'];
		$sql = "update category set name = '".$name."', description='".$edesc."' where id = $id";
		$qry = $db['master']->query($sql);
		header("Location:../dashboard.php");
	}
	if($request['submitval'] == 'product'){
		$title = $request['title'];
		$desc = $request['desc'];
		$code = $request['code'];
		$category = $request['category'];
		$featured = $request['featured'];
		$new_status = $request['new_status'];
		$artsize = $request['artsize'];
		$size = $request['size'];
		$arttype = $request['arttype'];
		$style = $request['style'];
		$artist = $request['artist'];
		$id = $request['editval'];
		$style = $request['style'];
		$pcanvas = $request['pcanvas'];
		$ppaper = $request['ppaper'];	
		$quantity = $request['quantity'];
		
		$ps_up_sql = "update printsize set status = 'inactive' where productid = $id";	
		$ps_up_qry = $db['master']->query($ps_up_sql);
		
		foreach($pcanvas as $pcan){
		  if(trim($pcan) != ""){			
			$can_sql = "insert into printsize(productid, size, type) values($id, '".$pcan."', 'canvas')";
			$db['master']->query($can_sql);
		  }
		}
		foreach($ppaper as $paper){
		  if(trim($paper) != ""){			
			$pap_sql = "insert into printsize(productid, size, type) values($id, '".$paper."', 'paper')";
			$db['master']->query($pap_sql);
		  }
		}			

		if($_FILES["thumbimage"]["name"] != ""){	
			echo $thumbname = $timestamp.$_FILES["thumbimage"]["name"];
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
		
		if($_FILES["thumbimage"]["name"] != ""){
			$thumb_sql = "update product set thumbImage = '".$thumbname."' where id = $id"; 
			$qry = $db['master']->query($thumb_sql);		
		}
	
		if($_FILES['largeimage']["name"] != ""){
			$large_sql = "update product set image = '".$largename."' where id = $id"; 
			$qry = $db['master']->query($large_sql);			
		}
		
		if($_FILES['videoimage']["name"] != ""){
			$video_sql = "update product set videoImage = '".$videoname."' where id = $id"; 
			$qry = $db['master']->query($video_sql);
		}	
		
		$sql = "update product set name = '".$title."', categoryid = '".$category."', artistid = '".$artist."', code = '".$code."', featured = '".$featured."', new_status = '".$new_status."', size = '".$size."', artSize = '".$artsize."',artType = '".$arttype."', description = '".$desc."', quantity = '".$quantity."', style = '".$style."'   where id = $id";
		
	
		$qry = $db['master']->query($sql);
		header("Location:../product.php");
	}	
	if($request['submitval'] == 'artist'){
		
		$id = $request['editvalue'];
		$name = $request['aname'];
		$about = $request['about'];
		$dob = $request['dob'];
		$state = $request['state'];
		$city = $request['city'];
		$country = $request['country'];	
		
		$fb = $request['facebook'];
		$gp = $request['googleplus'];
		$twitter = $request['twitter'];
		$printrest = $request['printrest'];
		$title1 = $request['title1'];
		$desc1 = $request['desc1'];
		$title2 = $request['title2'];
		$desc2 = $request['desc2'];		
		

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
			echo $thumbname = $timestamp.$_FILES["thumbimage"]["name"];
			$thumbfolder = "../../resources/uploads/artists/";
			$thumbpath = $thumbfolder.$thumbname;
			move_uploaded_file($_FILES["thumbimage"]["tmp_name"], $thumbpath); 
		}		
		if($_FILES["pimage"]["name"] != ""){
			$p_sql = "update artist set image = '".$pname."' where id = $id"; 
			$qry = $db['master']->query($p_sql);		
		}	
		if($_FILES['backimage']["name"] != ""){
			$back_sql = "update artist set bannerimage = '".$backname."' where id = $id"; 
			$qry = $db['master']->query($back_sql);			
		}		
		
		if($_FILES["thumbimage"]["name"] != ""){
			$thumb_sql = "update artist set thumbImage = '".$thumbname."' where id = $id"; 
			$qry = $db['master']->query($thumb_sql);		
		}		
		
		$sql = "update artist set name = '".$name."', dob = '".$dob."', city = '".$city."', state = '".$state."', country = '".$country."', about = '".$about."', title1 = '".$title1."', title2 = '".$title2."', desc1 = '".$desc1."', desc2 = '".$desc2."', facebook = '".$fb."', googleplus = '".$gp."', twitter = '".$twitter."', printrest = '".$printrest."' where id = $id";		
		
		$qry = $db['master']->query($sql);
		header("Location:../artist.php");
	}		
	if($request['submit'] == 'banner'){	
	    $id = $request['id'];
		$status = $request['status'];
        if($status == 'true'){
			echo $sql = "update banner set show_status ='active' where id = $id";
		}else{
			echo $sql = "update banner set show_status ='inactive' where id = $id";
		}
			$qry = $db['master']->query($sql);			
	}
	
if($request['submit'] == "faq"){
	$id = $request['editval'];	
	$quest = $request['equest'];	
	$ans = $request['eans'];
	$up_sql = "update faq set question = '".$quest."', answer = '".$ans."' where id = $id";
	$db['master']->query($up_sql);
	header("Location: ../faq.php");	
	exit;		
}	
?>