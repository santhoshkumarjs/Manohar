<?php require '../framework/initialise/framework.init.php';
require '../functions.php'; 
$cid = trim($request['cid']);
$size = trim($request['size']);
$styleid = trim($request['style']);

//$sql = "select * from product where categoryid = '".$cid."' or artSize = '".$size."' or style = '".$styleid."'";
$sql = "select * from product where ";
if($cid != ""){ 
	$csql = "categoryid = $cid";  
	$sql = $sql . $csql . " and ";	
}
if($size != "" ){ 
	$sizesql = "artSize = '".$size."'";
	$sql = $sql . $sizesql . " and ";
}  
if($styleid != ""){ 
	$stylesql = "style = $styleid";
	$sql = $sql . $stylesql . " and ";
}
$sql = $sql . " status = 'active'";
//echo $sql; exit;
$product_data = $db['master']->getResults($sql);
//print_r(count($product_data));
?>
<?php
if(count($product_data) == 0){
	echo  '<p style="margin-top:50px; margin-bottom:50px" class="subtitle fancy">NO DATA FOUND</p>';
	exit;
}
foreach($product_data as $pdata){  ?>	
<div class="wall-column">			
<div class="wall-item">
	<div class="img">
		<a href="product.php?id=<?php echo $pdata['id'];?>">
		<img src="resources/uploads/products/thumb/<?php echo $pdata['thumbImage']; ?>" alt="" class="img-responsive"></a>
		<div class="overlay">
		<!--
			<div class="add_fav">
				<a href="#" data-toggle="tooltip" data-placement="bottom" title="Add&nbsp;to&nbsp;Favourite" class="red-tooltip"><i class="fa fa-heart"></i></a>
			</div>-->
			<a href="product.php?id=<?php echo $pdata['id'];?>"" class="expand">View Art <i class="ti-arrow-circle-right tiarrow"></i></a>
			<!-- <a class="close-overlay hidden">x</a> -->
		</div>
	</div>
	<div class="thirdrow">
		<h4><?php echo $pdata['name']; ?></h4>
		<p class="pull-right">Code: <b><?php echo $pdata['code']; ?></b></p>
		<p>by <b><?php echo getArtistByID($pdata['artistID']);?></b></p>
		<a href="price-request.php" data-toggle="modal" data-target="#submit_form" class="buynow pull-right" >Price On Request</a>
		<p>Acrylic,<?php echo $pdata['artSize']; ?></p>
		<p><?php echo $pdata['artType']; ?></p>
	</div>
</div>
</div>
<?php } ?>	
<div class="wall-column"></div>	
<div class="wall-column"></div>	
<div class="wall-column"></div>	
<div class="wall-column"></div>

		

