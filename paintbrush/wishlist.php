<?php	require 'framework/initialise/framework.init.php';  
$sql = "select * from users where id = ".$_SESSION['user_id'];
$data = $db['master']->getOneRow($sql);
$uid = $_SESSION['user_id'];
//$wish_sql = "select * from favorite where userid = $uid";
//$wish_data = $db['master']->getResults($wish_sql);

$psql = "select * from product where id in (select productid from favorite where userid = $uid and status = 'active')";
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
						<li class="breadcrumb-item active">Wishlist</li>
					</ol>
				</div>
			</div>
		</div>
	</section>	
	<section class="grid-wrap">
		<div class="container">
			<div class="row">
	            <?php require 'profile_left.php'; ?>
				<div class="col-md-9 col-sm-12 details order_item">
					<h4 class="page-header">My Wishlist
						<span class="items">Item (<span id="wcount"><?php echo $total_count; ?></span>)</span>
					</h4>
					<div class="clearfix"></div>	
						<div class="panel">
																												
<?php foreach($pdata as $pd){ ?>	
	<div class="row favo_list cart-header">
		<div class="col-md-3 col-xs-12 col-sm-4">
			<a href="product.php?id=<?php echo $pd['id']; ?>"><img class="img-responsive" src="resources/uploads/products/thumb/<?php echo $pd['thumbImage']; ?>" alt=" " title="" /></a>
		</div>
		<div class="col-md-9 col-xs-12 col-sm-8">
			<h4>
				<a href="product.php?id=<?php echo $pd['id']; ?>"><?php echo $pd['name']; ?></a>
				<!--<span class="items"><b>$32,630</b> <span class="off_price">(-45%)</span> </span>-->
			</h4>
			<div class="thirdrow">
				<p>by <b>Surendra Pal Singh</b></p>
			</div>
			<p >Type : <?php echo $pd['artType']; ?><br>Size :  <?php echo $pd['size']; ?></p>
			<p class="action">
				<a href="price-request.php?id=<?php echo $pd['id']; ?>&code=<?php echo $pd['code']; ?>" data-toggle="modal" data-target="#submit_form" class="requeston" >Price On Request</a>
				<a href="#" class="pull-right remove" onclick="remove(<?php echo $pd['id']; ?>, <?php echo $_SESSION['user_id']; ?>);">
				<i class="fa fa-trash-o" ></i> Remove</a>
			</p>
		</div>
	</div>
<?php } ?>

							
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