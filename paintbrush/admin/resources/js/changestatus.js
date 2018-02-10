$(document).ready(function validation() {
	$("#searchForm").validate({
		rules: {
			university: {
				required: true
			},
		},
		messages: {
			university: "Please Select the University",
		}
	});
	$("#searchlist").validate({
		rules: {
			selectedval: {
				required: true
			},
		},
		messages: {
			selectedval: "Please Select Option to Move To",
		}
	});	
});


$(document).ready(function() {
	
	$("#selectall").click(function () {
		$(".checkBoxClass").prop('checked', $(this).prop('checked'));
	});	
	
	$('#university').change(function() {
		var univid = $('#university').val(); 
		
		$.ajax({
			type:"GET",
			url:"../web/ajaxvalues.php",
			data :{
				univid:univid ,
			}, 
			success:function(res){
				$('#course').html(res);
			}
		});
	});
			
	$('#course').change(function(){
		var courseval = $(this).val();  
		if(courseval != ""){
			$.ajax({
				type:"GET",
				url:"../web/ajaxvalues.php",
				data :{
					cid:courseval
				},          
				success:function(res){ 
					$('#semester').html(res);
				}
			});
		}	
	});
	
	$('#semester').change(function(){
		var semesterval = $(this).val(); 
		var courseval = $('#course').val();
		var semtxt    = $('#semester option:selected').text();
		var semname   = semtxt.toLowerCase();
		if(semesterval != ""){
			$.ajax({
				type:"GET",
				url:"../web/ajaxvalues.php",
				data :{
					semid  : semesterval,
					cid    : courseval,
					_for   : 'branch'
				},          
				success:function(res){
					if(semname === 'semester 1' || semname === 'semester 2'){
						$("#branch").html("<option value=''>Select One</option> <option value='0'>Common</option>");
					}else{							
						$('#branch').html(res);
					}
				}
			});
		}	
	});
			
	$('#branch').change(function(){
		var branchval = $(this).val(); 
		var courseval = $('#course').val();
		var semesterval = $("#semester").val(); 
		
		if(semesterval != ""){
			$.ajax({
				type:"GET",
				url:"../web/ajaxvalues.php",
				data :{
					semid  : semesterval,
					cid    : courseval,
					bid    : branchval
				},          
				success:function(res){
					$("#subject").html(res);
				}
			});
		}	
	});
			
	$('#subject').change(function(){
		var subjectval = $(this).val(); 
		if(subjectval != ""){
			$.ajax({
				type:"GET",
				url:"../web/ajaxvalues.php",
				data :{
					sid:subjectval
				},          
				success:function(res){ 
					$('#unit').html(res);
				}
			});
		}	
	});
	});		
			