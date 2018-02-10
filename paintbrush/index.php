<?php	require 'framework/initialise/framework.init.php'; 
		require 'functions.php';
		$_SESSION['prev_page'] = 'index.php'; //basename($_SERVER['REQUEST_URI']);
        $feature_sql = "select * from product where featured = 'yes' and status = 'active' and quantity != 0 limit 5";
		$feature_data = $db['master']->getResults($feature_sql);
		
        $new_sql = "select * from product where status = 'active' and quantity != 0 and new_status = 1 order by id desc limit 5 ";
		$new_data = $db['master']->getResults($new_sql);

        $banner_sql = "select * from banner where status = 'active' and show_status = 'active'";
		$banner_data = $db['master']->getResults($banner_sql);
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
	<link href="resources/css/indexpage.css" rel="stylesheet">
	<!--<link href="css/style.css" rel="stylesheet">-->
	<link href="resources/css/style_002.css" rel="stylesheet">
	<link href="resources/css/subscribe-better.css" rel="stylesheet" media="screen" />
	<link href="resources/css/responsive.css" rel="stylesheet">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<script src="resources/js/jquery-1.11.0.min.js"></script>
	<script type="text/javascript">
	$(document).ready(function() {
		$("#popup").css({"display":"block"});
		$("#popfadelogin").css({"display":"block"});
			
	   
		$('body').delegate('#btnclose','click',function(){
			$("#popup").hide();
			$("#popfadelogin").hide();
		});		
	});

</script>
</head><!--/head-->
<body id="home">
<?php require 'topnav.php'; ?>
	<div class="row">
		<?php require 'sidesocialbar.php'; ?>
	</div>
	<div class="clearfix"></div>
	<section id="slider">
		<!-- Carousel -->
		<div id="myCarousel" class="carousel slide" data-ride="carousel">
			<div class="carousel-inner" role="listbox">
				<div class="item active">
					<a href="#">
					<img class="img-responsive slides" src="resources/uploads/banner/<?php echo $banner_data[0]['image']; ?>" alt="First slide" style=""/></a>
				</div>
				
				<?php for($i=1; $i<count($banner_data); $i++){ ?>
				<div class="item">
					<a href="#"><img class="second-slide img-responsive slides" src="resources/uploads/banner/<?php echo $banner_data[$i]['image']; ?>" alt="Second slide" style=""> </a>
				</div>
				<?php } ?>				
			</div>
			<a data-app-prevent-settings="" class="left carousel-control top50" role="button" data-slide="prev" href="#myCarousel">
					<span class="ti-arrow-circle-left" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a data-app-prevent-settings="" class="right carousel-control top50" role="button" data-slide="next" href="#myCarousel">
                    <span class="ti-arrow-circle-right" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
		</div><!-- /.carousel -->
	</section><!--/slider-->
	<!-- New Arrivals -->
	<section>
		<div class="container-fluid productlist">
	<div class="row">
		<div class="col-sm-12">
			<h2 class="product-title1">Featured collections 
			<a href="art.php?type=feature" class="btn btn-default add-to-cart pull-right">View All</a></h2>
		</div>
	</div>
	
<div class="row">
<?php foreach($feature_data as $i => $fdata){ 
	$col_class = 'col-md-4 ';
	if($i == 0) {
		$col_class = 'col-md-8 ';
	}

?>	
<div class="<?php echo $col_class ?> col-sm-6 ban">
<a href="product.php?id=<?php echo $fdata['id']; ?>">
	<div class="image" style="background:url('resources/uploads/products/thumb/<?php echo $fdata['thumbImage']; ?>');">
	<div class="ban_wrap">
	  <h2><?php echo ucfirst($fdata['artType']); ?></h2>
	  <h3><?php echo getStyleByID($fdata['style']); ?></h3>
	 <div class="shop_now"><span>Shop now!</span></div>
	</div>
	</div>
</a>
</div>
<?php } ?>				
</div>

<div class="row">
	<div class="col-sm-12">
		<h2 class="product-title1">NEW ARRIVALS 
		<a href="art.php?type=new" class="btn btn-default add-to-cart pull-right">View All</a></h2>
	</div></div>
	<div class="row">
	
<?php foreach($new_data as $i => $ndata){ 
	$col_class = 'col-md-4 ';
	if($i == 4) {
		$col_class = 'col-md-8 ';
	}
?>
<div class="<?php echo $col_class ?> col-sm-6 ban">
<div class="product-img">
	<a href="product.php?id=<?php echo $ndata['id']; ?>">		
		<div class="image" style="background:url('resources/uploads/products/thumb/<?php echo $ndata['thumbImage']; ?>');">	
		<span class="productlist-title-container">
			<span class="product-titletext">
				<span class="price1"><?php echo $ndata['name']; ?></span>
			</span>
		</span>
	    </div>	
	</a>
		
<a class="product-review" href="product.php?id=<?php echo $ndata['id']; ?>"><i class="ti-eye"></i>View Details</a>
<?php if(isset($_SESSION['user_id'])){ ?>
<a class="add-to-cart1" id="pr<?php echo $ndata['id']; ?>" href="price-request.php?id=<?php echo $ndata['id']; ?>&code=<?php echo urlencode($ndata['code']);?>" data-toggle="modal" data-target="#submit_form"><i class="ti-money" ></i>Price On Request</a>
<?php }else{ ?>
<a class="add-to-cart1" href="login.php?id=<?php echo $ndata['id']; ?>" data-toggle="modal" data-target="#login-modal"><i class="ti-money" ></i>Price On Request</a>
<?php }	?>
		
	</div>
</div>
<?php } ?>	
					
			</div>					
				</div>
	</section>
	
<?php require 'footer.php'; ?>
	
		<div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
			
		</div>
		<div class="modal fade" id="submit_form" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
			
		</div>
	<a href="#header" class="scrollup"><i class="fa fa-chevron-up"></i></a>	
	<script src="resources/js/modernizr-2.6.2-respond-1.1.0.min.js"></script>
    <script src="resources/js/jquery.js"></script>
	<script src="resources/js/bootstrap.min.js"></script>
	<script src="resources/js/jquery.scrollUp.min.js"></script>
	<script src="resources/js/jquery.isotope.min.js"></script>
	<script src="resources/js/jquery.subscribe-better.js"></script>
	<script src="resources/js/main.js"></script>
	<script src="resources/js/hallooou.js"></script>
	<script src="resources/js/smoothScroll.js"></script>
	<script src="resources/js/jquery.scrollTo-1.4.3.1-min.js"></script>
	<script src="resources/js/wow.min.js"></script>
	<script>
	 wow = new WOW(
	 {
	
		}	) 
		.init();
		
<?php if($_SESSION['pr']){ ?>          
	$("#"+"<?php echo $_SESSION['pr']; ?>").trigger("click");
<?php unset($_SESSION['pr']);  } ?>		

</script>
	
</body>

</html>