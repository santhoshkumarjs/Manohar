<?php require 'framework/initialise/framework.init.php'; 
	  require 'functions.php';
//$catID = $request['cid'];
$product_sql = "select * from product where status = 'active'";
$product_data = $db['master']->getResults($product_sql);
$total_product = count($product_data);
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
			}
		});
	</script>
</head><!--/head-->

<body id="home">
	<?php require 'topnav.php'; ?>

	<div class="row">
		<?php require 'sidesocialbar.php'; ?>
	</div>
	<div class="clearfix"></div>
	<section class="sectiontop">
		<div class="container">
			<div class="row breadcrumb_row mrg_0"><!--marl6-->
				<div class="col-md-12 col-xs-12">
					<ol class="breadcrumb">
						<li class="breadcrumb-item"><a href="index.php">Home</a></li>
						<li class="breadcrumb-item active">Art All</li>
					</ol>
				</div>
			</div>
			<div class="row mrg_0"><!-- marl6-->
				<h2 class="heading"><span>Art Works</span></h2>
					<p class="subtitle fancy"><?php echo $total_product; ?> ORIGINALS LISTED</p>
					<p class="text-center">Whether you are looking for an original abstract painting, a modern art painting, or a limited edition watercolor <br>Whether you are looking for an original abstract painting, a modern art painting, or a limited edition watercolor print signed by the artist, Saatchi Art has over 370,000 original paintings</p>
			</div>		
			<!-- List grid Image -->
			<div class="row effects clearfix" id="effect-1">
				<div class="wall">
				
		<?php foreach($product_data as $pdata){  ?>				
					<div class="wall-item">
						<div class="img">
							<a href="product.php?id=<?php echo $pdata['id'];?>"><img src="resources/uploads/products/thumb/<?php echo $pdata['thumbImage']; ?>" alt="" class="img-responsive"></a>
							<div class="overlay">
								<div class="add_fav">
									<a href="#" data-toggle="tooltip" data-placement="bottom" title="Add&nbsp;to&nbsp;Favourite" class="red-tooltip"><i class="fa fa-heart"></i></a>
								</div>
								<a href="product.php?id=<?php echo $pdata['id']; ?>" class="expand">View Art <i class="ti-arrow-circle-right tiarrow"></i></a>
								<!-- <a class="close-overlay hidden">x</a> -->
							</div>
						</div>
						<div class="thirdrow">
							<h4><?php echo $pdata['name']; ?></h4>
							<p class="pull-right">Code: <b><?php echo $pdata['code']; ?></b></p>
							<p>by <b><?php echo getArtistByID($pdata['artistID']);?></b></p>
							<a href="price-request.php" data-toggle="modal" data-target="#submit_form" class="buynow pull-right" >Price On Request</a>
							<p>Acrylic,<?php echo $pdata['artSize']; ?></p>
							<p><?php echo $pdata['artType']; ?></p>
						</div>
					</div>
				
<?php } ?>		
		

				</div>
			</div>
		</div>
	</section>

	<?php require 'footer.php'; ?>
	<!--/Footer-->
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
	<script src="resources/js/smoothScroll.js"></script>
	<script src="resources/js/jquery.scrollTo-1.4.3.1-min.js"></script>
	<script src="resources/js/wow.min.js"></script>
	<script src="resources/js/jaliswall.js"></script>
	<script>
	 wow = new WOW(
	 {
	
		}	) 
		.init();
	</script>
	<script>$('.wall').jaliswall({item:'.wall-item'});</script>
	
	
	
</body>

</html>