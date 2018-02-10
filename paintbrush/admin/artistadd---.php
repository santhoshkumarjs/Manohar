<?php 
session_start();
include_once ('../framework/initialise/framework.init.php');
global  $library,$db,$request; 
$sql = "select id, name, createdOn from artist where status = 'active'";
$data = $db['master']->getResults($sql);
//print_r($data);
?>
<!doctype html>
<html lang="en">
 <head> 
  <title>mTutor</title>
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
$(document).ready(function validation() {
			$("#addpopup").validate({
				rules: {
					name: {
						required: true
					},
					about: {
						required: true
					},
					dob: {
						required: true,							
					},
					city: {
						required: true
					},	
					state: {
						required: true
					},
					country: {
						required: true
					},					
				},
				messages: {
					name: "Please enter the name",
					about: "Please select about",
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
	<button class="btn btn-success" data-toggle="modal" data-target="#myModal" data-target=".bs-example-modal-sm"> <i class="fa fa-plus"> </i> Add New Artist</button>
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
					<th>Artist</th>
					<th>Added On</th>								
					<th>Action</th>	
					</tr>
			</thead>
			<tbody>		
<?php foreach($data as $item){ ?>
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
<form name="addpopup" id="addpopup" method="post" action="ajax/add.php" enctype="multipart/form-data">
<div id="myModal" class="modal fade bs-example-modal-sm" role="dialog">
  <div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Add New Artist</h4>
      </div>
	  
      <div class="modal-body">		
		<div class="form-group">	
			<label class="col-sm-4 control-label">Name</label>				
			 <div class="col-sm-6 ">				
				<input type="text" placeholder="Name"  class="form-control" id="name" name="name">	
			</div>						
		</div>	
		
		<br><br>
		<div class="form-group">	
			<label class="col-sm-4 control-label">about</label>				
			 <div class="col-sm-6">				
				<textarea class="form-control" id="about" name="about" class="form-control"></textarea>
			</div>						
		</div>

		
		<br><br>
		<div class="form-group">		
			<label class="col-sm-4 control-label">Thumb Image</label>				
			 <div class="col-sm-6 ">									
				<input type="file" placeholder="thumbimage" class="form-control" id="thumbimage" name="thumbimage">	
			</div>							
		</div>		
		
		<br><br>
		<div class="form-group">		
			<label class="col-sm-4 control-label">Profile Image</label>				
			 <div class="col-sm-6 ">									
				<input type="file" placeholder="Image" class="form-control" id="pimage" name="pimage">	
			</div>							
		</div>

		<br><br>
		<div class="form-group">		
			<label class="col-sm-4 control-label">Background Image</label>				
			 <div class="col-sm-6 ">									
				<input type="file" placeholder="Image" class="form-control" id="backimage" name="backimage">	
			</div>							
		</div>		
		<br><br>
		<div class="form-group">		
			<label class="col-sm-4 control-label">Date Of Birth</label>				
			 <div class="col-sm-6 ">									
				<input type="text" placeholder="yyyy/mm/dd" class="form-control" id="dob" name="dob">	
			</div>							
		</div>		

		<br><br>
		<div class="form-group">		
			<label class="col-sm-4 control-label">City</label>				
			 <div class="col-sm-6 ">									
				<input type="text" placeholder="City" class="form-control" id="city" name="city">	
			</div>							
		</div>		
		
		<br><br>
		<div class="form-group">		
			<label class="col-sm-4 control-label">State</label>				
			 <div class="col-sm-6 ">									
				<input type="text" placeholder="State" class="form-control" id="state" name="state">	
			</div>							
		</div>		
		
		<br><br>
		<div class="form-group">		
			<label class="col-sm-4 control-label">Country</label>				
			<div class="col-sm-6 ">									
			<input type="text" placeholder="Country" class="form-control" id="country" name="country">	
			</div>							
		</div>		
		
      </div>
	  
      <div class="modal-footer" style="margin-top:15px;">
       <button class="btn btn-primary" type="submit" name="submitval" id="submitval" value="artist"> <i class="fa fa-check"></i> Submit</button>
	   <button class="btn btn-default" type="reset"><i class="fa fa-repeat"></i> Reset</button>
      </div>
    </div>
  </div>
</div>
</form>
<!-- =====================================Popup end=====================================-->
  
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
				  <button class="btn btn-primary" type="submit" name="submit" id="delete" value="artist">  <i class="fa fa-check"></i> Confirm</button>
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
        <h4 class="modal-title">Edit Artist</h4>
      </div>
      <div class="modal-body">
						
		<div class="form-group">	
			<label class="col-sm-4 control-label">Name</label>				
			 <div class="col-sm-6 ">				
				<input type="text" placeholder="Name"  class="form-control" id="ename" name="name">	
			</div>						
		</div>	
		
		<br><br>
		<div class="form-group">	
			<label class="col-sm-4 control-label">about</label>				
			 <div class="col-sm-6">							    
			<textarea class="form-control" id="eabout" name="about" class="form-control"></textarea>
			</div>						
		</div>

		<br><br><br>
		<div class="form-group">		
			<label class="col-sm-4 control-label">Profile Image</label>				
			 <div class="col-sm-6 ">									
			<input type="file" placeholder="Image" class="form-control" id="epimage" name="epimage">	
			</div>							
		</div>

		<br><br>
		<div class="form-group">		
			<label class="col-sm-4 control-label">Background Image</label>				
			 <div class="col-sm-6 ">									
				<input type="file" placeholder="Image" class="form-control" id="ebackimage" name="backimage">	
			</div>							
		</div>		
		<br><br>
		<div class="form-group">		
			<label class="col-sm-4 control-label">Date Of Birth</label>				
			 <div class="col-sm-6 ">									
				<input type="text" placeholder="yyyy/mm/dd" class="form-control" id="edob" name="dob">	
			</div>							
		</div>		

		<br><br>
		<div class="form-group">		
			<label class="col-sm-4 control-label">City</label>				
			 <div class="col-sm-6 ">									
				<input type="text" placeholder="City" class="form-control" id="ecity" name="city">	
			</div>							
		</div>		
		
		<br><br>
		<div class="form-group">		
			<label class="col-sm-4 control-label">State</label>				
			 <div class="col-sm-6 ">									
				<input type="text" placeholder="State" class="form-control" id="estate" name="state">	
			</div>							
		</div>		
		
		<br><br>
		<div class="form-group">		
			<label class="col-sm-4 control-label">Country</label>				
			<div class="col-sm-6 ">									
			<input type="text" placeholder="Country" class="form-control" id="ecountry" name="country">	
			</div>							
		</div>			
			
      </div>
      <div class="modal-footer" style="margin-top:15px;">
	  <input type="hidden" name="editvalue" id="editvalue" value="">
       <button class="btn btn-primary" type="submit" value="artist" name="editsubmitval" id="editsubmitval"> <i class="fa fa-check"></i> Submit</button>
	   <button class="btn btn-default" type="reset"><i class="fa fa-repeat"></i> Reset</button>
      </div>
    </div>
  </div>
</div>	
</form>

<script>
	function editdata(id)
	{				
		$("#editvalue").val(id);			
		$.ajax({
			url		: "ajax/edit.php?id="+id+"&type=artist", 
			dataType: "json",				
			success: function(result){										
				$('#eabout').val(result.about);
				$('#ename').val(result.name);
				$('#edob').val(result.dob);
				$('#estate').val(result.state);
				$('#ecity').val(result.city);				
				$('#ecountry').val(result.country);
				/*
				$('#earttype').val(result.artType);				
				$('#eartsize').val(result.artSize);								
				$('#estyle').val(result.style);				
				$('#eprintable').val(result.printable);				
				$('#efeatured').val(result.featured);	
*/				
				//$('#').val(result.name);				
			
				//console.log("CONSOLE TEST "+ result);
			}
		});			
		
	}

	function deletedata(id)
	{
		$("#deleteval").val(id); 
	}

</script>
 </body>
</html>
