<?php 
session_start();
include_once ('../framework/initialise/framework.init.php');
global  $library,$db,$request; 
require 'checksession.php';
require 'pagination.php';
$page = $request['page_number'];
//if($page == "") $page = 1;

$select_query = "select id, name, code, thumbImage, createdOn from product where status = 'active' order by createdOn desc";
$count_query = "SELECT count(*) as num FROM product WHERE status='active' ORDER BY id DESC";
$limit = ADMIN_PAGE_SIZE; //PAGINATION_LIMIT;
$path = "product.php?";
$pagingarray = addPagination($count_query,$select_query,$limit,$path);  
//print_r($pagingarray); exit;
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
	<script src="resources/js/bootstrapValidator.min.js"></script>

	<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
		<script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
	<![endif]-->
	
 </head>
	 <body class="inner-body">
<!--=====================================header start=====================================-->
<?php require 'header.php'; ?>	
<!--=====================================main part=====================================-->	
<div class="container">
<div class="container-inner">
	<div class="text-right">
	<a href="addproduct.php">
		<button class="btn btn-success" <i class="fa fa-plus"> </i> Add New Product</button>
	</a>
</div>
		<hr>			
<!-- Responsive Table Start Here-->	
<div class="row ">
<div class="col-md-12">	
	<!-- Responsive Table-->			
	<div id="taskdetails" class="table-responsive">
		<table id="reportdiv" class="table table-striped table-hover table-condensed">
			<thead>
				<tr>	
					<th>Product</th>
					<th>Code</th>
					<th>Added On</th>								
					<th>Thumb Image</th>	
					<th>Action </th>	
					</tr>
			</thead>
			<tbody>		
				<?php foreach($pagingarray[1] as $item){ ?>
					<tr><td><?php echo $item['name']; ?></td>
						<td><?php echo $item['code']; ?></td>
						<td><?php echo $item['createdOn']; ?></td>
						<td>
						<img src="../resources/uploads/products/thumb/<?php echo $item['thumbImage']; ?>" width="75" height="75"></td>	
						<td class="td-action">
						<a href="editproduct.php?id=<?php echo $item['id']; ?>" class="label label-warning" title="Edit" alt="Edit"><i class="fa fa-pencil"> </i></a>
						
						<a style="margin-left: 50px;" href="" class="label label-danger" title="Detete" alt="Delete" data-toggle="modal" data-target=".bs-example-modal-sm2" onclick="deletedata(<?php echo $item['id']; ?>)"><i class="fa fa-trash"> </i></a>  
						</td>						
					</tr>							
				<?php } ?>
			</tbody>
		</table>	
	</div>
	<!-- Responsive Table end-->
</div>
	<!--Pagination Start-->
		<ul class="pagination pull-right">
		<?php echo $pagingarray[0]; ?>
							</ul><!--Pagination End-->
</div>
<!-- Responsive Table End Here-->	
</div>	
</div><!--main part end-->
	
	<!-- =====================================Footer part=====================================-->
	<div class="footer">
	  <div class="container">
		<p class="text-muted">&copy; 2015 Symbiotic Infotech Pvt Ltd., All Rights Reserved.</p>
	  </div>
	</div><!-- Footer part end-->
	<!-- =====================================Popup part=====================================-->	
  
	<!-- SMALL Popup start Here -->
	<form method="post" name="deletepopup" id="deletepopup" enctype="multipart/form-data" action="ajax/delete.php">
	<div class="modal fade bs-example-modal-sm2" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
	  <div class="modal-dialog modal-sm">
		<div class="modal-content">
			<!-- Model Header-->
			<div class="modal-header">
			  <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">x</span><span class="sr-only">Close</span></button>
			  <h5 id="myLargeModalLabel" class="modal-title">Delete Confirmation</h5>
			</div><!-- Model Header end -->
			<!-- Model Body -->
			<div class="modal-body text-center">				
				<div>
					<input type="hidden" name="deleteval" id="deleteval" value="">
				  <button class="btn btn-primary" type="submit" name="submit" id="delete" value="product">  <i class="fa fa-check"></i> Confirm</button>
				  <button class="btn btn-default" type="button" data-dismiss="modal"> <i class="fa fa-times"></i>  Cancel</button>
				</div>
			</div><!-- Model Body end -->
		</div>
	  </div>
	</div>
    </form>
	<!-- SMALL Popup End Here -->	
	


<script>
	

	function deletedata(id)
	{
		$("#deleteval").val(id); 
	}

</script>
 </body>
</html>