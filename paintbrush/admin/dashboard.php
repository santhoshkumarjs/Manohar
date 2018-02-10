<?php 
session_start();
include_once ('../framework/initialise/framework.init.php');
global  $library,$db,$request; 
//print_r($_SESSION); 
require 'checksession.php';
require 'pagination.php';
$sql = "select id, name, createdOn from category where status = 'active'";
$data = $db['master']->getResults($sql);

$select_query = "select id, name, createdOn from category where status = 'active' order by createdOn desc";
$count_query = "SELECT count(id) as num FROM category where status = 'active'";
$limit = ADMIN_PAGE_SIZE; //PAGINATION_LIMIT;
$path = "dashboard.php?";
$pagingarray = addPagination($count_query,$select_query,$limit,$path);  
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
	<script>
		$(document).ready(function validation() {
			$("#addpopup").validate({
				rules: {
					category: {
						required: true
					},		
				},
				messages: {
					category: "Please enter the category name",			
				}
			});
			$("#editpopup").validate({
				rules: {
					editcategory: {
						required: true
					},				
				},
				messages: {
					editcategory: "Please enter the category",
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

<?php if(isset($_SESSION['result_status'])){ ?>
<div class="alert text-center  alert-warning alert-dismissible" role="alert">
	  <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	  <strong> <i class ="fa fa-warning"> </i> <?php echo $_SESSION['result_status']; unset($_SESSION['result_status']); ?> </strong>
</div>
<?php } ?>

		<div class="text-right">
	<button class="btn btn-success" data-toggle="modal" data-target="#myModal" data-target=".bs-example-modal-sm" onclick="addNew();"> <i class="fa fa-plus"> </i> Add New Category</button>
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
					<th>Category</th>
					<th>Added On</th>								
					<th>Action </th>	
					</tr>
			</thead>
			<tbody>		
				<?php foreach($pagingarray[1] as $item){ ?>
					<tr><td><?php echo $item['name']; ?></td>
						<td><?php echo $item['createdOn']; ?></td>		
						<td class="td-action">
						
						<a href="" class="label label-warning" title="Edit" alt="Edit" data-toggle="modal" data-target=".bs-example-modal-sm4" onclick="editdata(<?php echo $item['id']; ?>,'<?php echo $item['name']; ?>')"><i class="fa fa-pencil"> </i></a>
						
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
<!-- Modal -->
<form name="addpopup" id="addpopup" method="post" action="ajax/add.php">
<div id="myModal" class="modal fade bs-example-modal-sm" role="dialog">
  <div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Add New Category</h4>
      </div>
      <div class="modal-body">
		
		<div class="form-group">			   
				<label class="col-sm-4 control-label">Add New Category</label>
				
				 <div class="col-sm-6 ">				
					<input type="text" placeholder="Add New category"  class="form-control" id="category" name="category" maxlength="35">	
				</div>							
		</div>
		
		<br><br>
		<div class="form-group">		   
			<label class="col-sm-4 control-label">Description</label>				
			 <div class="col-sm-6">				
			   <textarea class="form-control" id="desc" name="desc" class="form-control" style='resize:none'></textarea>
			 </div>
		</div>		

		
      </div>
	  <br><br>
      <div class="modal-footer" style="margin-top:15px;">
       <button class="btn btn-primary" type="submit" value="category" name="submitval" id="submitval"> <i class="fa fa-check"></i> Submit</button>
	   <button class="btn btn-default" type="reset"><i class="fa fa-repeat"></i> Reset</button>
      </div>	  
    </div>
  </div>
</div>
</form>
<!-- =====================================Popup end=====================================-->
  
	<!-- SMALL Popup start Here -->
	<form method="post" name="deletepopup" id="deletepopup" action="ajax/delete.php">
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
				  <button class="btn btn-primary" type="submit" name="submit" id="delete" value="category">
				  <i class="fa fa-check"></i> Confirm</button>
				  <button class="btn btn-default" type="button" data-dismiss="modal"> <i class="fa fa-times"></i>  Cancel</button>
				</div>
			</div><!-- Model Body end -->
		</div>
	  </div>
	</div>
    </form>
	<!-- SMALL Popup End Here -->	
	
<form method="post"  name="editpopup" id="editpopup" action="ajax/update.php">
<div id="myModal" class="modal fade bs-example-modal-sm4" role="dialog">
  <div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Edit Category</h4>
      </div>
      <div class="modal-body">
		
		<div class="form-group">
				<label class="col-sm-4 control-label">Edit Category</label>
				 <div class="col-sm-6 ">				
					<input type="text" placeholder=""  class="form-control" id="editcategory" name="editcategory" value="">	
				</div>
		</div>
		
		<br><br>
		<div class="form-group">		  
			<label class="col-sm-4 control-label">Description</label>				
			 <div class="col-sm-6">				
			   <textarea class="form-control" id="edesc" name="edesc" class="form-control" style='resize:none'>
			   </textarea>
			 </div>
		</div>	

      </div>
	  <br><br>
      <div class="modal-footer" style="margin-top:15px;">
	  <input type="hidden" name="editval" id="editval" value="">
       <button class="btn btn-primary" type="submit" value="category" name="editsubmitval" id="editsubmitval"> <i class="fa fa-check"></i> Submit</button>
	   <button class="btn btn-default" type="reset"><i class="fa fa-repeat"></i> Reset</button>
      </div>
    </div>
  </div>
</div>	
</form>

<script>
	function editdata(id, name)
	{	
		$("#editcategory").val(name); 		
		$("#editval").val(id);
		$.ajax({
			url		: "ajax/edit.php?id="+id+"&type=category", 
			dataType: "json",				
			success: function(result){					
				//alert(result.id);
				$('#edesc').val(result.description);						
			}
		});		 
	}			

	function deletedata(id)
	{
		$("#deleteval").val(id); 
	}
	function addNew(){
		$("#category").val('');
		$("#desc").val('');
	}

</script>
 </body>
</html>
