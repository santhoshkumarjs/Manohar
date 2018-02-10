<?php 
session_start();
include_once ('../framework/initialise/framework.init.php');
global  $library,$db,$request; 
require 'checksession.php';	
require 'pagination.php';
$faq_sql = "select * from faq where status = 'active'";
$faq_data = $db['master']->getResults($faq_sql);

$select_query = "select * from faq where status = 'active'";
$count_query = "select count(id) as num from faq where status = 'active'";
$limit = ADMIN_PAGE_SIZE; //PAGINATION_LIMIT;
$path = "faq.php?";
$pagingarray = addPagination($count_query,$select_query,$limit,$path); 
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
	<script src="resources/js/bootstrapValidator.min.js"></script>

	<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
		<script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
	<![endif]-->
 </head>
	 <body class="inner-body">
	<!--=====================================header start=====================================-->
	<?php include_once("header.php"); ?>
	<!--=====================================main part=====================================-->	
	<div class="container">
		<!-- Alert box-->
			<?php 
			if($error != "") { ?>
			<div class="alert text-center  alert-warning alert-dismissible" role="alert">
			  <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
			  <strong> <i class ="fa fa-warning"> </i> <?php echo $error; ?> </strong>
			</div>
			<?php } if($success != "") { ?>
			<div class="alert text-center alert-success alert-dismissible" role="alert">
			  <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
			  <strong> <i class ="fa fa-check"> </i> <?php echo $success; ?> </strong> 
			</div>
			<?php } ?>
		<!-- Alert box end-->
		
		<div class="container-inner">	
			
			
<div class="container-inner">	
			<h4><i class=""> </i> Faq Question and Answers</h4>
			<hr>
			<!-- Form Start Here-->		
	
			<form class="form-horizontal" role="form" id="serviceForm" action="ajax/add.php" name="serviceForm" method="post" enctype="multipart/form-data">
				<div class="text-right hidden-text small">Fields marked as' <span class="mandatory" style="color:red;">*</span> 'are Mandatory</div>
					<!-- <fieldset class="scheduler-border">						-->
						
<div class="row">
			<div class="col-md-12">
				<div class="form-group">
				  <label class="col-sm-2 control-label">Question <span class="mandatory" style="color:red;"> *</span></label>	
				<div class="col-sm-5 ">
				<textarea name="question" id="question" style="width:600px; resize:none" class="form-control" style='resize:none'></textarea>
				</div>									
				</div>
			</div>
		</div>
								
<div class="row">
			<div class="col-md-12">
				<div class="form-group">
				  <label class="col-sm-2 control-label">Answer <span class="mandatory" style="color:red;"> *</span></label>	
				<div class="col-sm-5 ">
				<textarea name="answer" id="answer" style="width:600px; resize:none" class="form-control"> </textarea>		
				</div>									
				</div>
			</div>
		</div>								
								
								
<div class="row">
<div class="col-md-12">
	<div class="form-group">
	<div class="col-sm-5 ">
	<input type="hidden" name="submitval" value="faq">
	<input type="submit" name="submit" value="submit">		
	</div>									
	</div>
</div>
</div>									
					
			</div>
</form>

	<div class="row ">
				<div class="col-md-12">	
					<!-- Responsive Table-->
					<div class="table-responsive">
						
						<table class="table table-striped table-hover table-bordered ">						
							
							<thead>								
								<th>SINO</th>								
								<th>Question</th>								
								<th>Answer</th>
								<th>Action</th>
							</thead>
<tbody>
<?php 
if(isset($request['page_number'])){
  $i = 1 + (($request['page_number'] - 1) * 10);
}else{
	$i = 1;
}
foreach($pagingarray[1] as $faq){ 
$question = str_replace("'", "\\'",$faq['question']);
$answer = str_replace("'", "\\'",$faq['answer']);
?>
<tr><td><?php echo $i++; ?></td>
<td><?php echo $faq['question']; ?></td>
<td><?php echo $faq['answer']; ?></td>
<td class="td-action" style="width:100px">

	<a href="" class="label label-warning" title="Edit" alt="Edit" data-toggle="modal"  data-target=".title_edit" onClick="editvalue('<?php echo $faq['id']; ?>','<?php echo $question; ?>', '<?php echo $answer; ?>')">
	<i class="fa fa-edit"> </i></a>

	<a href="" class="label label-danger" title="Detete" alt="Delete" data-toggle="modal" data-target=".bs-example-modal-sm" onClick="deletedata('<?php echo $faq['id']; ?>')"><i class="fa fa-trash"> </i></a>

</td>
</tr>						
<?php } ?>						
						</table>								
			<!-- Display Part End -->
		</div>		
	</div><!--main part end-->
		<ul class="pagination pull-right">
			<?php echo $pagingarray[0]; ?>
		</ul><!--Pagination End-->		
	</div>
	</div>
</div>	
	<!-- =====================================Footer part=====================================-->
	<div class="footer">
	  <div class="container">
		<p class="text-muted">&copy; 2015 Symbiotic Infotech Pvt Ltd., All Rights Reserved.</p>
	  </div>
	</div><!-- Footer part end-->
	
	
	<!--- Delete Message Popup start -->
	<form action="ajax/delete.php" method="post" name="myForm1" id="myForm1">
					<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
					  <div class="modal-dialog modal-sm">
						<div class="modal-content">
							<!-- Model Header-->
							<div class="modal-header">
							  <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">x</span><span class="sr-only">Close</span></button>
							  <h5 id="myLargeModalLabel" class="modal-title">Delete Content Schedule</h5>
							</div><!-- Model Header end -->
							<!-- Model Body -->
							<center><div class="modal-body text-center">
							<div id ="msg"></div>
							<input type="hidden" id="deleteval" name="deleteval">						
							<div>
							  <button class="btn btn-primary"  onSubmit="window.location.reload();"  type="submit" name="submit" value="faq">  <i class="fa fa-check"></i> Confirm</button>
							  <button class="btn btn-default" data-dismiss="modal" type="submit"> <i class="fa fa-times"></i>  Cancel</button>
							</div>
							</div></center><!-- Model Body end -->
						</div>
					  </div>
					</div>
					<!-- SMALL Popup End Here -->
				</form>
		<!--- Delete Message Popup End -->

	<form action="ajax/update.php" name="titleeditpopup" id="titleeditpopup" method="post">
			<div aria-hidden="false" aria-labelledby="myLargeModalLabel" role="dialog" tabindex="-1" class="modal fade title_edit" style="display: none;">
			  <div class="modal-dialog modal-sm">
				<div class="modal-content" style="width:548px;height:350px;">
					<!-- Model Header-->
					<div class="modal-header">
					  <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">x</span><span class="sr-only">Close</span></button>
					  <h5 class="modal-title" id="myLargeModalLabel">Edit Faq</h5>
					</div><!-- Model Header end -->
					<!-- Model Body -->
					<div class="modal-body text-center">
						<div id="portedt">
		
						<div class="form-group" style="margin-top:15px;">
							<label style="margin-top:8px;text-align: left;" class="col-sm-3 control-label">Question  </label>
							<div class="col-sm-8 " >						
								<textarea value="" id="equest" name="equest" class="form-control" style="margin-top:10px;margin-bottom:10px;width:300px;"></textarea>
							</div>
						</div>		
						<div class="form-group" style="margin-top:15px;">
							<label style="margin-top:8px;text-align: left;" class="col-sm-3 control-label">
Answer:							</label>
							<div class="col-sm-8 ">						
			<textarea value="" id="eans" name="eans" class="form-control" style="width:300px;"></textarea>
							</div>
						</div>	
						</div>
						<input type="hidden" value="" id="editval" name="editval">
						<div style="margin-top: 190px; border-top: 1px solid #e5e5e5; padding:15px;">
						  <button id="editporttitle" name="submit" value="faq" type="submit" class="btn btn-primary">  <i class="fa fa-check"></i> Update1</button>
						  
						  <button data-dismiss="modal" type="button" class="btn btn-default"> <i class="fa fa-times"></i>  Cancel</button>
						</div>
					</div><!-- Model Body end -->
				</div>
			  </div>
			</div>
		</form>
		
 </body>
</html>
<script>
function deletedata(id){
	$("#deleteval").val(id); 
}
function editvalue(id, quest, ans){
	//alert(quest);
	$("#editval").val(id);	
	$("#equest").text(quest);
	$("#eans").text(ans);
}
</script>
	<script>
		$(document).ready(function validation() {
			$("#serviceForm").validate({
				rules: {
					question: {
						required: true
					},		
					answer: {
						required: true
					},					
				},
			});
		});
	</script>
