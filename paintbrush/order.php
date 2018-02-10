<?php session_start();
require 'framework/initialise/framework.init.php';  
if(!isset($_SESSION['user_id'])){
	header("Location: index.php");
}
 $sql = "select * from users where id = ".$_SESSION['user_id'];
$data = $db['master']->getOneRow($sql);
$uid = $_SESSION['user_id'];
//$wish_sql = "select * from favorite where userid = $uid";
//$wish_data = $db['master']->getResults($wish_sql);

 $psql = "select * from product where id in (select productid from pricerequest where userid = $uid and status = 'active')"; 
$pdata = $db['master']->getResults($psql);
$total_count = count($pdata);
//print_r($pdata); exit;
//print_r($_SESSION); exit;
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
	
</head>
<style>
	/*.produ_info{float: left;margin-top: 37px;padding: 0;width: 30%;}
	.details{float: left;margin-top: 37px;width: 70%;}*/
</style>
<body id="home">
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
						<li class="breadcrumb-item active">Orderlist</li>
					</ol>
				</div>
			</div>
		</div>
	</section>	
	<section class="grid-wrap">
		<div class="container">
			<div class="row">
	            <?php require 'profile_left.php'; ?>
									
<div class="col-md-9 col-sm-12 details">
<h4 class="page-header">My Order List</h4>
<div class="clearfix"></div>
<div class="cart-header order_list">
	<div class="col-md-12 col-xs-12 col-sm-12">
		<div class="row">
			<div class="table-responsive">          
				<table class="table table-striped table-bordered">
					<thead>
						<tr>
							<th>Order numbers</th>
							<th>Item Code</th>
							<th>Item Name</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody>
<?php 
//echo count($pdata); exit;
if(count($pdata) < 1){  ?>
	<tr><td colspan="4" align="center">NO ORDER FOUND</td></tr>
<?php
}
foreach($pdata as $pd){ ?>					
<tr>
	<td><?php echo $pd['id']; ?></td>
	<td><?php echo $pd['code']; ?></td>
	<td><?php echo $pd['name']; ?></td>
	<td></td>
</tr>
<?php } ?>						
					</tbody>
				</table>
			</div> 
		</div>
	</div>
</div>											
</div>				
						
				
			</div>
		</div>
	</section>
	<?php require 'footer.php'; ?>
	<!--Modal Window--->
	<div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
    	
	</div>
	<div class="modal fade" id="submit_form" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">			
	</div>
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
function remove(pid, uid){
$.ajax({
	url		: "ajax/delete.php?pid="+pid+"&uid="+uid+"&submit=wishlist", 
	dataType: "json",				
	success: function(result){					
		//alert(result.id);
		//$('#edesc').val(result.description);	
	}	
});	
		wc = $("#wcount").text();		
		wc = wc - 1;
		$("#wcount").text(wc);
}
</script>

</body>

</html>