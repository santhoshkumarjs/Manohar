<?php	require 'framework/initialise/framework.init.php'; 
if(!isset($_SESSION['user_id'])){
	header("Location: index.php");
}
$sql = "select * from users where id = ".$_SESSION['user_id'];
$data = $db['master']->getOneRow($sql);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Paint Brush</title>
    <link href="resources/css/bootstrap.min.css" rel="stylesheet">
	<link href="resources/css/themify-icons.css" rel="stylesheet">
    <link href="resources/css/font-awesome.min.css" rel="stylesheet">
    <link href="resources/css/animate.css" rel="stylesheet">
	<link href="resources/css/main.css" rel="stylesheet">
	<link href="resources/css/component.css" rel="stylesheet">
	<link href="resources/css/responsive.css" rel="stylesheet">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<script src="resources/js/jquery-1.11.0.min.js"></script>
	<script>
		jQuery(function ($) {
				$('[data-toggle="collapse"]').on('click', function() {
					var $this = $(this),
							$parent = typeof $this.data('parent')!== 'undefined' ? $($this.data('parent')) : undefined;
					if($parent === undefined) { /* Just toggle my  */
						$this.find('.glyphicon').toggleClass('glyphicon-plus glyphicon-minus');
						return true;
					}

					/* Open element will be close if parent !== undefined */
					var currentIcon = $this.find('.glyphicon');
					currentIcon.toggleClass('glyphicon-plus glyphicon-minus');
					$parent.find('.glyphicon').not(currentIcon).removeClass('glyphicon-minus').addClass('glyphicon-plus');

				});
		});
	</script>
</head><!--/head-->

<body id="home">
		<!-- Navbar -->
	<?php require 'topnav.php'; ?>
	<!--=== End Header v5 ===-->
	<div class="row">
	   <?php require 'sidesocialbar.php'; ?>
	</div>
	<div class="clearfix"></div>
	<section class="sectiontop">
		<div class="container">
			<div class="row breadcrumb_row mrg_0">
				<div class="col-md-12 col-xs-12">
					<ol class="breadcrumb">
						<li class="breadcrumb-item"><a href="index.php">Home</a></li>
						<li class="breadcrumb-item active">Account</li>
					</ol>
				</div>
			</div>
		</div>
	</section>	
	
	<section class="grid-wrap">
		<div class="container">
			<div class="row">
			<?php require 'profile_left.php'; ?>
				<div class="col-md-9 details">
					<h4 id="profile" class="page-header bordertopbtm edit">My Profile 
					<a href="#" id="editID" class="pull-right" style="font-size: 14px;padding: 3px;"  data-toggle="modal" data-target="#myModal" data-target=".bs-example-modal-sm">
					<i class="fa fa-pencil " aria-hidden="true"></i> Edit</a></h4>
					<div class="panel">					
						<ul class="myprofileform">
							<li class="clearfix">
								<label class="myprofilelabel">Full Name</label>
								<div class="myprofileoptions"><?php echo $data['name']; ?></div>
							</li>
							<li class="clearfix">
								<label class="myprofilelabel">Email Address</label>
								<div class="myprofileoptions"><?php echo $data['emailid']; ?></div>
							</li>
							<!--
							<li class="clearfix">
								<label class="myprofilelabel">Contact Details</label>
								<div class="myprofileoptions"></div>
							</li>
							<li class="clearfix">
								<label class="myprofilelabel">Address</label>
								<div class="myprofileoptions"></div>
							</li>-->
						</ul>
					</div>
					<div>
					<h4 id="profile" class="page-header bordertopbtm edit">Change Password 
					<!--
					<a href="#" class="pull-right" style="font-size: 14px;padding: 3px;">					
					<i class="fa fa-pencil " aria-hidden="true"></i> Edit</a> -->
					</h4>
					<div class="panel" id="pwpanel" style="display:block">					 					 
						<ul class="myprofileform">	
							<li class="clearfix">
								<label class="myprofilelabel">New Password
								<span class="error">*</span></label>				
								<div class="myprofileoptions">
									<input type="password" name="newpass" id="newpass" class="form-control">
								</div>
							</li>
							<li class="clearfix">
								<label class="myprofilelabel">Confirm Password<span class="error">*</span></label>
								<div class="myprofileoptions">
									<input type="password" name="confirmpass" id= "confirmpass" class="form-control">									
								</div>
							</li>
							<li class="clearfix" align="right">								
								<div class="myprofileoptions">
									<button class="btn btn-primary" type="button" name="submitval" id="submitval" value="Change" onclick="changepassword();"> <i class="fa fa-check"></i>Submit</button>
								</div>
							</li>							
						</ul>
					</div>
					</div>
				</div>
		</div>
	</section>
	<?php require 'footer.php'; ?>
	<!--Modal Window--->
	<div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;"></div>
	

<form name="addpopup" id="addpopup" method="post" action="ajax/update.php" onSubmit="return validatepform();">
<div id="myModal" class="modal fade bs-example-modal-sm" role="dialog">
  <div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Edit Profile</h4>
      </div>
      <div class="modal-body">		
		<div class="form-group">
		<label class="col-sm-4 control-label">Full Name<span class="error">*</span></label>				
		  <div class="col-sm-6">				
		  <input type="text" placeholder="Add Name" value="<?php echo $data['name']; ?>" class="form-control" id="username" name="username" maxlength="30" pattern="^[A-Za-z .]+$" required title="No special characters">	
		  </div>						
		</div>		
      </div>
	  <br><br>
      <div class="modal-body">		
		<div class="form-group">
		<label class="col-sm-4 control-label">Email Address<span class="error">*</span></label>				
		  <div class="col-sm-6">				
		  <input type="email" placeholder="Add Email" value="<?php echo $data['emailid']; ?>" class="form-control" id="useremail" name="useremail" required>	
		  </div>						
		</div>		
      </div>	  
      <div class="modal-footer" style="margin-top:15px;">
       <button class="btn btn-primary" type="submit" value="profile" name="submitval" id="submitval"> 
	   <i class="fa fa-check"></i> Submit</button>
	   <button class="btn btn-default" type="reset" onclick="profilereset();"><i class="fa fa-repeat"></i> Reset</button>
      </div>
    </div>
  </div>
</div>
</form>	
	<a href="#header" class="scrollup"><i class="fa fa-chevron-up"></i></a>	
    <script src="resources/js/jquery.js"></script>
	<script src="resources/js/bootstrap.min.js"></script>
	<script src="resources/js/jquery.scrollUp.min.js"></script>
	<script src="resources/js/main.js"></script>
	<script src="resources/js/hallooou.js"></script>
	<script src="resources/js/jquery.scrollTo-1.4.3.1-min.js"></script>
	<script src="resources/js/wow.min.js"></script>
<script> 
 wow = new WOW(
 {

	}	) 
	.init();
</script>

<script>

function profilereset(){
	$('#username').val('');
	$('#useremail').val('');
}

function validatepform(){
	username = $('#username').val();
	if(username.trim() == ""){
		alert("Please Enter UserName");
		return false;
	}	
}

function changepassword(){
	newpass = $("#newpass").val();	
	confirmpass = $("#confirmpass").val();
	if(newpass.trim() == ""){
		alert("Please Enter New password"); 
	    $("#newpass").val('');
		return false;
	}
	if(newpass.trim().length < 6 ){
		alert("Password Length should be atleast 6 characters"); 
	    $("#newpass").val('');
		return false;
	}	
	if(confirmpass.trim() == ""){
		alert("Please Enter confirm password"); 
	    $("#confirmpass").val('');
		return false;
	}	
	if(newpass != confirmpass){
		alert("password and confirm password did not match");
		$("#confirmpass").val('');
	    $("#newpass").val('');
		return false;
	}else{
			$.ajax({
				url: 'ajax/add.php',
				type:'post',
				data: {pass: newpass, type:'password'},						
				success:function(res){						
				    alert("password changed");
				    $("#newpass").val('');	
					$("#confirmpass").val('');
				}
			});			
	}		
}
function changeprofile(){

	$.ajax({
		url: 'ajax/add.php',
		type:'post',
		data: {pass: 'newpass', type:'profile'},						
		success:function(res){}
	});		
    $('#myModal').modal('hide');	
}		

</script>	

<!--<script> $('#OpenImgUpload').click(function(){ $('#imgupload').trigger('click'); }); </script>-->
</body>

</html>