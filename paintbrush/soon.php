<?php	require 'framework/initialise/framework.init.php';  ?>
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
<style>

</style>
	
</head><!--/head-->

<body id="home">
<?php require 'topnav.php'; ?>
	<!--=== End Header v5 ===-->
	<div class="row">
		<div class="wishlist_social" style="">
			<ul class="padd0">
				<li class="square"><a href="wishlist.html" title="favourite" ><i class="fa fa-heart"></i><span class="like-tooltip">3</span></a></li>
			</ul>
			<ul class="padd0 hidden-xs">
				<!--<li class="square"><a href="#" title="facebook" target="blank"><i class="fa fa-heart"></i><span class="like-tooltip">0</span></a></li>-->
				<li class="square "><a href="https://www.facebook.com/login/" title="facebook" target="blank"><i class="ti-facebook"></i></a></li>
				<li class="square"><a href="https://twitter.com/login" title="twitter" target="blank"><i class="ti-twitter-alt"></i></a></li>
				<li class="square"><a href="https://plus.google.com/collections/featured" title="google+" target="blank"><i class="ti-google"></i></a></li>
				<li class="square"><a href="https://in.pinterest.com/login/" title="pinterest" target="blank"><i class="ti-pinterest"></i></a></li>
			</ul>
		</div>
	</div>
	<div class="clearfix"></div>
	<section class="sectiontop">
		<div class="container text-center">
			<!--<img class="img-responsive" src="images/coming_soon.png" alt="coming soon" title="coming soon" />-->
			<h1 class="soon" > Coming Soon !!! </h1>
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