<?php	require 'framework/initialise/framework.init.php';
    $aid = $request['aid'];
	
	$sql = "select * from artist where id = $aid and status = 'active'";
	$author = $db['master']->getOneRow($sql);	
	$data = $author;
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
		
		<!---Artist header starts --->
		
		<?php require 'artist_header.php'; ?>
		<?php
		/*
			<div class="artist_banner" style="background: #fff;">
				<img class="img-responsive author_banner" src="resources/uploads/artists/<?php echo $author['bannerimage'];?> " alt="artworks" title="art works"/>
				<div class="container-fulid">
					<div class="container" >
						<div class="banner_content">
							<div class="col-md-2 padd0">
<img class="artist_image" src="resources/uploads/artists/<?php echo $author['image']; ?>" alt="<?php echo $author['name']; ?>" title="<?php echo $author['name']; ?>">		
							</div>
							<div class="col-md-10 artist_detail padd0">
     <p class="artist_content"><b><?php echo $author['name']; ?></b> – Born in <?php echo $author['dob'];?> at <?php echo $author['city'].",".$author['state']; ?> </br>Based in <?php echo ucfirst($author['country']); ?></br></p>								
	<ul class="social_media padd0" >
		<li class="circle artist_follow">
		<a href="<?php echo $author['facebook']; ?>" title="facebook" target="blank"><i class="ti-facebook"></i></a></li>
		<li class="circle artist_follow"><a href="<?php echo $author['twitter']; ?>" title="twitter" target="blank">
		<i class="ti-twitter-alt"></i></a></li>
		<li class="circle artist_follow"><a href="<?php echo $author['googleplus']; ?>" title="google+" target="blank">
		<i class="ti-google"></i></a></li>
		<li class="circle artist_follow"><a href="<?php echo $author['printrest']; ?>" title="pinterest" target="blank">
		<i class="ti-pinterest"></i></a></li>
	</ul>
								<div class="viewall mobile-view" ><a href="artist.php">VIEW ALL</a></div>
							</div>
						</div>
					</div>
					<div class="clearfix"></div>
					<div class="nav_step">
						<div class="viewall web-view"><a href="artist.php">VIEW ALL</a></div>
						<div class="container padd0">
							<ul id="tabs">
								<li><a href="author.php?id=<?php echo $aid; ?>">Overview</a></li>
								<li><a href="sale.php?aid=<?php echo $aid; ?>">Artworks for sale</a></li>
								<li><a href="sold.php?aid=<?php echo $aid; ?>">Sold Artworks</a></li>
								<li class="active"><a href="spfe.php?aid=<?php echo $aid; ?>">Special Features</a></li>
							</ul>
						</div>
					</div>			
				</div>
			</div> */ ?>
			<!---- Artist header ends here --->
			
			
			
			<div class="artist_bio">
				<div id="content">
	
					<div id="tab3" class="container">
						<div class="container text-center">
							<h1 class="soon" > Coming Soon !!! </h1>
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
	<script>/*
	 wow = new WOW(
	 {
	
		}	) 
		.init();
	</script>
	<script>
		$('.wall').jaliswall({item:'.wall-item'});
	</script>
<script>
    function resetTabs(){
        $("#content > div").hide(); //Hide all content
        $("#tabs a").attr("id",""); //Reset id's      
    }

    var myUrl = window.location.href; //get URL
    var myUrlTab = myUrl.substring(myUrl.indexOf("#")); // For localhost/tabs.html#tab2, myUrlTab = #tab2     
    var myUrlTabName = myUrlTab.substring(0,4); // For the above example, myUrlTabName = #tab

    (function(){
        $("#content > div").hide(); // Initially hide all content
        $("#tabs li:first a").attr("id","current"); // Activate first tab
        $("#content > div:first").fadeIn(); // Show first tab content
        
        $("#tabs a").on("click",function(e) {
            e.preventDefault();
            if ($(this).attr("id") == "current"){ //detection for current tab
             return       
            }
            else{             
            resetTabs();
            $(this).attr("id","current"); // Activate this
            $($(this).attr('name')).fadeIn(); // Show content for current tab
            }
        });

        for (i = 1; i <= $("#tabs li").length; i++) {
          if (myUrlTab == myUrlTabName + i) {
              resetTabs();
              $("a[name='"+myUrlTab+"']").attr("id","current"); // Activate url tab
              $(myUrlTab).fadeIn(); // Show url tab content        
          }
        }
    })()*/
  </script> 
	
</body>

</html>