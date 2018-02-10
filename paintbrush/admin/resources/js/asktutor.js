	$(document).ready(function(){
		$("#replyform").validate({
			rules:{
                	 	 reply:{
                    		 	required:true,
                  	   	}
                     },
			messages: {
				reply : {
					required:"Please Enter Answer for the Question",
				},
			}
            	});
	});			

	function editdata(id,msg,ques,reply){
		if(reply != 'yes'){
			$("#editid").val(id);
			$("#reply").val($("#ans"+id).html());
			$("#quesval").html($("#ques"+id).html());
			$('#reply').prop('readonly', false);
			$("#addreplyval").show();
			$("#resetval").show();
		}else{
			$("#editid").val(id);
			$("#reply").val($("#ans"+id).html()); 
			$("#quesval").html($("#ques"+id).html());
			$('#reply').prop('readonly', true);
			$("#addreplyval").hide();
			$("#resetval").hide();
		}
	}

	$(document).ready(function() {
			$('#university').change(function() {
				var univid = $('#university').val(); 
				
				$.ajax({
					type:"GET",
					url:"../web/ajaxvalues.php",
					data :{
						regasktutoruniv:univid,
						resource:'asktutor',
					}, 
					success:function(res){
						$('#subject').html(res);
					}
				}); 
			});
		
			$('#subject').change(function() {
				var univid = $('#university').val(); 
				var subid = $('#subject').val(); 
				$.ajax({
					type:"GET",
					url:"../web/ajaxvalues.php",
					data :{
						regasktutoruniv:univid,
						regasktutorsubj:subid,
						resource:'asktutor',
					}, 
					success:function(res){
						$('#topic').html(res);
					}
				}); 
			});
	});				