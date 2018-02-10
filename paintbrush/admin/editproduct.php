<?php 
session_start();
include_once ('../framework/initialise/framework.init.php');
global  $library,$db,$request; 
require 'checksession.php';
$category_sql = "select id, name from category where status = 'active'";
$categories = $db['master']->getResults($category_sql);
$artist_sql = "select id, name from artist where status = 'active'";
$artists = $db['master']->getResults($artist_sql);

$style_sql = "select id, name from style where status = 'active'";
$styles = $db['master']->getResults($style_sql);

$id = $request['id'];
$product_sql = "select * from product where id = $id";
$data = $db['master']->getOneRow($product_sql);
//print_r($data); exit;

$canvas_size_sql = "select * from printsize where type = 'canvas' and productid = $id and status ='active'";
$canvas_data = $db['master']->getResults($canvas_size_sql);
//print_r($canvas_data); exit;

$paper_size_sql = "select * from printsize where type = 'paper' and productid = $id and status = 'active'";
$paper_data = $db['master']->getResults($paper_size_sql);
//print_r($artists); exit;
?>
<!doctype html>
<html lang="en">
 <head> 
  <title>PaintBrush</title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- CSS-->
	<link rel="stylesheet" href="resources/css/font-awesome.css">	 
	<link href="resources/css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="resources/css/bootstrap-theme.min.css" rel="stylesheet" type="text/css">
	<link href="resources/css/menu.css" rel="stylesheet" type="text/css">
	<link rel="stylesheet" href="resources/css/bootstrap-select.css">
	<link href="resources/css/mystyle.css" rel="stylesheet">	
	
	  <!-- JS Files-->
	<script src="resources/js/jquery.min.js"></script>
	<script src="resources/js/bootstrap.min.js"></script>
	<script src="resources/js/bootstrap-select.js"></script>	
	
	<link rel="stylesheet" href="resources/css/bootstrapValidator.min.css">
	<script src="resources/js/jquery.validate.js" type="text/javascript"></script>
	<script src="resources/js/additional-methods.min.js"></script>	
	<script src="resources/js/bootstrapValidator.min.js"></script>

	<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
		<script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
	<![endif]-->
	<script>
		$(document).ready(function validation(){
			$("#editpopup").validate({
				rules: {
					title: {
						required: true
					},
					desc: {
						required: true
					},
					code: {
						required: true
					},						
					category: {
						required: true
					},
					size: {
						required: true
					},
					arttype: {
						required: true
					},
					style: {
						required: true
					},	
					artist: {
						required: true
					},
					thumbimage: {
						extension: "png|jpg|jpeg|gif"
					},
					largeimage: {					
						extension: "png|jpg|jpeg|gif"
					},		
					videoimage: {						
						extension: "mp4"
					},
				},
				messages: {
					title: "Please enter product title",
					desc: "Please enter product description",
					thumbimage: {						
						extension: "png, jpg, jpeg, gif format only"
					},			
					largeimage: {						
						extension: "png, jpg, jpeg, gif format only"
					},	
					videoimage: {						
						extension: "mp4 format only"
					},					
				}
			});
		});
	</script>
 </head>
	 <body class="inner-body">
<!--=====================================header start=====================================-->
<?php require 'header.php'; ?>	
<!--=====================================main part=====================================-->	
<div class="container">
<div class="container-inner">

<!-- Responsive Table Start Here-->	
<div class="row ">
<div class="col-md-12">	
	  <h2>Edit Product</h2>
	<!-- Responsive Table-->			
	<div id="taskdetails" class="table-responsive">
			
<div id="taskdetails" class="table-responsive">
<form name="editpopup" id="editpopup" method="post" action="ajax/update.php" enctype="multipart/form-data">
    <input type="hidden" name="editval" value="<?php echo $id; ?>">
	<table id="reportdiv" class="" style="width:100%";>

<tr><!--style="width:37%;-->
	<td width="100px;" style="padding:5px 10px 5px 5px"><b>Title<b></td>
	<td width="100px;" style="padding:5px 10px 5px 5px">
	<input type="text" class="form-control" id="title" name="title" value="<?php echo $data['name']; ?>">	
	</td>
	
	<td width="100px;" style="padding:5px 10px 5px 50px;">Description</td>
	<td width="100px;" style="padding:5px 10px 5px 5px">
	<textarea class="form-control" id="desc" name="desc" style="resize:none"><?php echo $data['description']; ?></textarea>	
	</td>
</tr>	

<tr><!--style="width:37%;-->
	<td width="100px;" style="padding:5px 10px 5px 5px"><b>Code<b></td>
	<td width="100px;" style="padding:5px 10px 5px 5px">
	<input type="text" class="form-control" id="code" name="code" value="<?php echo $data['code']; ?>">	
	</td>
	
	<td width="100px;" style="padding:5px 10px 5px 50px;">Category</td>
	<td width="100px;" style="padding:5px 10px 5px 5px">
	<select class="form-control" id="category" name="category">
		<option value="">select</option>
		<?php foreach($categories as $cat){ ?>
		<option value="<?php echo $cat['id']; ?>" <?php if($cat['id'] == $data['categoryid'])echo "selected=selected"; ?>>
		<?php echo $cat['name'];?></option>
		<?php } ?>
	<select>	
	</td>
</tr>	


<tr><!--style="width:37%;-->
	<td width="100px;" style="padding:5px 10px 5px 5px"><b>Featured<b></td>
	<td width="100px;" style="padding:5px 10px 5px 5px">			
		<select class="form-control" id="featured" name="featured">
			<option value="yes" <?php if($data['featured'] == 'yes')echo "selected=selected"; ?>>yes</option>
			<option value="no" <?php if($data['featured'] == 'no')echo "selected=selected"; ?>>no</option>
		<select>				
	</td>
	
	<td width="100px;" style="padding:5px 10px 5px 50px;">New Status</td>
	<td width="100px;" style="padding:5px 10px 5px 5px">				
		<select class="form-control" id="new_status" name="new_status">
			<option value="1" <?php if($data['new_status'] == 1)echo "selected=selected"; ?>>yes</option>
			<option value="0" <?php if($data['new_status'] == 0)echo "selected=selected"; ?>>no</option>
		<select>				
	</td>
</tr>			


<tr><!--style="width:37%;-->
	<td width="100px;" style="padding:5px 10px 5px 5px"><b>Size<b></td>
	<td width="100px;" style="padding:5px 10px 5px 5px">				
<input type="text" class="form-control" id="size" name="size" value="<?php echo htmlentities($data['size']); ?>">				
	</td>
	
	<td width="100px;" style="padding:5px 10px 5px 50px;">Art Type</td>
	<td width="100px;" style="padding:5px 10px 5px 5px">				
	<input type="text" class="form-control" id="arttype" name="arttype" value="<?php echo $data['artType']; ?>">
	</td>
</tr>	

<tr><!--style="width:37%;-->
	<td width="100px;" style="padding:5px 10px 5px 5px"><b>Art Size<b></td>				
	<td width="100px;" style="padding:5px 10px 5px 5px">
		<select class="form-control" id="eartsize" name="artsize">
		<option value="small" <?php if($data['artSize'] == 'small')echo "selected=selected"; ?>>small</option>
		<option value="medium" <?php if($data['artSize'] == 'medium')echo "selected=selected"; ?>>medium</option>
		<option value="large" <?php if($data['artSize'] == 'large')echo "selected=selected"; ?> >large</option>
		<select>				
	</td>
	
	<td width="100px;" style="padding:5px 10px 5px 50px;">Artist</td>				
	<td width="100px;" style="padding:5px 10px 5px 5px">
		<select class="form-control" id="artist" name="artist">
		<option value="">select</option>
		<?php foreach($artists as $artist){ ?>
		<option value="<?php echo $artist['id']; ?>" <?php if($data['artistid'] == $artist['id'])echo "selected=selected"; ?>>
		<?php echo $artist['name'];?></option>
		<?php } ?>
		<select>				
	</td>
</tr>			

<tr><!--style="width:37%;-->
	<td width="100px;" style="padding:5px 10px 5px 5px"><b>Print Canvas<b></td>
	<td width="100px;" style="padding:5px 10px 5px 5px">
	<div id="pcanvasid">
	<?php if(count($canvas_data)<= 0){ ?>
	<input type="text" value="<?php echo  htmlentities($cd['size']); ?>" class="form-control" id="pcanvas" name="pcanvas[]">
    <?php } ?>
	
	<?php foreach($canvas_data as $cd ){ ?>
	<input type="text" value="<?php echo  htmlentities($cd['size']); ?>" class="form-control" id="pcanvas" name="pcanvas[]">	
	<?php } ?>
	</div>
	<a href="javascript://" onclick="addcanvas();">more</a>
	<a href="javascript://" onclick="removecanvas();"><font color="red">remove</font></a>	
	</td>
	
	<td width="100px;" style="padding:5px 10px 5px 50px;"><b>Print Paper</b></td>		
	<td width="100px;" style="padding:5px 10px 5px 5px">
	<div id="ppaperid">
	<?php if(count($paper_data)<= 0){ ?>
	<input type="text" value="<?php echo  htmlentities($cd['size']); ?>" class="form-control" id="ppaper" name="ppaper[]">
    <?php } ?>
	
	<?php foreach($paper_data as $pd ){ ?>	
		<input type="text" value="<?php echo  htmlentities($pd['size']); ?>" class="form-control" id="ppaper" name="ppaper[]">
	<?php } ?>
	</div>
	<a href="javascript://" onclick="addpaper();">more</a>
	<a href="javascript://" onclick="removepaper();"><font color="red">remove</font></a>	
	</td>
</tr>				

<tr><!--style="width:37%;-->
	<td width="100px;" style="padding:5px 10px 5px 5px"><b>Style<b></td>
	<td width="100px;" style="padding:5px 10px 5px 5px">	
  <select name="style" id="style" class="form-control">
  <?php foreach($styles as $style){ ?>			 
	<option value="<?php echo $style['id']; ?>" <?php if($data['style'] == $style['id'])echo 'selected=selected'; ?>>
		<?php echo $style['name']; ?></option>	
  <?php } ?>	
  </select>
	</td>
	
<td width="100px;" style="padding:5px 10px 5px 50px;"><b>Thumb Image</b></td>		
	<td width="100px;" style="padding:5px 10px 5px 5px">				
	<input type="file" class="form-control" id="thumbimage" name="thumbimage">	
   	<?php echo $data['thumbImage']; ?>
	</td>
</tr>				

<tr><!--style="width:37%;-->
	<td width="100px;" style="padding:5px 10px 5px 5px"><b>Large Image<b></td>
	<td width="100px;" style="padding:5px 10px 5px 5px">	
	<input type="file" id="largeimage" class="form-control" name="largeimage">	
	   	<?php echo $data['image']; ?>
	</td>
	
	<td width="100px;" style="padding:5px 10px 5px 50px;"><b>Video Image</b></td>		
		<td width="100px;" style="padding:5px 10px 5px 5px">				                  			
		<input type="file" id="videoimage" class="form-control" name="videoimage">
		   	<?php echo $data['videoImage']; ?>
	</td>		
</tr>	

<tr><!--style="width:37%;-->
		<td width="100px;" style="padding:5px 10px 5px 5px"><b>Quantity<b>
		</td>
		<td width="100px;" style="padding:5px 10px 5px 5px">	
		<select name="quantity" id="quantity" class="form-control">
		  <option value="1" <?php if($data['quantity'] == 1) echo "selected=selected"; ?>>
		       Available</option>
		  <option value="0" <?php if($data['quantity'] == 0) echo "selected=selected"; ?>>Sold</option>
		</select>
		</td>
		
<td width="100px;" style="padding:5px 10px 5px 50px;"><b></b></td>		
<td width="100px;" style="padding:5px 10px 5px 5px"></td>
</tr>			

	</table>
	
      <div class="modal-footer" style="margin-top:15px;">
       <button class="btn btn-primary" type="submit" name="submitval" id="submitval" value="product"> <i class="fa fa-check"></i> Submit</button>
	   <button class="btn btn-default" type="reset"><i class="fa fa-repeat"></i> Reset</button>
      </div>	
	
</form>				
	<!-- Responsive Table end-->
</div>
	<!--Pagination Start-->
		<ul class="pagination pull-right">
		</ul><!--Pagination End-->
</div>
<!-- Responsive Table End Here-->	
</div>	
</div><!--main part end-->
</div>
</div>	
	<!-- =====================================Footer part=====================================-->
	<div class="footer">
	  <div class="container">
		<p class="text-muted">&copy; 2015 Symbiotic Infotech Pvt Ltd., All Rights Reserved.</p>
	  </div>
	</div><!-- Footer part end-->
	<!-- =====================================Popup part=====================================-->	
 </body>
</html>
<script>
	function addpaper(){
		$('#ppaperid').append('<input type="text" name="ppaper[]" class="form-control" name="mytext[]"/>');
	}
	function addcanvas(){
	$('#pcanvasid').append('<input type="text" name="pcanvas[]" class="form-control" name="mytext[]"/>');	
	}
	function removepaper(){
		$("#ppaperid").children().last().remove(); 
	}	
	function removecanvas(){
		$("#pcanvasid").children().last().remove(); 
	}	
</script>	