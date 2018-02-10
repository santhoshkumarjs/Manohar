<?php require 'framework/initialise/framework.init.php'; 
require 'functions.php'; 
//print_r($_SESSION);
$id = $request['id']; 
$_SESSION['prev_page'] = basename($_SERVER['REQUEST_URI']);
  
$sql = "select * from product where id = $id";
$data = $db['master']->getOneRow($sql);
//print_r($data); exit;
$categoryid = $data['categoryid'];

$viewCountSql = "update product set noOfViews = noOfViews + 1";
$viewUpdate = $db['master']->query($viewCountSql);

$artistName = getArtistByID($data['artistid']);

$rel_sql = "select * from product where categoryid = ".$categoryid." and quantity != 0 and id != $id  limit 5";
$rel_prod = $db['master']->getResults($rel_sql);

$paper_query = "select id, size, type from printsize where productid = $id and status = 'active' and type='paper' ";
$printpaper = $db['master']->getResults($paper_query);

$canvas_query = "select id, size, type from printsize where productid = $id and status = 'active' and type='canvas' ";
$printcanvas = $db['master']->getResults($canvas_query);

if(isset($_SESSION['user_id'])){
  $favorite_status = getFavoriteStatus($id, $_SESSION['user_id']); 
}
$fav_count = getFavoriteCount($id);
 //echo basename($_SERVER['REQUEST_URI']); exit;
//print_r($printsizes); exit;
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
	<link href="resources/css/product_pop.css" rel="stylesheet">
	<script src="resources/js/jquery-1.11.0.min.js"></script>	
	<!--<script src="resources/js/jquery.spzoom.js"></script>-->
	<!--<link rel="stylesheet" media="screen" href="resources/css/zoomple.css" type="text/css" />-->
<script>
$( document ).ready(function() {

    $(function () {
        $('.mm_tooltip').tooltip({
            selector: "[data-toggle=tooltip]",
            container: "body"
        })
    }); 

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
	$('.orbit-container').hover(
        function(){
			$(this).find('.like_add').css("display","block"); //.fadeIn(250)
        },
        function(){
			$(this).find('.like_add').css("display","none"); //.fadeIn(250)
        }
    );
	$(".btn-pref .btn").click(function () {
    $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
    // $(".tab").addClass("active"); // instead of this do the below 
    $(this).removeClass("btn-default").addClass("btn-primary");   
	});
	
	/* quantity Add */
	$('.qtyplus').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
		console.log(fieldName);
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If is not undefined
        if (!isNaN(currentVal)) {
            // Increment
            $('input[name='+fieldName+']').val(currentVal + 1);
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(0);
        }
    });
    // This button will decrement the value till 0
    $(".qtyminus").click(function(e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If it isn't undefined or its greater than 0
        if (!isNaN(currentVal) && currentVal > 0) {
            // Decrement one
            $('input[name='+fieldName+']').val(currentVal - 1);
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(0);
        }
    });
	/* quantity Add End */
});

	$(document).ready(function(){
		$(".like_add a").tooltip();
	});
	
</script>
<script type="text/javascript">
function yesnoCheck() {
    if (document.getElementById('yesCheck').checked) {
        document.getElementById('print_tab1').style.display = 'block';
        document.getElementById('print_tab2').style.display = 'none';
    } 
    else if(document.getElementById('noCheck').checked) {
        document.getElementById('print_tab2').style.display = 'block';
        document.getElementById('print_tab1').style.display = 'none';
   }
}
</script>
<style>
	.tab-title h4{margin: 0px;}
		.tab-title p{padding: 15px 0px 0px 0px;margin: 0px;}
		.question-col li {
			overflow: hidden;
			display: block;
			padding: 5px 10px !important;
			font-size: 14px;
			margin:0px !important;
		}
		.well {
			background-color: #fff;
			border-radius: 0px !important;
			border: 0px !important;
			box-shadow: none;
			margin-bottom: 0px;
			height: 100% !important;
			width: 100%;
			padding: 0px !important;
		}
		.billing_add li:hover {
			background: #fff;
			color: #333;
			/*border-bottom: 1px solid #b60801 !important;*/
		}
		.tab2-para{padding:0px;}
		.tab2-para h4{padding: 11px;margin: 0px;font-size:18px;}
		.para_heading{border-bottom: 2px solid #fff;}
		.billing_add li{border-bottom: 1px solid #f3f3f3 !important;}
		.qtyminus, .qtyplus, .qty{line-height: 0px !important;}
		.inner-image{position:absolute;}
		.inner-image img{position:relative;left: 200px;top: 30px;width: 150px;border: 5px solid #000;padding:5px;}
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
				<!--art-detail-breadcrumb-->
				<div class="col-md-12 col-xs-12">
					<ol class="breadcrumb">
						<li class="breadcrumb-item"><a href="index.php">Home</a></li>
						<li class="breadcrumb-item">
						<a href="art.php?cid=<?php echo $categoryid; ?>">
						<?php echo getCategoryByID($categoryid); ?>
						</a></li>
						<li class="breadcrumb-item active"><?php echo $data['name']; ?></li>
					</ol>
				</div>
			</div>
		</div>
	</section>
	
	<div class="container">	
		<div class="row mrg_0"><!-- art-row--me-->
			<article class="art-detail" itemscope="" itemtype="">
				<div role="main">
					<!-- art-detail-body -->
					<div class="art-detail-body">
						<div class="row mrg_0">

<div class="col-md-1 col-sm-2 pad15">
<ul class="list-unstyled text-center">
	<li class="col-md-12 col-xs-4 col-sm-12">
		<a href="javascript://" onclick="tab1();">
		<img width="80" height="80" src="resources/uploads/products/thumb/<?php echo $data['thumbImage']; ?>" alt=""/></a>
	</li>
	<li class="col-md-12 col-xs-4 col-sm-12">
		<a href="javascript://" onclick="tab2();">
		<img src="resources/images/art_inner/art-on-wall-click.jpg" alt=""/></a>
	</li>
<?php if($data['videoImage'] != ""){ ?>	
	<li class="col-md-12 col-xs-4 col-sm-12">
		<a href="javascript://" onclick="tab3();">
	<img src="resources/images/art_inner/art-on-video.jpg" alt=""/></a>
	</li>
<?php } ?>	
</ul>
</div>	
							
	<div class="col-xs-12 col-md-6 col-sm-10" id="tab1">
		<div class="orbit-container">
		
			<div class="thumb-image"> <img src="resources/uploads/products/large/<?php echo $data['image']; ?>" data-imagezoom="true" data-zoomviewborder="1px solid #000" data-cursor="none" data-cursorcolor="52,152,219" data-opacity="0.9"> </div>
			
				<?php if(isset($_SESSION['user_id'])){
				if($favorite_status != 1 ){ ?>
				<div class="like_add">				
					<a href="#" id="fav_icon" data-toggle="tooltip" data-placement="bottom" title="Add&nbsp;to&nbsp;Favourite" class="red-tooltip" onclick="favorite(<?php echo $data['id']; ?>);">
					<i class="fa fa-heart"></i></a>
				</div><?php }} ?>
		</div>
	</div>
							
	<div class="col-xs-12 col-md-6 col-sm-10" id="tab2" style="display:none">
		<div class="orbit-container">
				<div class="inner-image">
				<img src="resources/uploads/products/thumb/<?php echo $data['thumbImage']; ?>" alt=""/></div>
				<img src="resources/images/art_inner/art-on-wall_new.jpg" alt="" itemprop="image" class="img-responsive" id="switcher" />
				<!--
				<div class="like_add">
					<a href="#" data-toggle="tooltip" data-placement="bottom" title="Add&nbsp;to&nbsp;Favourite" class="red-tooltip"><i class="fa fa-heart"></i></a>
				</div>-->
		</div>
	</div>
<?php if($data['videoImage'] != ""){ ?>		
<div class="col-xs-12 col-md-6 col-sm-10" id="tab3" style="display:none">
	<div class="orbit-container">		
<video controls style="width:100%;">
	<source src="resources/uploads/products/video/<?php echo $data['videoImage']; ?>" type="video/mp4">
</video>
	</div>
</div>
<?php } ?>

<div class="col-md-5 col-xs-12 col-sm-12 martop15">
<div class="tab-title">
	<h4><?php echo $data['name']; ?></h4>
	<p class="pull-right">Code: <b><?php echo $data['code']; ?></b></p>
	<p>By <b>
	<a href="author.php?id=<?php echo $data['artistid'];?>">
	<?php echo $artistName; ?></a></b></p>
	<p>Art Type: <b><?php echo $data['artType']; ?></b></p>
	<p>Original Artwork<br><?php echo $data['artSize'].' '.$data['size']; ?></p>
</div>
<form  role="form">
	<fieldset>
		<ul class="question-col billing_add" style="padding:0px 0px 0px">
			<li class="col-md-6 col-sm-6  col-xs-12" style="margin:0px">
				<label>
					<input  checked="checked" type="radio" onclick="javascript:yesnoCheck();" name="yesno" id="yesCheck"/>
					<span class="lbl padding-8">Print on Paper</span>
				</label>
			</li>
			<li class="col-md-6 col-sm-6  col-xs-12" style="margin:0px">
				<label>
					<input type="radio" onclick="javascript:yesnoCheck();" name="yesno" id="noCheck"/>
					<span class="lbl padding-8">Print on Canvas</span>
				</label>
			</li>
		</ul>
	</fieldset>		
</form>
<div class="well">
	<div class="tab-content">
		<div class="tab-pane fade in active" id="print_tab1">
			<div class="tab2-para padd0">
				<div class="para_heading">
					<div class="col-sm-6 " style="padding:0px;">
						<h4>Print on Paper</h4>
					</div>
					<div class="col-sm-6 ">
						<form id='myform' method='POST' action='#'>
							<label>QTY : </label>
							<input type='button' value='-' class='qtyminus' field='quantity1' />
							<input type='text' name='quantity1' value='0' class='qty' />
							<input type='button' value='+' class='qtyplus' field='quantity1' />
						</form>
					</div>
					<div class="clearfix"></div>
				</div>
				<form  role="form">
					<fieldset>
						<?php 
							if(!empty($printpaper)) { ?>
								<ul class="question-col billing_add" style="padding:0px">
								<?php foreach($printpaper as $ps){   ?>
									<li class="col-md-12 col-sm-6  col-xs-12">							
										<label>
											<input checked="checked" name="radio" type="radio">
											<span class="lbl padding-8"><?php echo $ps['size']; ?></span>
										</label>
									</li>
								<?php } ?>
								</ul>	
						<?php } else { 
								echo "<h5 style='margin-left:10px'>No Size defined</h5>";
							} ?>
					</fieldset>		
				</form>
			</div>
		</div>
		<div class="tab-pane fade in" id="print_tab2">
			<div class="tab2-para">
				<div class="para_heading">
					<div class="col-sm-6 " style="padding:0px;">
						<h4>Print on Canvas</h4>
					</div>
					<div class="col-sm-6 ">
						<form id='myform' method='POST' action='#'>
							<label>QTY : </label>
							<input type='button' value='-' class='qtyminus' field='quantity1' />
							<input type='text' name='quantity1' value='0' class='qty' />
							<input type='button' value='+' class='qtyplus' field='quantity1' />
						</form>
					</div>
					<div class="clearfix"></div>
				</div>
				<form  role="form">
					<fieldset>
						<?php 
							if(!empty($printcanvas)) { ?>
								<ul class="question-col billing_add" style="padding:0px">
								<?php foreach($printcanvas as $ps){   ?>
									<li class="col-md-12 col-sm-6  col-xs-12">							
										<label>
											<input checked="checked" name="radio" type="radio">
											<span class="lbl padding-8"><?php echo $ps['size']; ?></span>
										</label>
									</li>
								<?php } ?>
								</ul>	
						<?php } else { 
								echo "<h5 style='margin-left:10px'>No Size defined</h5>";
							} ?>
					</fieldset>		
				</form>
			</div>
		</div>
		<div class="text-center">
			<div class="col-md-6 col-sm-6 padd0">
			
			<?php 
			if($data['quantity'] != 0 ){
			if(isset($_SESSION['user_id'])){ ?>
				<a id="pr<?php echo $data['id']; ?>" href="price-request.php?id=<?php echo $data['id']; ?>&code=<?php echo urlencode($data['code']);?>" data-toggle="modal" data-target="#submit_form" class="pur_btn btn-yellow"><i class="ti-money icon-cart "></i> <p class="add">Price On Request</p></a>
			<?php }else{ ?>			
			<a href="login.php?id=<?php echo $data['id']; ?>" data-toggle="modal" data-target="#login-modal" onclick="clearlogin();" class="pur_btn btn-yellow"><i class="ti-money icon-cart "></i><p class="add">Price On Request</p></a>
			<?php }	
			}
			?>
				
			</div>
		</div>										
		<div class="clearfix"></div>
		<div class="row view_detail">
			<div class="col-md-6 col-xs-6">
				<div class="view_title">
					<h4><?php echo $data['noOfViews']; ?><br><small>Views</small></h4>
				</div>
			</div>
			<div class="col-md-6 col-xs-6">
				<div class="view_title">
					<h4><?php echo $fav_count; ?><br><small>Favorite</small></h4>
				</div>
			</div>
		</div>
	</div>
</div>
</div>
						</div>
					</div><!-- art-detail-body -->
				</div>
			</article>
		</div>
		<div class="row description_row mrg_0">
			<h4><b>Description</b></h4>
			<p><?php echo $data['description']; ?></p>
		</div>
		

<!---related product starts here-->
<?php if(count($rel_prod) > 0){ ?>		
<div class="morelik-bg">
<div class="row mrg_0">
	<div class="col-md-12 col-xs-12 sub_title">
		<h4><b>Related Arts</b></h4>
	</div>
</div>

<div class="row mrg_0">
	<ul id="flexiselDemo2"> 						  					
		<?php foreach($rel_prod as $rprod){ ?>
		<li>
<div class="thumbnails">
<div class="thumbnails_caption">
	<a href="product.php?id=<?php echo $rprod['id']; ?>">
	<img class="img-responsive" src="resources/uploads/products/thumb/<?php echo $rprod['thumbImage']; ?>" width="251" height="168"></a>
	<div class="thirdrow">
		<h4><?php echo $rprod['name']; ?></h4>						
		<p>by <b>
		<a href="author.php?id=<?php echo $rprod['artistid']; ?>">
		<?php echo getArtistByID($rprod['artistid']); ?></a></b></p>
	    <?php if(isset($_SESSION['user_id'])){		?>
		<a href="price-request.php?id=<?php echo $rprod['id']; ?>&code=<?php echo urlencode($rprod['code']); ?>" data-toggle="modal" data-target="#submit_form" class="buynow pull-right">Price on Request</a>
		<?php }else{ ?>
		<a href="login.php?id=<?php echo $rprod['id']; ?>" data-toggle="modal" data-target="#login-modal" onclick="clearlogin();" class="buynow pull-right">Price on Request</a>		
		<?php } ?>
		
		<p><?php echo getStyleByID($rprod['style']); ?>, <?php echo $rprod['size']; ?> In</p>
		<p>Watercolor on Paper</p>
	</div>
</div>		
</div>
		</li>
		<?php } ?>
	</ul>
</div>
</div>  
<?php } ?>
<!---related product ends here-->

		</div>
	</div>
	
	<!-- Footer -->
	<?php require 'footer.php'; ?>
	<!-- /Footer -->
	
	<!--Modal Window--->
	<div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">    	
	</div>
	
	<div class="modal fade" id="submit_form" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">			
	
	</div>
	<a href="#header" class="scrollup"><i class="fa fa-chevron-up"></i></a>	
    <script src="resources/js/jquery.js"></script>
	<script src="resources/js/bootstrap.min.js"></script>
	<script src="resources/js/jquery.scrollUp.min.js"></script>
	<script src="resources/js/hallooou.js"></script>
	<script src="resources/js/main.js"></script>
	<script src="resources/js/smoothScroll.js"></script>
	<script src="resources/js/jquery.scrollTo-1.4.3.1-min.js"></script>
	<script src="resources/js/wow.min.js"></script>
	<script type="text/javascript" src="resources/js/jquery.flexisel.js"></script>
	<script>
	 wow = new WOW(
	 {
	
		}	) 
		.init();
	</script>
	<script type="text/javascript">
		$(window).load(function() {

			$("#flexiselDemo2").flexisel({
				visibleItems: 4,
				itemsToScroll: 1,
				animationSpeed: 200,
				infinite: false,
				navigationTargetSelector: null,
				autoPlay: {
					enable: false,
					interval: 5000,
					pauseOnHover: true
				},
				responsiveBreakpoints: { 
					portrait: { 
						changePoint:480,
						visibleItems: 1,
						itemsToScroll: 1
					}, 
					landscape: { 
						changePoint:640,
						visibleItems: 1,
						itemsToScroll: 2
					},
					tablet: { 
						changePoint:768,
						visibleItems: 2,
						itemsToScroll: 1
					},
					tabletlandscape: { 
						changePoint:1024,
						visibleItems: 2,
						itemsToScroll: 1
					},
					largescreen: { 
						changePoint:1025,
						visibleItems: 3,
						itemsToScroll: 1
					}
					
				},
				loaded: function(object) {
					console.log('Slider loaded...');
				},
				before: function(object){
					console.log('Before transition...');
				},
				after: function(object) {
					console.log('After transition...');
				}
			});
		});
	</script>
<script>
function favorite(pid){
	    var userid = "<?php echo $_SESSION['user_id']; ?>";
		$.ajax({
			url		: "ajax/add.php?productid="+pid+"&userid="+userid+"&type=addtofavorite", 				
			success: function(result){	
				$("#fav_icon").removeAttr("data-original-title");
				$("#fav_icon").prop("data-original-title", "Added");			
			}
		});
}

function tab1(){
  $('#tab1').show();	
  $('#tab2').hide();	
  $('#tab3').hide();
}
function tab2(){
  $('#tab1').hide();	
  $('#tab2').show();	
  $('#tab3').hide();
}
function tab3(){
  $('#tab1').hide();	
  $('#tab2').hide();	
  $('#tab3').show();
}
function showvideo(){
	videourl = $("#img3").attr("actual-img");
	video = '<video width="560" height="320" controls>';
	video += '<source src="'+videourl+'" type="video/ogg"></video>';	
	$('.orbit-container').html(video);
}
function showimg2(){
	imgurl = $("#img2").attr("actual-img");
	imgtag = '<img src="'+imgurl+'" alt="" itemprop="image" class="img-responsive" id="switcher">'; 
	$('.orbit-container').html(imgtag);
}
function showimg1(){
	imgurl = $("#img1").attr("actual-img");
	imgtag = '<img src="'+imgurl+'" alt="" itemprop="image" class="img-responsive" id="switcher">'; 
	$('.orbit-container').html(imgtag);	
}


<?php if($_SESSION['pr']){ ?>          
	$("#"+"<?php echo $_SESSION['pr']; ?>").trigger("click");
<?php unset($_SESSION['pr']);  } ?>
</script>	
	<script src="resources/js/zoomple.js" type="text/javascript"></script>	
</body>

</html>

<!-- The Modal For POP UP Image-->
<div id="myModal" class="p-modal" style="z-index:100">
  <!-- The Close Button -->
  <span class="p-close" onclick="document.getElementById('myModal').style.display='none'">&times;</span>
  <!-- Modal Content (The Image) -->
  <img class="p-modal-content" id="img01">
  <!-- Modal Caption (Image Text) -->
  <div id="p-caption"></div>
</div>
<script>
// Get the modal
var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById('myImg');
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("p-caption");
img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}
</script>

<script type="text/javascript">
/*
$(document).ready(function() {
$('.zoomple').zoomple({ 
		blankURL : 'images/blank.gif',
		loaderURL : 'images/loader.gif',
		offset : {x:100,y:-100},
		zoomWidth : 300,  
		zoomHeight : 300			
	}); 
  }); */
</script>  
<script src="resources/js/imagezoom.js"></script>
<style>
.thumb-image { width: 500px; }

.thumb-image > img { width: 100%; }
.header-v5 { z-index: 1230 !important; } 
.navbar { z-index: 1230 !important; } 
</style>