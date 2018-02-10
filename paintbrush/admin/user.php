<?php 
session_start();
include_once ('../framework/initialise/framework.init.php');
global  $library,$db,$request;
require 'checksession.php';	 
require 'pagination.php';
$sql = "select id, name, emailid, createdOn from users where status = 'active'";
$data = $db['master']->getResults($sql);
$select_query = "select id, name, emailid, createdOn from users where status = 'active' order by createdOn desc";
$count_query = "select count(*) as num from users where status = 'active'";
$limit = ADMIN_PAGE_SIZE; //PAGINATION_LIMIT;
$path = "user.php?";
$pagingarray = addPagination($count_query,$select_query,$limit,$path);  
//exit;
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
					university: {
						required: true
					},
					country: {
						required: true
					}
				},
				messages: {
					university: "Please enter the university",
					country: "Please select country",
				}
			});
			$("#editpopup").validate({
				rules: {
					edituniversity: {
						required: true
					},
					editcountry: {
						required: true
					},					
				},
				messages: {
					edituniversity: "Please enter the university",
					editcountry: "Please select country",
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
		<div class="text-right">
		<!--
	<button class="btn btn-success" data-toggle="modal" data-target="#myModal" data-target=".bs-example-modal-sm"> <i class="fa fa-plus"> </i> Add New User</button>
	-->
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
					<th>User</th>
					<th>Email</th>
					<th>Added On</th>								
					<th>Action </th>	
					</tr>
			</thead>
			<tbody>		
				<?php foreach($pagingarray[1] as $item){ ?>
					<tr><td><?php echo $item['name']; ?></td>
						<td><?php echo $item['emailid']; ?></td>
						<td><?php echo $item['createdOn']; ?></td>		
						<td class="td-action">
						<!--
						<a href="" class="label label-warning" title="Edit" alt="Edit" data-toggle="modal" data-target=".bs-example-modal-sm4" onclick="editdata(<?php //echo $item['id']; ?>,'<?php //echo $item['name']; ?>')"><i class="fa fa-pencil"> </i></a>
						-->
						
						<a style="margin-left: 0px;" href="" class="label label-danger" title="Detete" alt="Delete" data-toggle="modal" data-target=".bs-example-modal-sm2" onclick="deletedata(<?php echo $item['id']; ?>)"><i class="fa fa-trash"> </i></a>  
						
						</td>						
					</tr>							
				<?php } ?>
			</tbody>
		</table>	
	</div>
	<!-- Responsive Table end-->
</div>
	<!--Pagination Start-->
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
        <h4 class="modal-title">Add New User</h4>
      </div>
      <div class="modal-body">		
		<div class="form-group">			   
			<label class="col-sm-4 control-label">Add New User</label>				
			 <div class="col-sm-6 ">				
				<input type="text" placeholder="Name"  class="form-control" id="name" name="name">	
			</div>						
		</div>
      </div>
	  
      <div class="modal-footer" style="margin-top:15px;">
       <button class="btn btn-primary" type="submit" name="submitval" id="submitval" value="user"> <i class="fa fa-check"></i> Submit</button>
	   <button class="btn btn-default" type="reset"><i class="fa fa-repeat"></i> Reset</button>
      </div>
    </div>
  </div>
</div>
</form>
<!-- =====================================Popup end=====================================-->
  
	<!-- SMALL Popup start Here -->
	<form method="post" name="deletepopup" id="deletepopup" action="">
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
				  <button class="btn btn-primary" type="submit" name="delete" id="delete" value="delete">  <i class="fa fa-check"></i> Confirm</button>
				  <button class="btn btn-default" type="button" data-dismiss="modal"> <i class="fa fa-times"></i>  Cancel</button>
				</div>
			</div><!-- Model Body end -->
		</div>
	  </div>
	</div>
    </form>
	<!-- SMALL Popup End Here -->	
	
<form method="post"  name="editpopup" id="editpopup" action="">
<div id="myModal" class="modal fade bs-example-modal-sm4" role="dialog">
  <div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Edit User</h4>
      </div>
      <div class="modal-body">
		
		<div class="form-group">
				<label class="col-sm-4 control-label">Edit Users</label>
				 <div class="col-sm-6 ">				
					<input type="text" placeholder=""  class="form-control" id="edituniversity" name="edituniversity" value="">	
				</div>
		</div>		

      </div>
      <div class="modal-footer" style="margin-top:15px;">
	  <input type="hidden" name="editvalue" id="editvalue" value="">
       <button class="btn btn-primary" type="submit" name="editsubmitval" id="editsubmitval"> <i class="fa fa-check"></i> Submit</button>
	   <button class="btn btn-default" type="reset"><i class="fa fa-repeat"></i> Reset</button>
      </div>
    </div>
  </div>
</div>	
</form>

<script>
	function editdata(id, name, countryid)
	{			
		$("#editvalue").val(id);	
	}

	function deletedata(id)
	{
		$("#deleteval").val(id); 
	}

</script>
 </body>
</html>
