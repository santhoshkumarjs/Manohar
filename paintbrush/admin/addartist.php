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
	<link href="resources/css/jquery.classyedit.css" rel="stylesheet">
	<link href="resources/css/jquery.datepick.css" rel="stylesheet">
	  <!-- JS Files-->
	<script src="resources/js/jquery.min.js"></script>
	<script src="resources/js/bootstrap.min.js"></script>
	<script src="resources/js/bootstrap-select.js"></script>	
	
	<link rel="stylesheet" href="resources/css/bootstrapValidator.min.css">
	<script src="resources/js/jquery.validate.js" type="text/javascript"></script>
	<script src="resources/js/additional-methods.min.js"></script>
	<script src="resources/js/bootstrapValidator.min.js"></script>
	<script src="resources/js/jquery.classyedit.js"></script>
	<script src="resources/js/jquery.plugin.min.js"></script>
	<script src="resources/js/jquery.datepick.js"></script>
	<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
		<script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
	<![endif]-->
	<script>
		$(document).ready(function validation(){
		/*	
$.validator.addMethod("dateFormat",  function(value, element) {	
		var regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
		if(!regex_date.test(value))
		{
			return false;
		}	
        res = value.split("-");	
		if(res[0] > 2018) return false;
		if(res[1] > 12) return false;
		if(res[2] > 31) return false;
		var dtRegex = new RegExp(/\b\d{4}[\/-]\d{1,2}[\/-]\d{1,2}\b/);		
		return dtRegex.test(value);
    }, "Please enter a valid date in the format yyyy-mm-dd.");	*/
	
			$("#addpopup").validate({
				rules: {
					name: {
						required: true
					},
					about: {
						required: true
					},
					dob: {
						required: true						
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
					facebook: {
						required: true
					},	
					twitter: {
						required: true
					},
					thumbimage: {
						required: true,
						extension: "png|jpg|jpeg|gif"
					},					
					pimage: {
						required: true,
						extension: "png|jpg|jpeg|gif"
					},
					backimage: {
						required: true,
						extension: "png|jpg|jpeg|gif"						
					}				
				},
				messages: {
					pimage: {						
						extension: "png, jpg, jpeg, gif format only"
					},			
					backimage: {						
						extension: "png, jpg, jpeg, gif format only"
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
	<!-- Responsive Table-->			
	<div id="taskdetails" class="table-responsive">

	  <h2>Add New Artist</h2>			
<div id="taskdetails" class="table-responsive">
<form name="addpopup" id="addpopup" method="post" action="ajax/add.php" enctype="multipart/form-data">
	<table id="reportdiv" class="" style="width:100%";>

			<tr><!--style="width:37%;-->
				<td width="200px;" style="padding:5px 10px 5px 5px"><b>Name<b></td>
				<td width="200px;" style="padding:5px 10px 5px 5px">
				<input type="text" placeholder="Title"  class="form-control" id="name" name="name">	
				</td>
				
				<td width="200px;" style="padding:5px 10px 5px 50px;width:211px;"><b>Thumb Image</b></td>
				<td width="200px;" style="padding:5px 10px 5px 5px">
				<input type="file" name="thumbimage" class="form-control" id="thumbimage" >				
				</td>
			</tr>	
			
			<tr><!--style="width:37%;-->
				<td width="200px;" style="padding:5px 10px 5px 5px"><b>About<b></td>
				<td style="padding:5px 10px 5px 5px" colspan="3">
				<textarea class="form-control" id="about" name="about" rows="15" style="overflow:auto; max-height:100px;"></textarea>
				</td>
			</tr>			
			
<tr><!--style="width:37%;-->
	<td width="200px;" style="padding:5px 10px 5px 5px"><b>Profile Image<b></td>
	<td width="200px;" style="padding:5px 10px 5px 5px">	
<input type="file" placeholder="Image" class="form-control" id="pimage" name="pimage">	
	</td>
	
	<td width="200px;" style="padding:5px 10px 5px 50px;width:211px;"><b>Background Image</b></td>
	<td width="200px;" style="padding:5px 10px 5px 5px">
	<input type="file" placeholder="Image" class="form-control" id="backimage" name="backimage">
	</td>
</tr>	

			
			<tr><!--style="width:37%;-->
				<td width="200px;" style="padding:5px 10px 5px 5px"><b>Date Of Birth<b></td>
				<td width="200px;" style="padding:5px 10px 5px 5px">			
				<input type="text" placeholder="yyyy-mm-dd" class="form-control" id="dob" name="dob" value="">	
				(yyyy-mm-dd) format
				</td>
				
				<td width="200px;" style="padding:5px 10px 5px 50px;width:211px;"><b>City</b></td>
				<td width="200px;" style="padding:5px 10px 5px 5px">	
				<input type="text" placeholder="City" class="form-control" id="city" name="city">				
				</td>
			</tr>			


			<tr><!--style="width:37%;-->
				<td width="200px;" style="padding:5px 10px 5px 5px"><b>State<b></td>
				<td width="200px;" style="padding:5px 10px 5px 5px">				
			<input type="text" placeholder="State" class="form-control" id="state" name="state">	
				</td>
				
				<td width="200px;" style="padding:5px 10px 5px 50px;width:211px;"><b>Country</b></td>
				<td width="200px;" style="padding:5px 10px 5px 5px">	
		<input type="text" placeholder="Country" class="form-control" id="country" name="country">				
				</td>
			</tr>	
			
			<tr><!--style="width:37%;-->
				<td width="200px;" style="padding:5px 10px 5px 5px"><b>Facebook<b></td>				
				<td width="200px;" style="padding:5px 10px 5px 5px">
				<input type="text" placeholder="" value="http://" class="form-control" id="facebook" name="facebook">
				starts with http://
				</td>
				
				<td width="200px;" style="padding:5px 10px 5px 50px;width:211px;"><b>Twitter</b></td>
				<td width="200px;" style="padding:5px 10px 5px 5px">
                <input type="text" placeholder="" value="http://" class="form-control" id="twitter" name="twitter">  
				starts with http://				
				</td>
			</tr>			

		<tr><!--style="width:37%;-->
				<td width="200px;" style="padding:5px 10px 5px 5px"><b>GooglePlus<b></td>
				<td width="200px;" style="padding:5px 10px 5px 5px">	
				<input type="text" placeholder="" value="http://"  class="form-control" id="gp" name="gp">
				starts with http://				
				</td>
				
				<td width="200px;" style="padding:5px 10px 5px 50px;width:211px;"><b>Pinterest</b></td>		
				<td width="200px;" style="padding:5px 10px 5px 5px">				
				<input type="text" placeholder="" value="http://" class="form-control" id="printrest" name="printrest">
				starts with http://
				</td>
			</tr>				
			
		<tr><!--style="width:37%;-->
				<td width="200px;" style="padding:5px 10px 5px 5px"><b>Title 1<b></td>
				<td width="200px;" style="padding:5px 10px 5px 5px">	
				<input type="text" placeholder="" class="form-control" id="title1" name="title1">
				</td>
				
		<td width="200px;" style="padding:5px 10px 5px 50px;width:211px;"><b> Title 2</b></td>		
			<td width="200px;" style="padding:5px 10px 5px 5px">				
				<input type="text" placeholder="Title2" id="title2" class="form-control" name="title2">	
			</td>
		</tr>				
		
			<tr><!--style="width:37%;-->
				<td width="200px;" style="padding:5px 10px 5px 5px"><b>Description 1<b></td>
				<td style="padding:5px 10px 5px 5px" colspan="3">
				<textarea class="form-control" id="desc1" name="desc1" style="height:200px"></textarea>
				</td>
			</tr>			
			
			<tr><!--style="width:37%;-->
				<td width="200px;" style="padding:5px 10px 5px 5px"><b>Description 2<b></td>
				<td style="padding:5px 10px 5px 5px" colspan="3">
			<textarea class="form-control" id="desc2" name="desc2" style="height:200px"></textarea>
				</td>
			</tr>							
			
	</table>
	
      <div class="modal-footer" style="margin-top:15px;">
       <button class="btn btn-primary" type="submit" name="submitval" id="submitval" value="artist"> 
	   <i class="fa fa-check"></i> Submit</button>
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
	$(document).ready(function() {
		$("#about").ClassyEdit();
		$("#desc1").ClassyEdit();
		$("#desc2").ClassyEdit();
	});
	
	$('#dob').datepick({
		dateFormat: 'yyyy-mm-dd',
		autoclose:true,
		endDate: "today",
		maxDate: "today",
	})	
	
 /*   $('#dob').keyup(function (e) {       
	  keyval = e.keyCode;
	  if(keyval != 8){		  
	  	  if(keyval != 46){	
		  //e.preventDefault();
		  //alert(keyval);
		data = $("#dob").val();
		if(data.length == 4)
		  $("#dob").val(data+"-");
		if(data.length == 7)
		  $("#dob").val(data+"-");
	  }}
    })	*/
	/*
	function addDash(dat){
		var x = event.which || event.keyCode;
		alert(x);
	  data = $("#dob").val();
	  if(data.length == 4)
		  $("#dob").val(data+"-");
	  if(data.length == 7)
		  $("#dob").val(data+"-");	  
	}*/
</script>