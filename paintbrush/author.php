<?php	require 'framework/initialise/framework.init.php'; 
	$aid = $request['id'];
	$sql = "select * from artist where id = $aid and status = 'active'";
	$data = $db['master']->getOneRow($sql);
	//$author = $data;
	//print_r($data);
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

		<!----artist header starts here----->
		<?php require 'artist_header.php'; ?>		
					<!----artist header ends here----->
			
			<div class="artist_bio">
				<div id="content">
					<div id="tab1">
						<div class="container padd_top_botm">
							<div class="profile_bg">
								<h3>About</h3>
								<p><?php echo $data['about']; ?></p>
								<h5><b><?php echo strtoupper($data['title1']); ?></b></h5>
								<p><?php echo $data['desc1']; ?></p>
								<h5><b><?php echo strtoupper($data['title2']); ?></b></h5>
								<p><?php echo $data['desc2']; ?></p>
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
	
	
</body>

</html>