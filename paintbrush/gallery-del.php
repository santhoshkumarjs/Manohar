<?php require 'framework/initialise/framework.init.php'; 
	  require 'functions.php';
	  
	  $cat_sql = "select id, name, description from category where status = 'active'";
	  $cat_data = $db['master']->getResults($cat_sql);
	 // print_r($cat_data);	  
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
	<link rel="stylesheet" type="text/css" href="resources/css/elastic_grid.min.css" />
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<script src="resources/js/collection/jquery.min.js"></script>
	<script src="resources/js/collection/modernizr.custom.js"></script>
	<script src="resources/js/collection/classie.js"></script>	
	
	<script type="text/javascript" src="resources/js/collection/elastic_grid.min.js"></script>
	<!---
	<script type="text/javascript" src="resources/js/collection/elastic_grid.js"></script>	
	<script type="text/javascript" src="resources/js/collection/jquery.elastislide.js"></script>
	<script type="text/javascript" src="resources/js/collection/jquery.hoverdir.js"></script>
	-->

	
	<script>
	$( document ).ready(function() {
 
    $('.thumbnails').hover(
        function(){
            $(this).find('.caption').slideDown(300); //.fadeIn(250)
			$(this).find('.buynow').css("display","block"); //.fadeIn(250)
        },
        function(){
            $(this).find('.caption').slideUp(200); //.fadeOut(205)
			$(this).find('.buynow').css("display","none"); //.fadeIn(250)
        }
    ); 
	$(".btn-pref .btn").click(function () {
    $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
    // $(".tab").addClass("active"); // instead of this do the below 
    $(this).removeClass("btn-default").addClass("btn-primary");   
});
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
			<div class="row breadcrumb_row mrg_0">
				<div class="col-md-12 col-xs-12">
					<ol class="breadcrumb">
						<li class="breadcrumb-item"><a href="index.html">Home</a></li>
						<li class="breadcrumb-item  active">Gallery</li>
						
					</ol>
				</div>
			</div>
			<div class="row mrg_0">
				<h2 class="heading"><span>GALLERY</span></h2>
				<p class="subtitle fancy">50 ORIGINALS LISTED</p>
				<p class="text-center">Whether you are looking for an original abstract painting, a modern art painting, or a limited edition watercolor <br>Whether you are looking for an original abstract painting, a modern art painting, or a limited edition watercolor print signed by the artist, Saatchi Art has over 370,000 original paintings</p>
			</div>
			<div class="row">
				<div id="elastic_grid_demo"></div>
			</div>
		</div>
	</section>		
     <?php require 'footer.php'; ?>
	<!--Modal Window--->
	<div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;"></div>
	
	<div class="modal fade" id="theModal" tabindex="" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
		</div>
	</div>
	<a href="#header" class="scrollup"><i class="fa fa-chevron-up"></i></a>	
	<script src="resources/js/bootstrap.min.js"></script>
	<script src="resources/js/jquery.scrollUp.min.js"></script>
	<script src="resources/js/main.js"></script>
	<script src="resources/js/wow.min.js"></script>
	<script>
	wow = new WOW(
	{		}	) 
	.init();
		
	new GridScrollFx( document.getElementById( 'grid' ), {
			viewportFactor : 0.4
		} );
	</script>
	<script type="text/javascript">
    $(function(){
        $("#elastic_grid_demo").elastic_grid({
            'showAllText' : 'All',
            'filterEffect': 'popup', // moveup, scaleup, fallperspective, fly, flip, helix , popup
            'hoverDirection': true,
            'hoverDelay': 0,
            'hoverInverse': false,
            'expandingSpeed': 500,
            'expandingHeight': 500,
            'items' :
            [
			<?php foreach($cat_data as $category){
					$products = getAllProductByCategory($category['id']);	
					$total_products = count($products);
					if($total_products < 1) continue;
			?>
                {
                    'title'         : '<?php echo $category['name']; ?>',
					'captiontext' 	: '<?php echo $total_products; ?>'+' Collections',
                    'description'   : '<?php echo addslashes($category['description']); ?>',					
                    'thumbnail'     : [
					<?php foreach($products as $prod){ ?>
					'resources/uploads/products/thumb/<?php echo $prod['thumbImage']; ?>',
					<?php } ?>					
					],					
                    'large'         : [
					<?php foreach($products as $prod){ ?>
					'resources/uploads/products/large/<?php echo $prod['image']; ?>',
					<?php } ?>											
					],
                    'img_title'     : [
					<?php foreach($products as $prod){ ?>
					'<?php echo $prod['name']; ?>',
					<?php } ?>																
					],
                  'prodID'    : [
					<?php foreach($products as $prod){ ?>
					'<?php echo $prod['id']; ?>',
					<?php } ?>																
					],					
                    'button_list'   :
                    [
                        { 'title':'More', 'url' : 'product.php?id=<?php echo $products[0]['id']; ?>', 'new_window' : false }						
                    ],
                    'tags'          : ['Dewashish Das']
                },
			<?php } ?>	
            ]
        });
    });
</script>

<script>
function changedetail(prodid){
	$(".link-button").attr("href", "product.php?id="+prodid)  ;
}

</script>

	
</body>

</html>