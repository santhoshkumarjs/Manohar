<?php	require 'framework/initialise/framework.init.php'; 
if(!isset($_SESSION['user_id'])){
	header("Location: index.php");
}
$sql = "select * from users where id = ".$_SESSION['user_id'];
$data = $db['master']->getOneRow($sql);
$shipsql = "select * from shippingaddress where userid = ".$_SESSION['user_id'];
$shipdata = $db['master']->getOneRow($shipsql);
//print_r($shipdata);
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
<style>
.myprofileform li {
    padding: 0px !important;
}

ul.myprofileform {
    padding: 0px;
}
</style>	
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
					<h4 id="profile" class="page-header bordertopbtm edit">Shipping Address 
					<!--
					<a href="#" id="editID" class="pull-right" style="font-size: 14px;padding: 3px;"  data-toggle="modal" data-target="#myModal" data-target=".bs-example-modal-sm">
					<i class="fa fa-pencil " aria-hidden="true"></i> Edit</a>--></h4>
<div class="panel">					
	<ul class="myprofileform">
		<li class="clearfix">
			<label class="myprofilelabel">Name</label>
			<div class="myprofileoptions"><?php echo $shipdata['name']; ?></div>
		</li>
		<li class="clearfix">
			<label class="myprofilelabel">Address1</label>
			<div class="myprofileoptions"><?php echo $shipdata['addr1']; ?></div>
		</li>			
		<li class="clearfix">
			<label class="myprofilelabel">Address2</label>
			<div class="myprofileoptions"><?php echo $shipdata['addr2']; ?></div>
		</li>
		<li class="clearfix">
			<label class="myprofilelabel">City</label>
			<div class="myprofileoptions"><?php echo $shipdata['city']; ?></div>
		</li>
		<li class="clearfix">
			<label class="myprofilelabel">Pincode</label>
			<div class="myprofileoptions"><?php echo $shipdata['pincode']; ?></div>
		</li>								
	</ul>
</div>							
				
				
					<div>
					<a data-toggle="collapse" data-parent="#pwpanel" href="#cone">				
					<h4 id="updateprofile" class="page-header">Add/Update Shipping Address 				
					<span class="pull-right" style="font-size: 14px;padding: 3px;">					
					<i class="fa fa-pencil pull-right" aria-hidden="true"></i> Edit</span>
					</h4></a>
						<div id="cone" class="panel-collapse collapse">
							<div class="panel-body">
<form method="post"	name="shipfrm" action="ajax/add.php">
<div class="panel" id="pwpanel" style="display:block">					 					 
<ul class="myprofileform">	
	<li class="clearfix">
		<label class="myprofilelabel">Name
		<span class="error">*</span></label>				
		<div class="myprofileoptions">
			<input type="text" name="usrname" id="usrname" class="form-control" value="<?php echo $shipdata['name']; ?>">
		</div>
	</li>
	<li class="clearfix">
		<label class="myprofilelabel">Address1<span class="error">*</span></label>
		<div class="myprofileoptions">
		<input type="text" name="addr1" id="addr1" class="form-control" value="<?php echo $shipdata['addr2']; ?>">									
		</div>
	</li>
	<li class="clearfix">
		<label class="myprofilelabel">Address2<span class="error">*</span></label>
		<div class="myprofileoptions">
		<input type="text" name="addr2" id="addr2" class="form-control" value="<?php echo $shipdata['addr2']; ?>">									
		</div>
	</li>		
	<li class="clearfix">
		<label class="myprofilelabel">City<span class="error">*</span></label>
		<div class="myprofileoptions">
		<input type="text" name="city" id="city" class="form-control" value="<?php echo $shipdata['city']; ?>">									
		</div>
	</li>
	<li class="clearfix">
		<label class="myprofilelabel">Pincode<span class="error">*</span></label>
		<div class="myprofileoptions">
		<input type="text" name="pincode" id="pincode" class="form-control" value="<?php echo $shipdata['pincode']; ?>">							
		</div>
	</li>							
	<li class="clearfix" align="right">								
		<div class="myprofileoptions">
			<button class="btn btn-primary" type="submit" name="submit" id="submit" value="shipaddr"><i class="fa fa-check"></i>Submit</button>
		</div>
	</li>							
</ul>
</div></form>
							</div>
						</div>
					</div>				
				
				
				
						</div>		
		</div>
	</section>
	<?php require 'footer.php'; ?>
	<!--Modal Window--->
	<div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;"></div>
	
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
</script>	

</body>

</html>