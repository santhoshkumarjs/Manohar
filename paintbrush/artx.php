<?php require 'framework/initialise/framework.init.php'; 
	  require 'functions.php';
$catID = $request['cid'];

$cat_sql = "select * from category where id = $catID";
$cat_data = $db['master']->getOneRow($cat_sql);	 

$cat_all_sql = "select * from category where status = 'active'";
$cat_all_data = $db['master']->getResults($cat_all_sql);	 

$style_sql = "select * from style where status = 'active'";
$style_data = $db['master']->getResults($style_sql);
if($catID != ""){
	$product_sql = "select * from product where categoryId = '".$catID."' and status = 'active'";
	$title = $cat_data['name'];	
}else{
	$product_sql = "select * from product where status = 'active'";	
	$title = "Art Works";		
}
if($request['type'] == "feature"){
	$product_sql = "select * from product where featured = 'yes' and status = 'active'";
	$title = "Featured Collections";
}
if($request['type'] == "new"){
	$product_sql = "select * from product where status = 'active' order by id desc limit 6";
	$title = "New Arrivals";
}
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
						<li class="breadcrumb-item active"><?php echo $title; ?></li>
					</ol>
				</div>
			</div>
			<div class="row mrg_0"><!-- marl6-->				
					<?php if($total_product > 0){ ?>
					
		<div id="headtext">
		<h2 class="heading"><span><?php echo $title; ?></span></h2>
					   <p class="subtitle fancy"><?php echo $total_product; ?> ORIGINALS LISTED</p>
					   <p class="text-center"><?php echo $cat_data['description']; ?></p>
					<?php }else{ ?>
					   <p style="padding-top:50px" class="subtitle fancy">NO DATA FOUND</p>
					<?php } ?> 
		</div>
			</div>
			<div style="margin-top:25px; display:none;" id="searchspace"></div>
			
<?php if($total_product > 0){ ?>		
			<div class="row">
				<div class="col-md-4 col-sm-4 pad_left">
					<select id="selectSize" class="filter-options" selected="selected">
						<option value=" ">Size</option>
						<option value="">ALL SIZE</option>
						<option value="small">SMALL</option>
						<option value="medium">MEDIUM</option>
						<option value="large">LARGE</option>
					</select>
				</div>
				<div class="col-md-4 col-sm-4">
					<select id="selectCategory" class="filter-options">
						<option value="" selected="selected">Category</option>
						<option value=" ">All Categories</option>
						<?php foreach($cat_all_data as $cadata){ ?>
							<option value="<?php echo $cadata['id']; ?>"> 
							<?php echo $cadata['name']; ?> </option>
						<?php } ?>	

					</select>
				</div>
				<div class="col-md-4 col-sm-4 pad_right">
					<select id="selectStyle" class="filter-options">
						<option value="" selected="selected">Styles</option>
						<option value=" ">All Styles</option>
						<?php foreach($style_data as $sdata){ ?>						
							<option value="<?php echo $sdata['id']; ?>"><?php echo $sdata['name']; ?></option>
						<?php } ?>							
					</select>
				</div>
			</div>
<?php } ?>			
			<!-- List grid Image -->
			<div class="row effects clearfix" id="effect-1">
				<div class="wall" id="product_data">
				
		<?php $i = 0;
		foreach($product_data as $pdata){  
		$i++;
		if($i == 24) break;
		?>				
					<div class="wall-item">
						<div class="img">
							<a href="product.php?id=<?php echo $pdata['id'];?>"><img src="resources/uploads/products/thumb/<?php echo $pdata['thumbImage']; ?>" alt="" class="img-responsive"></a>
							<div class="overlay">
				<!--
					<div class="add_fav">
						<a href="#" data-toggle="tooltip" data-placement="bottom" title="Add&nbsp;to&nbsp;Favourite" class="red-tooltip" >
						<i class="fa fa-heart"></i></a>
					</div>-->
								
								<a href="product.php?id=<?php echo $pdata['id'];?>"" class="expand">View Art <i class="ti-arrow-circle-right tiarrow"></i></a>
								<!-- <a class="close-overlay hidden">x</a> -->
							</div>
						</div>
						<div class="thirdrow">
							<h4><?php echo $pdata['name']; ?></h4>
							<p class="pull-right">Code: <b><?php echo $pdata['code']; ?></b></p>
							<p>by <b><?php echo getArtistByID($pdata['artistid']);?></b></p>
							<a href="price-request.php?id=<?php echo $pdata['id']; ?>&code=<?php echo urlencode($pdata['code']);?>" data-toggle="modal" data-target="#submit_form" class="buynow pull-right" >Price On Request</a>
							<p><?php echo $title.', '.$pdata['size']; ?></p>
							<p><?php echo $title.' on '.$pdata['artType']; ?></p>
						</div>
					</div>				
<?php } ?>				
				</div>
			</div>
		</div>
	</section>
	
	
<a href="javascript://" onclick="addmore();">add</a>

<div id="xappend" style="display:none">
<div class="wall-item">
<div class="img">
<a href="product.php?id=14"><img src="resources/uploads/products/thumb/2017072112405410_science_big.png" alt="" class="img-responsive"></a>
<div class="overlay">								
	<a href="product.php?id=14" "="" class="expand">View Art <i class="ti-arrow-circle-right tiarrow"></i></a>
</div>
</div>
<div class="thirdrow">
<h4>Landscape</h4>
<p class="pull-right">Code: <b>c-005</b></p>
<p>by <b>sandar paul</b></p>
<a href="price-request.php?id=14&amp;code=c-005" data-toggle="modal" data-target="#submit_form" class="buynow pull-right">Price On Request</a>
<p>Art Works, 20*30</p>
<p>Art Works on oil type</p>
</div>
</div>
</div>

<script>
function addmore(){
    data = $("#xappend").html();
	$("#product_data").append(data);	
	 wow = new WOW(
	 {	}	) 
		.init();	

$('.wall').jaliswall({
  
  // item classname
  item : '.wall-item',

  // column classname
  columnClass : '.wall-column'
  
});		

}
</script>


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
	 {	}	) 
		.init();
	</script>
	<script>//$('.wall').jaliswall({item:'.wall-item'});
	$('.wall').jaliswall({
  
  // item classname
  item : '.wall-item',

  // column classname
  columnClass : '.wall-column'
  
});
	</script>
<script>
$("#selectSize").change(function(){
	size = $("#selectSize").val();
	category = $("#selectCategory").val();
	style = $("#selectStyle").val();
	filter(size, category, style);
});	
$("#selectCategory").change(function(){
	size = $("#selectSize").val();
	category = $("#selectCategory").val();
	style = $("#selectStyle").val();
	filter(size, category, style);
});
$("#selectStyle").change(function(){
	size = $("#selectSize").val();
	category = $("#selectCategory").val();
	style = $("#selectStyle").val();
	filter(size, category, style);
});
function filter(size, categoryid, style){
	$("#headtext").hide();
	$("#searchspace").show();
	//alert(size+'.'+category+'z'+style);
		$.ajax({
			url		: "ajax/art_ajax.php?cid="+categoryid+"&size="+size+"&style="+style, 					
			success: function(result){
				$('#product_data').html(result);				
			}
		});		
}
</script>
<script>
function favorite(pid){
	    var userid = "<?php echo $_SESSION['user_id']; ?>";		
		$.ajax({
			url		: "ajax/add.php?productid="+pid+"&userid="+userid+"&type=addtofavorite", 
			dataType: "json",				
			success: function(result){				
				alert('success');
			}
		});
}
</script>	
	
	
</body>

</html>