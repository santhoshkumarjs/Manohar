<?php	require 'framework/initialise/framework.init.php'; 
		require 'functions.php'; 
    $sql = "select id,name,image from artist where status = 'active'";
	$data = $db['master']->getResults($sql);
	//print_r($data); exit;
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
	<link rel="stylesheet" type="text/resources/css" href="resources/css/elastic_grid.min.css" />
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<style>
	.padtopleft{padding:100px 50px;}
	.portfolio-item .portfolio-desc-product .folio-info h5{font-size:24px !important;}
	.portfolio-item .portfolio-desc-product .folio-info p{font-size:16px !important;}
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
						<li class="breadcrumb-item  active">Artist</li>
						
					</ol>
				</div>
			</div>
			<div class="row mrg_0">
				<h2 class="heading"><span>Artist</span></h2>
					<p class="subtitle fancy">View all Artists</p>
					<p class="text-center">An extensive list of modern and contemporary indian artists are associated with us as we promote indian art and artist to art lovers and art collectors across the globe.<br>Here is an interesting assimilation of all the artists associated with us. Explore their styles, know more about them by browsing across thousands of unique art styles and textures !!</p>
			</div>
			
			<div class="row mrg_0">
				<div class="recommended_items box-shadow padd0">
					<div class="portfolio-items isotopeWrapper"><!--clearfix-->
<?php $i = 1;
  foreach($data as $artist){ 
	//if($i % 3 == 1){ echo '<div class="portfolio-items isotopeWrapper">'; } ?>

						<article class="col-md-4 col-sm-6 isotopeItem webdesign wow bounceIn">
							<a href="author.php?id=<?php echo $artist['id']; ?>">
								<div class="portfolio-item">
									<div>
										<img src="resources/uploads/artists/<?php echo $artist['image']; ?>" alt="" />
									</div>
									<div class="caption-text">
										<h3 style="margin:0px;"><?php echo $artist['name']; ?></h3>
										
									</div>
									<div class="portfolio-desc-product padtopleft">
										<div class="folio-info">
											<h5><?php echo $artist['name']; ?></h5>
											<p><?php echo getCountByAuthor($artist['id']); ?> Artworks</p>
										</div>	
									</div>
								</div>
							</a>
						</article>
<?php //if($i % 3 == 0) echo '</div>';
$i++;
 } ?>						
					</div>
				</div>
			</div>
			
		</div>
	</section>		
   <?php require 'footer.php'; ?>
	<!--Modal Window--->
	<div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
    	
	</div>
	<a href="#header" class="scrollup"><i class="fa fa-chevron-up"></i></a>	
	
	<script src="resources/js/modernizr-2.6.2-respond-1.1.0.min.js"></script>
	<script src="resources/js/jquery.js"></script>
	<script src="resources/js/bootstrap.min.js"></script>
	<script src="resources/js/jquery.scrollUp.min.js"></script>
	<script src="resources/js/main.js"></script>
	<script src="resources/js/hallooou.js"></script>
	<script src="resources/js/smoothScroll.js"></script>
	<script src="resources/js/jquery.scrollTo-1.4.3.1-min.js"></script>
	<script src="resources/js/wow.min.js"></script>
	<script>
	wow = new WOW(
	{		}	) 
	.init();
		
	new GridScrollFx( document.getElementById( 'grid' ), {
			viewportFactor : 0.4
		} );
	</script>
	
	
</body>

</html>