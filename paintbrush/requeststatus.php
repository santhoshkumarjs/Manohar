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
	.Policy{background: #FFF;padding: 15px;}
	/*.Policy .nav-tabs{background: #f3f3f3;}*/
	.tab-pane row{background: #f3f3f3;}
	.left_nav_tab .nav-tabs li{float: none !important;margin: 5px 0px;background: #f3f3f3;}
	.left_nav_tab .nav-tabs li.active a, .nav-tabs li.active a:hover, .nav-tabs li.active a:focus{background: #333;color:#FFF;}
	.left_nav_tab .nav-tabs > li > a{border-radius: 0px;border: 0px;color: #000;font-size: 15px;}
	.tab_conent_bg{background: #fff;}
	.tab_conent_pad{padding: 15px;}
	.tab_row_bg{background: #f3f3f3;}
	.Policy_heading{margin-top: 0px;}
	.heading_line{margin-top: 5px;margin-bottom: 15px;border: 0;border-top: 2px solid #FFF;}
	.policy_title{font-size: 15px;font-weight: 600;}
	.tab_row_bg p{line-height:25px;}
	.left_nav_tab .nav-tabs {border-bottom:0px !important;}
	.policy_content{margin-top: 38px;}
	
/*----- Accordion -----*/
.accordion, .accordion * {-webkit-box-sizing:border-box; -moz-box-sizing:border-box; box-sizing:border-box;}
.accordion {overflow:hidden;box-shadow:0px 1px 3px rgba(0,0,0,0.25);background:#f7f7f7;}
/*----- Section Titles -----*/
.accordion-section-title {width:100%;padding:15px;display:inline-block;border-bottom:1px solid #1a1a1a;background:#333;transition:all linear 0.15s;font-size:16px;text-shadow:0px 1px 0px #1a1a1a;color:#fff;}
.accordion-section-title.active, .accordion-section-title:hover, .accordion-section-title:focus {background:#4c4c4c;text-decoration:none;color:#fff;}
.accordion-section:last-child .accordion-section-title {border-bottom:none;}
.accordion-section ul{padding: 0 15px;}
.accordion-section ul li{list-style: inherit;line-height:20px;padding:8px 0px;}
/*----- Section Content -----*/
.accordion-section-content {padding:15px;display:none;}
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
			<div class="row breadcrumb_row mrg_0"><!--marl6-->
				<div class="col-md-12 col-xs-12">
					<ol class="breadcrumb">
						<li class="breadcrumb-item"><a href="index.php">Home</a></li>
						<li class="breadcrumb-item active">Request Status</li>
					</ol>
				</div>
			</div>
			<div class="row">
				<div class="policy_content">
					<div class="col-md-4 content_left">
						<div class="tabs-left left_nav_tab Policy">
							<ul class="nav nav-tabs">
								<li><a href="about.php">About</a></li>
								<li><a href="terms.php">Terms</a></li>
								<li><a href="policy.php">Privacy Policy</a></li>
								<li><a href="copyright.php">Copyright Policy</a></li>
								<li><a href="faq.php">FAQ</a></li>
								<li><a href="support.php">Support</a></li>								
								<li class="active"><a href="requeststatus.php">Request Status</a></li>
								<li><a href="testimonial.php">Testimonial</a></li>
							</ul>
						</div>
					</div>
					
					<div class="col-md-8 tab_conent_bg">
						<div class="tab-content tab_conent_pad">							
																							
							<div class="tab-pane active" id="d">
								<div class="row mrg_0 Policy tab_row_bg">
									<h3 class="Policy_heading">Request Status</h3>
									<hr class="heading_line" />
									<div>
										<strong>1. Request Status</strong><br>
										<p>1.1 All capitalized terms not defined herein shall have such meanings as have been assigned to them respectively in the Terms. The rules of interpretation contained in the Terms shall also apply to this Privacy Policy. This Privacy Policy is at all times required to be read along with the Terms.</p>
										<p>Saatchi Art offers an unparalleled selection of paintings, drawings, sculpture and photography in a range of prices, and it provides artists from around the world with an expertly curated environment in which to exhibit and sell their work.</p>
										<p>Based in Los Angeles, Saatchi Art is redefining the experience of buying and selling art by making it easy, convenient and welcoming for both collectors and artists.</p>
									</div>
								</div>
							</div>
							
							

						</div><!-- /tab-content -->
					</div><!-- /tabbable -->
				</div>
			</div><!-- /row -->
		</div>
	</section>
	<?php require 'footer.php'; ?>	

	<!--Modal Window--->
	<div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
    	
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
	<script>
	jQuery(document).ready(function() {
	function close_accordion_section() {
		jQuery('.accordion .accordion-section-title').removeClass('active');
		jQuery('.accordion .accordion-section-content').slideUp(300).removeClass('open');
	}

	jQuery('.accordion-section-title').click(function(e) {
		// Grab current anchor value
		var currentAttrValue = jQuery(this).attr('href');

		if(jQuery(e.target).is('.active')) {
			close_accordion_section();
		}else {
			close_accordion_section();

			// Add active class to section title
			jQuery(this).addClass('active');
			// Open up the hidden content panel
			jQuery('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
		}

		e.preventDefault();
	});
});
</script>
</body>

</html>