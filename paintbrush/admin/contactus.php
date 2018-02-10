<?php 
session_start();
include_once ('../framework/initialise/framework.init.php');
global  $library,$db,$request; 
require 'pagination.php';
$select_query = "select * from contactus where status = 'active' order by createdOn desc";
$count_query = "select count(*) as num from contactus where status = 'active'";
$limit = ADMIN_PAGE_SIZE; //PAGINATION_LIMIT;
$path = "contactus.php?";
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
					<th>Name</th>						
					<th>Email</th>						
					<th>Subject</th>							
					<th style="width:40%">Message</th>
					<th>Added On</th>					
					</tr>
			</thead>
			<tbody>		
				<?php foreach($pagingarray[1] as $item){ ?>
					<tr>
						<td><?php echo $item['name']; ?></td>
						<td><?php echo $item['email']; ?></td>						
						<td><?php echo $item['subject']; ?></td>						
						<td><?php echo $item['message']; ?></td>
						<td><?php echo $item['createdOn']; ?></td>						
							
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
