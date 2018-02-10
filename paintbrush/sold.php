<?php	require 'framework/initialise/framework.init.php';
	require 'functions.php';
    $aid = $request['aid'];

	$sql = "select * from artist where id = $aid and status = 'active'";
	$author = $db['master']->getOneRow($sql);
	$data = $author;
//echo $product_sql = "select * from product where artistid = $aid and status = 'active' and quantity = 0";	
$product_sql = "select * from product where artistid = $aid and status = 'active' and quantity = 0";
$product_data = $db['master']->getResults($product_sql);	
//print_r($product_data); exit;
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
	<link href="resources/css/responsive.css" rel="stylesheet">
	<link href="resources/css/component.css" rel="stylesheet">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<script src="resources/js/jquery-1.11.0.min.js"></script>
	<script src="resources/js/modernizr.js"></script>
	<script>
		$( document ).ready(function() {

			if ($(window).width() > 768) {
				$('.wall-item').hover(
					function () {
						$(this).find('.buynow').css("display","block");
					},
					function () {
						$(this).find('.buynow').css("display","none");
					});
				}
			
				$(".btn-pref .btn").click(function () {
				$(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
				// $(".tab").addClass("active"); // instead of this do the below 
				$(this).removeClass("btn-default").addClass("btn-primary");   
			});
		});

		$(document).ready(function(){
			$(".add_fav a").tooltip();
		});
	</script>
	<script>
		$(document).ready(function(){
			if (Modernizr.touch) {
				// show the close overlay button
				$(".close-overlay").removeClass("hidden");
				// handle the adding of hover class when clicked
				$(".img").click(function(e){
					if (!$(this).hasClass("hover")) {
						$(this).addClass("hover");
					}
				});
				// handle the closing of the overlay
				$(".close-overlay").click(function(e){
					e.preventDefault();
					e.stopPropagation();
					if ($(this).closest(".img").hasClass("hover")) {
						$(this).closest(".img").removeClass("hover");
					}
				});
			} else {
				// handle the mouseenter functionality
				$(".img").mouseenter(function(){
					$(this).addClass("hover");
					$(this).find('.buynow').css("display","block"); 
				})
				// handle the mouseleave functionality
				.mouseleave(function(){
					$(this).removeClass("hover");
					
				});
			}/*
			$('#tabs').on('click', 'li', function(){
				$('#tabs li').removeClass('active');
				$(this).addClass('active');
			});*/
		});
	</script>
<style>

</style>
</head><!--/head-->

<body id="home">
	<?php require 'topnav.php'; ?>
	<!--=== End Header v5 ===-->
	<div class="row">
		 <?php require 'sidesocialbar.php'; ?>
	</div>
	<div class="clearfix"></div>
	<section>
		<div class="">
		<!---artist header starts-->
		<?php require 'artist_header.php'; ?>

					<!---artist header ends-->
<?php
if(count($product_data) < 1){
	echo '<p style="padding-top:150px; padding-bottom:150px" class="subtitle fancy">NO DATA FOUND</p>';
} 		?>			
			
			<div class="artist_bio">
				<div id="content">
	
					<div id="tab3" class="container">
						<div class="row effects clearfix" id="effect-1">
							<div class="wall">

<?php foreach($product_data as $pdata){   ?>	

<div class="wall-item">
<div class="img">
	<a href="product.php?id=<?php echo $pdata['id'];?>">
	<img src="resources/uploads/products/thumb/<?php echo $pdata['thumbImage']; ?>" alt="" class="img-responsive"></a>
	<div class="overlay">
	<?php if(isset($_SESSION['user_id'])){
		$favorite_status = getFavoriteStatus($pdata['id'], $_SESSION['user_id']);
		if($favorite_status != 1 ){ ?>	

		<div class="add_fav">
				<a id="fav_icon<?php echo $pdata['id']; ?>" href="#" data-toggle="tooltip" data-placement="bottom" title="Add&nbsp;to&nbsp;Favourite" class="red-tooltip" onclick="favorite(<?php echo $pdata['id']; ?>);">
				<i class="fa fa-heart"></i></a>
		</div>		
		
		<?php }} ?>
		<a href="product.php?id=<?php echo $pdata['id'];?>" class="expand">View Art <i class="ti-arrow-circle-right tiarrow"></i></a>
		<div class="sold">
			<p>Sold</p>
		</div>
	</div>
</div>
<div class="thirdrow">

		<h4><?php echo $pdata['name']; ?></h4>
		<p>by <b><?php echo getArtistByID($pdata['artistid']);?></b></p>
		<p><?php echo $pdata['size']; ?></p>
		<p><?php echo $pdata['artType']; ?></p>
</div>
</div>
					
<?php } ?>

							</div>
						</div>
					</div>

				</div>
			</div>			
		</div>
	</section>
	
<?php require 'footer.php'; ?>
	<div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">    	
	</div>
	<div class="modal fade" id="submit_form" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">			
	</div>
	
	<a href="#header" class="scrollup" style="display;none;"><i class="fa fa-chevron-up"></i></a>	
	
	<!--<script src="./Final Tiles Grid Gallery _ jQuery plugin_files/addthis_widget.js.download" async="async"></script>-->
    <script src="resources/js/jquery.js"></script>
	<script src="resources/js/bootstrap.min.js"></script>
	<script src="resources/js/jquery.scrollUp.min.js"></script>
	<script src="resources/js/main.js"></script>
	<script src="resources/js/hallooou.js"></script>
	<script src="resources/js/jquery.scrollTo-1.4.3.1-min.js"></script>
	<script src="resources/js/wow.min.js"></script>
<script src="resources/js/jaliswall.js"></script>
<script>
 wow = new WOW(
 {

	}	) 
	.init();
</script>
<script>
	$('.wall').jaliswall({item:'.wall-item'});
</script>
	
<script> 
function favorite(pid){
	    var userid = "<?php echo $_SESSION['user_id']; ?>";
		$.ajax({
			url		: "ajax/add.php?productid="+pid+"&userid="+userid+"&type=addtofavorite", 				
			success: function(result){	
				$("#fav_icon"+pid).removeAttr("data-original-title");
				$("#fav_icon"+pid).prop("data-original-title", "Added");			
			}
		});
}
</script>
 
	
</body>

</html>