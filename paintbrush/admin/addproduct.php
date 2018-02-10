<?php 
session_start();
include_once ('../framework/initialise/framework.init.php');
global  $library,$db,$request; 
require 'checksession.php';
$sql = "select id, name, createdOn from product where status = 'active'";
$data = $db['master']->getResults($sql);
$category_sql = "select id, name from category where status = 'active'";
$categories = $db['master']->getResults($category_sql);
$artist_sql = "select id, name from artist where status = 'active'";
$artists = $db['master']->getResults($artist_sql);

$style_sql = "select id, name from style where status = 'active'";
$styles = $db['master']->getResults($style_sql);
//print_r($data);
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
			
	jQuery.validator.addMethod("allRequired", function(value, elem){
        var name = elem.name;
        return  $('input[name="'+name+'"]').map(function(i,obj){return $(obj).val();}).get().every(function(v){ return v; });
    });		
	
			$("#addpopup").validate({
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
					artsize: {
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
						required: true,
						extension: "png|jpg|jpeg|gif"
					},			
					largeimage: {
						required: true,
						extension: "png|jpg|jpeg|gif"
					},		
					videoimage: {						
						extension: "mp4"
					},	
					/*
					"pcanvas[]": "allRequired",			
					"ppaper[]": "allRequired",	
					*/
				},
				messages: {
					thumbimage: {						
						extension: "png, jpg, jpeg, gif format only"
					},			
					largeimage: {						
						extension: "png, jpg, jpeg, gif format only"
					},	
					videoimage: {						
						extension: "mp4 format only"
					},
					/*
					title: "Please enter product title",
					desc: "Please enter product description",					
					"pcanvas[]": "This field is required",
					"ppaper[]": "This field is required", */
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
	<!-- Responsive Table-->			
	<div id="taskdetails" class="table-responsive">

	  <h2>Add New Product</h2>			
<div id="taskdetails" class="table-responsive">
<form name="addpopup" id="addpopup" method="post" action="ajax/add.php" enctype="multipart/form-data" onsubmit="return valida();">
	<table id="reportdiv" class="" style="width:100%";>

			<tr><!--style="width:37%;-->
				<td width="200px;" style="padding:5px 10px 5px 5px"><b>Title<b>
				<font color="red">*</font></td>
				<td width="200px;" style="padding:5px 10px 5px 5px">
				<input type="text" placeholder="Title"  class="form-control" id="title" name="title">	
				</td>
				
				<td width="200px;" style="padding:5px 10px 5px 50px;width:211px;">Description
				<font color="red">*</font></td>
				<td width="200px;" style="padding:5px 10px 5px 5px">
			 <textarea class="form-control" id="desc" name="desc" style="resize:none"></textarea>				
				</td>
			</tr>	
			
<tr><!--style="width:37%;-->
	<td width="200px;" style="padding:5px 10px 5px 5px"><b>Code<b>
	<font color="red">*</font></td>
	<td width="200px;" style="padding:5px 10px 5px 5px">
	<input type="text" placeholder="code"  class="form-control" id="code" name="code" onfocusout="checkCode(this.value);">	
	</td>
	
	<td width="200px;" style="padding:5px 10px 5px 50px;width:211px;">Category
	<font color="red">*</font></td>
	<td width="200px;" style="padding:5px 10px 5px 5px">
	<select class="form-control" id="category" name="category">
		<option value="">select</option>
		<?php foreach($categories as $cat){ ?>
		<option value="<?php echo $cat['id'];?>">
		<?php echo $cat['name'];?></option>
		<?php } ?>
	<select>	
	</td>
</tr>	

			
			<tr><!--style="width:37%;-->
				<td width="200px;" style="padding:5px 10px 5px 5px"><b>Featured<b></td>
				<td width="200px;" style="padding:5px 10px 5px 5px">			
                    <select class="form-control" id="featured" name="featured">
						<option value="yes">yes</option>
						<option value="no" selected="selected">no</option>
					<select>				
				</td>
				
				<td width="200px;" style="padding:5px 10px 5px 50px;width:211px;">New Status</td>
				<td width="200px;" style="padding:5px 10px 5px 5px">				
                    <select class="form-control" id="new_status" name="new_status">
						<option value="1">yes</option>
						<option value="0" selected="selected">no</option>
					<select>				
				</td>
			</tr>			


			<tr><!--style="width:37%;-->
				<td width="200px;" style="padding:5px 10px 5px 5px"><b>Size<b>
				<font color="red">*</font></td>
				<td width="200px;" style="padding:5px 10px 5px 5px">				
			<input type="text" placeholder="20 X 30"  class="form-control" id="size" name="size">				
				</td>
				
				<td width="200px;" style="padding:5px 10px 5px 50px;width:211px;">Art Type
				<font color="red">*</font></td>
				<td width="200px;" style="padding:5px 10px 5px 5px">				
				<input type="text" placeholder="Art Type" class="form-control" id="arttype" name="arttype">
				</td>
			</tr>	
			
			<tr><!--style="width:37%;-->
				<td width="200px;" style="padding:5px 10px 5px 5px"><b>Art Size
				<font color="red">*</font><b></td>				
				<td width="200px;" style="padding:5px 10px 5px 5px">
				    <select class="form-control" id="artsize" name="artsize">
					    <option selected="selected" value="">select</option>
						<option value="small">small</option>
						<option value="medium">medium</option>
						<option value="large">large</option>
					<select>				
				</td>
				
				<td width="200px;" style="padding:5px 10px 5px 50px;width:211px;">Artist
				<font color="red">*</font>
				</td>				
				<td width="200px;" style="padding:5px 10px 5px 5px">
                    <select class="form-control" id="artist" name="artist">
					<option value="">select</option>
					<?php foreach($artists as $artist){ ?>
					<option value="<?php echo $artist['id']; ?>"><?php echo $artist['name'];?></option>
					<?php } ?>
					<select>				
				</td>
			</tr>			

		<tr><!--style="width:37%;-->
				<td width="200px;" style="padding:5px 10px 5px 5px"><b>Print Canvas<b></td>
				<td width="200px;" style="padding:5px 10px 5px 5px">	
				<input type="text" placeholder=""  class="form-control" name="pcanvas[]">	
				<div id="pcanvasid"></div>
				<a href="javascript://" onclick="addcanvas();">more</a>
				<a href="javascript://" onclick="removecanvas();"><font color="red">remove</font></a>
				</td>
				
				<td width="200px;" style="padding:5px 10px 5px 50px;width:211px;"><b>Print Paper</b>
				</td>		
				<td width="200px;" style="padding:5px 10px 5px 5px">				
				<input type="text" placeholder="" class="form-control" name="ppaper[]">
				<div id="ppaperid"></div>
				<a href="javascript://" onclick="addpaper();">more</a>
				<a href="javascript://" onclick="removepaper();"><font color="red">remove</font></a>				
				</td>
			</tr>				
			
		<tr><!--style="width:37%;-->
				<td width="200px;" style="padding:5px 10px 5px 5px"><b>Style
				<font color="red">*</font>
				<b></td>
				<td width="200px;" style="padding:5px 10px 5px 5px">	
			  <select name="style" id="style" class="form-control">
			  <option selected="selected" value="">select</option>
              <?php foreach($styles as $style){ ?>			 
				<option value="<?php echo $style['id']; ?>"><?php echo $style['name']; ?></option>	
			  <?php } ?>	
			  </select>
				</td>
				
		<td width="200px;" style="padding:5px 10px 5px 50px;width:211px;"><b>Thumb Image</b>
		<font color="red">*</font></td>		
				<td width="200px;" style="padding:5px 10px 5px 5px">				
				<input type="file" class="form-control" id="thumbimage" name="thumbimage">					
				</td>
		</tr>				
		
		<tr><!--style="width:37%;-->
				<td width="200px;" style="padding:5px 10px 5px 5px"><b>Large Image<b>
				<font color="red">*</font>
				</td>
				<td width="200px;" style="padding:5px 10px 5px 5px">	
				<input type="file" placeholder="Large Image" id="largeimage" class="form-control" name="largeimage">	
				</td>
				
		<td width="200px;" style="padding:5px 10px 5px 50px;width:211px;"><b>Video File</b>
		<font color="red">*</font></td>		
		<td width="200px;" style="padding:5px 10px 5px 5px">				                  			
		<input type="file" placeholder="Video Image" id="videoimage" class="form-control" name="videoimage">
         (small size mp4 file only)
		</td>
		</tr>	

		<tr><!--style="width:37%;-->
				<td width="200px;" style="padding:5px 10px 5px 5px"><b>Quantity<b>
				</td>
				<td width="200px;" style="padding:5px 10px 5px 5px">	
				<select name="quantity" id="quantity" class="form-control">
				  <option value="1">Available</option>
				  <option value="0">Sold</option>
				</select>
				</td>
				
		<td width="200px;" style="padding:5px 10px 5px 50px;width:211px;"><b></b></td>		
		<td width="200px;" style="padding:5px 10px 5px 5px"></td>
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
		$('#ppaperid').append('<input type="text" name="ppaper[]" placeholder="paper-size" class="form-control" name="mytext[]"/>');
	}
	function addcanvas(){
	$('#pcanvasid').append('<input type="text" name="pcanvas[]" placeholder="canvas-size" class="form-control" name="mytext[]"/>');	
	}
	function removepaper(){
		$("#ppaperid").children().last().remove(); 
	}	
	function removecanvas(){
		$("#pcanvasid").children().last().remove(); 
	}	
	function checkCode(prodcode){
	$.ajax({
		url: "ajax/check.php?check=prodcode&pcode="+prodcode, 
		async : false,				
		success: function(result){
			if(result == 'true'){				
				alert("This Code already Exists");
				$("#code").val('');
			}
			//else
			//	return false;
		}					
	});	
    }

</script>	