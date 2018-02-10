<?php 	include_once ('framework/initialise/framework.init.php'); ?>
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
	<script src="http://maps.google.com/maps/api/js?sensor=false" type="text/javascript"></script>
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
			//g.map mouse cursor
			$('.map_bg').click(function () {
				$('.map_bg #map').css("pointer-events", "auto");
			});
			
			$( ".map_bg" ).mouseleave(function() {
			  $('.map_bg #map').css("pointer-events", "none"); 
			});
		});
	</script>
	
	<style>
	map_bg #map{
		pointer-events: none;
	}
	</style>
</head><!--/head-->

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
						<li class="breadcrumb-item active">Contact Us</li>
					</ol>
				</div>
			</div>
			<!-- List grid Image -->
			<div class="row mrg_0">
				<h2 class="heading"><span>Contact Us</span></h2>
					<!--<p class="subtitle fancy">12345 ORIGINALS LISTED</p>-->
					<p class="text-center">Whether you are looking for an original abstract painting, a modern art painting, or a limited edition watercolor <br>Whether you are looking for an original abstract painting, a modern art painting, or a limited edition watercolor print signed by the artist, Saatchi Art has over 370,000 original paintings</p>
			</div>
<div class="row effects clearfix" id="effect-1">
<!-- BLOG CONTENT -->
<div class="blog-content">
<div class="container">
<div class="row">
	<!-- Sidebar -->
	<!--<aside class="col-sm-4">
		<div class="contact-info ">
			<h5 class="form_heading"> Contact Us</h5>
			<div class="media-list contact_bg">
				<div class="media">
					<div class="col-xs-2">
						<i class="pull-left fa fa-home"></i>
					</div>
					<div class="col-xs-10">
						<div class="media-body">
							<strong>Address:</strong><br>
							987 Main st. New York, NY, 00001, U.S.A
						</div>
					</div>
				</div>
				<div class="media">
					<div class="col-xs-2">
						<i class="pull-left fa fa-phone"></i>
					</div>
					<div class="col-xs-10">
						<div class="media-body ">
							<strong>Telephone:</strong><br>
							(+91) 98840-98840
						</div>
					</div>
				</div>
				<div class="media">
					<div class="col-xs-2">
						<i class="pull-left fa fa-envelope-o"></i>
					</div>
					<div class="col-xs-10">
						<div class="media-body ">
							<strong>Fax:</strong><br>
							0123456789
						</div>
					</div>
				</div>
				<div class="contact-details">                                     
					<p>  Phasellus pellentesque purus in massa aenean in pede phasellus libero ac tellus pellentesque semper.  </p>
				</div>
				<div class="media">
					<div class="media-body">
						<strong>Customer Service:</strong><br>
						<a href="mailto:connect@paintbrush.ae">connect@paintbrush.ae</a>
					</div>
				</div>
				<div class="media">
					<div class="media-body">
						<strong>Returns and Refunds:</strong><br>
						<a href="mailto:connect@paintbrush.ae">connect@paintbrush.ae</a>
					</div>
				</div>
			</div>
		</div>
	</aside>-->
	<div class="media text-center" >
		<div class="media-body">
			<strong>Mail Id:</strong>
			<a href="mailto:connect@paintbrush.ae">connect@paintbrush.ae</a>
		</div>
	</div>
	
<aside class="col-md-6"><!-- form_space-->
<?php if($_SESSION['add_status'] == "success"){ ?>
<span><font color="red">Data sent successfully</font></span>
<?php $_SESSION['add_status'] = ''; } ?>
<h5 class="form_heading"> Contact Form</h5>
<div class="contact_bg">
<form method="post" action="ajax/add.php" id="contact_form" role="form" class="form ">
		<div class="row">
			<div class="col-md-6 input_space">
				<input name="name" id="name" class="input-md form-control" placeholder="Name *" maxlength="100" required="" type="text">
			</div>
			<div class="col-md-6 input_space">
				<input name="email" id="email" class="input-md form-control" placeholder="Email *" maxlength="100" required="" type="email">
			</div>
		</div>
		<div class="input_space">
			<input class="input-md form-control" placeholder="Subject *" name="subject" maxlength="100" required="" type="text">
		</div>
		<div class="input_space">
			<textarea name="message" id="text" class="input-md form-control" rows="6" placeholder="Message *" maxlength="400" style="resize:none"></textarea>
		</div>
		<div class="row mrg_0">
			<button name="submit" type="submit" value="contactus" href="#" class="btn btn-default contact_sent"> Send A Message</button>
		</div>
	</form>
</div>
</aside>
							<div class="col-md-6">
								<div class="map_bg">
									<div id="map"></div>
								</div>
							</div>
							<div class="clearfix"></div>
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
	
	<script>
	
	</script>
	<script type="text/javascript">
		var locations = [
			["<div class='lms_map_infowindow'><h4>Mobile Tutor Private Limited.</h4><p>No.12, AH Block 3rd Street,<br>Anna nagar<br>Chennai &ndash; 600 040<br><br>Phone : 91 - 44 - 4217 9352<br>Email : <a href='mailto:connect@paintbrush.ae'>connect@paintbrush.ae </a></p></div>",  13.085126,80.211378, ],
		];

		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 14,
			center: new google.maps.LatLng(13.0935311,80.2127988),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

		var infowindow = new google.maps.InfoWindow();

		var marker, i;

		for (i = 0; i < locations.length; i++) {
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(locations[i][1], locations[i][2]),
				map: map,
				url: locations[i][4]
			});

			google.maps.event.addListener(marker, 'click', (function(marker, i) {
				return function() {
					infowindow.setContent(locations[i][0]);
					infowindow.open(map, marker);
				}
			})(marker, i));
		}
	                
	</script>

    <script src="resources/js/jquery.min.js"></script>
	<script src="resources/js/bootstrap.min.js"></script>
	<script src="resources/js/jquery.scrollUp.min.js"></script>
	<script src="resources/js/main.js"></script>
	<script src="resources/js/hallooou.js"></script>
	<script src="resources/js/jquery.scrollTo-1.4.3.1-min.js"></script>
	<script src="resources/js/wow.min.js"></script>
	<script src="resources/js/jaliswall.js"></script>
	<script>
		wow = new WOW(
			{	}	
		) 
		.init();
	</script>
	<script>$('.wall').jaliswall({item:'.wall-item'});</script>
	
</body>

</html>