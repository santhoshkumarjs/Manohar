		$(document).ready(function validation() {
			$("#searchForm").validate({
				rules: {
					university1: {
						required: true
					},
					university2: {
						required: true
					}
				},
				messages: {
					university1: "Please Select the University",
					university2: "Please Select University to Map Topic",	
				}
			});
		});	
	
	$(document).ready(function() {
		$('#university1').change(function() {
			var univid = $('#university1').val(); 
				
			$.ajax({
				type:"GET",
				url:"../web/ajaxclone.php",
				data :{
					univid:univid ,
				}, 
				success:function(res){
					$('#course1').html(res);
				}
			});
		});
			
		$('#course1').change(function(){
			var courseval = $(this).val();  
			if(courseval != ""){
				$.ajax({
					type:"GET",
					url:"../web/ajaxclone.php",
					data :{
						cid:courseval
					},          
					success:function(res){ 
						$('#semester1').html(res);
					}
				});
			}	
		});
	
		$('#semester1').change(function(){
			var semesterval = $(this).val(); 
			var courseval = $('#course1').val();
			var semText = $('#semester1 option:selected').text();
			var semName = semText.toLowerCase();
			if(semesterval != ""){
				$.ajax({
					type:"GET",
					url:"../web/ajaxclone.php",
					data :{
						semid:semesterval,
						cid : courseval,
						isBranch : true
					},          
					success:function(res){ 
						if(semName === 'semester 1' || semName === 'semester 2'){
							$("#branch1").html("<option value=''>Select One</option> <option value='0'>Common</option>");
						} else {
							$('#branch1').html(res);
						}
					}
				});
			}	
		});
		
		$('#branch1').change(function(){
			var branchval = $(this).val(); 
			var semesterval = $("#semester1").val(); 
			var courseval = $('#course1').val();
			if(semesterval != ""){
				$.ajax({
					type:"GET",
					url:"../web/ajaxclone.php",
					data :{
						semid:semesterval,
						cid : courseval,
						bid : branchval
					},          
					success:function(res){ 
						$('#subject1').html(res);
					}
				});
			}	
		});		
			
		$('#subject1').change(function(){
			var subjectval = $(this).val(); 
			if(subjectval != ""){
				$.ajax({
					type:"GET",
					url:"../web/ajaxclone.php",
					data :{
						sid:subjectval
					},          
					success:function(res){ 
						$('#unit1').html(res);
					}
				});
			}	
		});
		
		$('#unit1').change(function(){
			var unitval = $(this).val(); 
			var subjectval = $('#subject1').val();
			if(unitval != ""){
				$.ajax({
					type:"GET",
					url:"../web/ajaxclone.php",
					data :{
						sid:subjectval,
						uid:unitval,
						topicclone:'existing'
					},          
					success:function(res){ 
						$('#topic1').html(res);
					}
				});
			}	
		});
		
		$('#university2').change(function() {
			var univid = $('#university2').val(); 
				
			$.ajax({
				type:"GET",
				url:"../web/ajaxclone.php",
				data :{
					univid:univid ,
				}, 
				success:function(res){
					$('#course2').html(res);
				}
			});
		});
			
		$('#course2').change(function(){
			var courseval = $(this).val();  
			if(courseval != ""){
				$.ajax({
					type:"GET",
					url:"../web/ajaxclone.php",
					data :{
						cid:courseval
					},          
					success:function(res){ 
						$('#semester2').html(res);
					}
				});
			}	
		});
	
		$('#semester2').change(function(){
			var semesterval = $(this).val(); 
			var courseval = $('#course2').val();
			var semText = $('#semester2 option:selected').text();
			var semName = semText.toLowerCase();
			if(semesterval != ""){
				$.ajax({
					type:"GET",
					url:"../web/ajaxclone.php",
					data :{
						semid:semesterval,
						cid : courseval,
						isBranch : true
					},          
					success:function(res){ 
						if(semName === 'semester 1' || semName === 'semester 2'){
							$("#branch2").html("<option value=''>Select One</option> <option value='0'>Common</option>");
						} else {
							$('#branch2').html(res);
						}
					}
				});
			}	
		});
		
		$('#branch2').change(function(){
			var branchval = $(this).val(); 
			var semesterval = $("#semester2").val(); 
			var courseval = $('#course2').val();
			if(semesterval != ""){
				$.ajax({
					type:"GET",
					url:"../web/ajaxclone.php",
					data :{
						semid:semesterval,
						cid : courseval,
						bid : branchval
					},          
					success:function(res){ 
						$('#subject2').html(res);
					}
				});
			}	
		});		
			
		$('#subject2').change(function(){
			var subjectval = $(this).val(); 
			if(subjectval != ""){
				$.ajax({
					type:"GET",
					url:"../web/ajaxclone.php",
					data :{
						sid:subjectval
					},          
					success:function(res){ 
						$('#unit2').html(res);
					}
				});
			}	
		});
		
		$('#unit2').change(function(){
			var unitval = $(this).val(); 
			var subjectval = $('#subject2').val();
			var semesterval = $('#semester2').val(); 
			var courseval = $('#course2').val();
			var univid = $('#university2').val(); 
			if(unitval != ""){
				$.ajax({
					type:"GET",
					url:"../web/ajaxclone.php",
					data :{
						sid:subjectval,
						uid:unitval,
						univ:univid,
						cid:courseval,
						semid:semesterval,
						topicclone: 'newtopic'
					},          
					success:function(res){ 
						$('#topic2').html(res);
					}
				});
			}	
		});
	});		
	
