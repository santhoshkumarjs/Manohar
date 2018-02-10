<?php require 'framework/initialise/framework.init.php'; ?>
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
						<li class="breadcrumb-item"><a href="index.html">Home</a></li>
						<li class="breadcrumb-item active">ART</li>
					</ol>
				</div>
			</div>
			<div class="row mrg_0"><!-- marl6-->
				<h2 class="heading"><span>Featured collections</span></h2>
					<p class="subtitle fancy">12345 ORIGINALS LISTED</p>
					<p class="text-center">Whether you are looking for an original abstract painting, a modern art painting, or a limited edition watercolor <br>Whether you are looking for an original abstract painting, a modern art painting, or a limited edition watercolor print signed by the artist, Saatchi Art has over 370,000 original paintings</p>
			</div>
			<div class="row"><!-- mar30-->
				<div class="col-md-4 col-sm-4 pad_left">
					<select id="selectSize" class="filter-options" onchange="window.location = $(this).val();">
						<option value=" ">Size</option>
						<option value=" ">ALL SIZE</option>
						<option value=" ">SMALL</option>
						<option value=" ">MEDIUM</option>
						<option value=" ">LARGE</option>
					</select>
				</div>
				<div class="col-md-4 col-sm-4">
					<select id="selectCategory" class="filter-options" onchange="window.location = $(this).val();">
						<option value="">Category</option>
						<option value=" ">All Categories</option>
						<option value=" ">Digital Art</option>
						<option value=" ">Drawing</option>
						<option value=" ">Drawing</option>
						<option value=" ">Photography</option>
						<option value=" ">Printmaking</option>
						<option value=" ">Sculpture | 3D</o
						<option value=" ">Serigraph</option>
						<option value=" ">Textile</option>
					</select>
				</div>
				<div class="col-md-4 col-sm-4 pad_right">
					<select id="selectStyle" class="filter-options" onchange="window.location = $(this).val();">
						<option value="">Styles</option>
						<option value=" ">All Styles</option>
						<option value=" ">Abstract</option>
						<option value=" ">Art Deco</option>
						<option value=" ">Conceptual</option>
						<option value=" ">Cubism</option>
						<option value=" ">Dada</option>
						<option value=" ">Documentary</option>
						<option value=" ">Expressionism</option>
						<option value=" ">Figurative</option>
						<option value=" ">Fine Art</option>
						<option value=" ">Folk</option>
						<option value=" ">Illustration</option>
					</select>
				</div>
			</div>
			<!-- List grid Image -->
			<div class="row effects clearfix" id="effect-1">
				<div class="wall">
					<div class="wall-item">
						<div class="img">
							<a href="art-inner.html"><img src="images/art/01.jpg" alt="" class="img-responsive"></a>
							<div class="overlay">
								<div class="add_fav">
									<a href="#" data-toggle="tooltip" data-placement="bottom" title="Add&nbsp;to&nbsp;Favourite" class="red-tooltip"><i class="fa fa-heart"></i></a>
								</div>
								<a href="art-inner.html" class="expand">View Art <i class="ti-arrow-circle-right tiarrow"></i></a>
								<!-- <a class="close-overlay hidden">x</a> -->
							</div>
						</div>
						<div class="thirdrow">
							<h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
							<!--<p class="pull-right"><b>$ 32,630</b></p>-->
							<p>by <b>Surendra Pal Singh</b></p>
							<a href="price-request.html" data-toggle="modal" data-target="#submit_form" class="buynow pull-right" >Price on Request</a>
							<p>Painting, 10.7 X 19.5 In</p>
							<p>Watercolor on Paper</p>
						</div>
					</div>
					<div class="wall-item">
						<div class="img">
							<a href="art-inner.html"><img src="images/art/02.jpg" alt="" class="img-responsive"></a>
							<div class="overlay">
								<div class="add_fav">
									<a href="#" data-toggle="tooltip" data-placement="bottom" title="Add&nbsp;to&nbsp;Favourite" class="red-tooltip"><i class="fa fa-heart"></i></a>
								</div>
								<a href="art-inner.html" class="expand">View Art <i class="ti-arrow-circle-right tiarrow"></i></a>
								<!-- <a class="close-overlay hidden">x</a> -->
							</div>
						</div>
						<div class="thirdrow">
							<h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
							<!--<p class="pull-right"><b>$ 32,630</b></p>-->
							<p>by <b>Surendra Pal Singh</b></p>
							<a href="price-request.html" data-toggle="modal" data-target="#submit_form" class="buynow pull-right" >Price on Request</a>
							<p>Painting, 10.7 X 19.5 In</p>
							<p>Watercolor on Paper</p>
						</div>
					</div>
					<div class="wall-item">
						<div class="img">
							<a href="art-inner.html"><img src="images/art/03.jpg" alt="" class="img-responsive"></a>
							<div class="overlay">
								<div class="add_fav">
									<a href="#" data-toggle="tooltip" data-placement="bottom" title="Add&nbsp;to&nbsp;Favourite" class="red-tooltip"><i class="fa fa-heart"></i></a>
								</div>
								<a href="art-inner.html" class="expand">View Art <i class="ti-arrow-circle-right tiarrow"></i></a>
								<!-- <a class="close-overlay hidden">x</a> -->
							</div>
						</div>
						<div class="thirdrow">
							<h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
							<!--<p class="pull-right"><b>$ 32,630</b></p>-->
							<p>by <b>Surendra Pal Singh</b></p>
							<a href="price-request.html" data-toggle="modal" data-target="#submit_form" class="buynow pull-right" >Price on Request</a>
							<p>Painting, 10.7 X 19.5 In</p>
							<p>Watercolor on Paper</p>
						</div>
					</div>
					<div class="wall-item">
						<div class="img">
							<a href="art-inner.html"><img src="images/art/07.jpg" alt="" class="img-responsive"></a>
							<div class="overlay">
								<div class="add_fav">
									<a href="#" data-toggle="tooltip" data-placement="bottom" title="Add&nbsp;to&nbsp;Favourite" class="red-tooltip"><i class="fa fa-heart"></i></a>
								</div>
								<a href="art-inner.html" class="expand">View Art <i class="ti-arrow-circle-right tiarrow"></i></a>
								<!-- <a class="close-overlay hidden">x</a> -->
							</div>
						</div>
						<div class="thirdrow">
							<h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
							<!--<p class="pull-right"><b>$ 32,630</b></p>-->
							<p>by <b>Surendra Pal Singh</b></p>
							<a href="price-request.html" data-toggle="modal" data-target="#submit_form" class="buynow pull-right" >Price on Request</a>
							<p>Painting, 10.7 X 19.5 In</p>
							<p>Watercolor on Paper</p>
						</div>
					</div>
					<div class="wall-item">
						<div class="img">
							<a href="art-inner.html"><img src="images/art/05.jpg" alt="" class="img-responsive"></a>
							<div class="overlay">
								<div class="add_fav">
									<a href="#" data-toggle="tooltip" data-placement="bottom" title="Add&nbsp;to&nbsp;Favourite" class="red-tooltip"><i class="fa fa-heart"></i></a>
								</div>
								<a href="art-inner.html" class="expand">View Art <i class="ti-arrow-circle-right tiarrow"></i></a>
								<!-- <a class="close-overlay hidden">x</a> -->
							</div>
						</div>
						<div class="thirdrow">
							<h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
							<!--<p class="pull-right"><b>$ 32,630</b></p>-->
							<p>by <b>Surendra Pal Singh</b></p>
							<a href="price-request.html" data-toggle="modal" data-target="#submit_form" class="buynow pull-right" >Price on Request</a>
							<p>Painting, 10.7 X 19.5 In</p>
							<p>Watercolor on Paper</p>
						</div>
					</div>
					<div class="wall-item">
						<div class="img">
							<a href="art-inner.html"><img src="images/art/06.jpg" alt="" class="img-responsive"></a>
							<div class="overlay">
								<div class="add_fav">
									<a href="#" data-toggle="tooltip" data-placement="bottom" title="Add&nbsp;to&nbsp;Favourite" class="red-tooltip"><i class="fa fa-heart"></i></a>
								</div>
								<a href="art-inner.html" class="expand">View Art <i class="ti-arrow-circle-right tiarrow"></i></a>
								<!-- <a class="close-overlay hidden">x</a> -->
							</div>
						</div>
						<div class="thirdrow">
							<h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
							<!--<p class="pull-right"><b>$ 32,630</b></p>-->
							<p>by <b>Surendra Pal Singh</b></p>
							<a href="price-request.html" data-toggle="modal" data-target="#submit_form" class="buynow pull-right" >Price on Request</a>
							<p>Painting, 10.7 X 19.5 In</p>
							<p>Watercolor on Paper</p>
						</div>
					</div>
					<div class="wall-item">
						<div class="img">
							<a href="art-inner.html"><img src="images/art/04.jpg" alt="" class="img-responsive"></a>
							<div class="overlay">
								<div class="add_fav">
									<a href="#" data-toggle="tooltip" data-placement="bottom" title="Add&nbsp;to&nbsp;Favourite" class="red-tooltip"><i class="fa fa-heart"></i></a>
								</div>
								<a href="art-inner.html" class="expand">View Art <i class="ti-arrow-circle-right tiarrow"></i></a>
								<!-- <a class="close-overlay hidden">x</a> -->
							</div>
						</div>
						<div class="thirdrow">
							<h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
							<!--<p class="pull-right"><b>$ 32,630</b></p>-->
							<p>by <b>Surendra Pal Singh</b></p>
							<a href="price-request.html" data-toggle="modal" data-target="#submit_form" class="buynow pull-right" >Price on Request</a>
							<p>Painting, 10.7 X 19.5 In</p>
							<p>Watercolor on Paper</p>
						</div>
					</div>
					<div class="wall-item">
						<div class="img">
							<a href="art-inner.html"><img src="images/art/01.jpg" alt="" class="img-responsive"></a>
							<div class="overlay">
								<div class="add_fav">
									<a href="#" data-toggle="tooltip" data-placement="bottom" title="Add&nbsp;to&nbsp;Favourite" class="red-tooltip"><i class="fa fa-heart"></i></a>
								</div>
								<a href="art-inner.html" class="expand">View Art <i class="ti-arrow-circle-right tiarrow"></i></a>
								<!-- <a class="close-overlay hidden">x</a> -->
							</div>
						</div>
						<div class="thirdrow">
							<h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
							<!--<p class="pull-right"><b>$ 32,630</b></p>-->
							<p>by <b>Surendra Pal Singh</b></p>
							<a href="price-request.html" data-toggle="modal" data-target="#submit_form" class="buynow pull-right" >Price on Request</a>
							<p>Painting, 10.7 X 19.5 In</p>
							<p>Watercolor on Paper</p>
						</div>
					</div>
					<div class="wall-item">
						<div class="img">
							<a href="art-inner.html"><img src="images/art/03.jpg" alt="" class="img-responsive"></a>
							<div class="overlay">
								<div class="add_fav">
									<a href="#" data-toggle="tooltip" data-placement="bottom" title="Add&nbsp;to&nbsp;Favourite" class="red-tooltip"><i class="fa fa-heart"></i></a>
								</div>
								<a href="art-inner.html" class="expand">View Art <i class="ti-arrow-circle-right tiarrow"></i></a>
								<!-- <a class="close-overlay hidden">x</a> -->
							</div>
						</div>
						<div class="thirdrow">
							<h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
							<!--<p class="pull-right"><b>$ 32,630</b></p>-->
							<p>by <b>Surendra Pal Singh</b></p>
							<a href="price-request.html" data-toggle="modal" data-target="#submit_form" class="buynow pull-right" >Price on Request</a>
							<p>Painting, 10.7 X 19.5 In</p>
							<p>Watercolor on Paper</p>
						</div>
					</div>
					<div class="wall-item">
						<div class="img">
							<a href="art-inner.html"><img src="images/art/07.jpg" alt="" class="img-responsive"></a>
							<div class="overlay">
								<div class="add_fav">
									<a href="#" data-toggle="tooltip" data-placement="bottom" title="Add&nbsp;to&nbsp;Favourite" class="red-tooltip"><i class="fa fa-heart"></i></a>
								</div>
								<a href="art-inner.html" class="expand">View Art <i class="ti-arrow-circle-right tiarrow"></i></a>
								<!-- <a class="close-overlay hidden">x</a> -->
							</div>
						</div>
						<div class="thirdrow">
							<h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
							<!--<p class="pull-right"><b>$ 32,630</b></p>-->
							<p>by <b>Surendra Pal Singh</b></p>
							<a href="price-request.html" data-toggle="modal" data-target="#submit_form" class="buynow pull-right" >Price on Request</a>
							<p>Painting, 10.7 X 19.5 In</p>
							<p>Watercolor on Paper</p>
						</div>
					</div>
					<div class="wall-item">
						<div class="img">
							<a href="art-inner.html"><img src="images/art/02.jpg" alt="" class="img-responsive"></a>
							<div class="overlay">
								<div class="add_fav">
									<a href="#" data-toggle="tooltip" data-placement="bottom" title="Add&nbsp;to&nbsp;Favourite" class="red-tooltip"><i class="fa fa-heart"></i></a>
								</div>
								<a href="art-inner.html" class="expand">View Art <i class="ti-arrow-circle-right tiarrow"></i></a>
								<!-- <a class="close-overlay hidden">x</a> -->
							</div>
						</div>
						<div class="thirdrow">
							<h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
							<!--<p class="pull-right"><b>$ 32,630</b></p>-->
							<p>by <b>Surendra Pal Singh</b></p>
							<a href="price-request.html" data-toggle="modal" data-target="#submit_form" class="buynow pull-right" >Price on Request</a>
							<p>Painting, 10.7 X 19.5 In</p>
							<p>Watercolor on Paper</p>
						</div>
					</div>
					<div class="wall-item">
						<div class="img">
							<a href="art-inner.html"><img src="images/art/05.jpg" alt="" class="img-responsive"></a>
							<div class="overlay">
								<div class="add_fav">
									<a href="#" data-toggle="tooltip" data-placement="bottom" title="Add&nbsp;to&nbsp;Favourite" class="red-tooltip"><i class="fa fa-heart"></i></a>
								</div>
								<a href="art-inner.html" class="expand">View Art <i class="ti-arrow-circle-right tiarrow"></i></a>
								<!-- <a class="close-overlay hidden">x</a> -->
							</div>
						</div>
						<div class="thirdrow">
							<h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
							<!--<p class="pull-right"><b>$ 32,630</b></p>-->
							<p>by <b>Surendra Pal Singh</b></p>
							<a href="price-request.html" data-toggle="modal" data-target="#submit_form" class="buynow pull-right" >Price on Request</a>
							<p>Painting, 10.7 X 19.5 In</p>
							<p>Watercolor on Paper</p>
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