 function hidesome(from_p){
	$("#topicmsg").show();
	$("#thanksmsg").hide();
	$("#thanksmsg").text('');
	$("#question").val('');
	$(".modal-footer").show();
	$(".errmsg").hide();
	$(".popup_cancel").html('<i class="fa fa-times"></i> Cancel');
	$("#ask_submit").show();
	if($(".modal-content").find(':hidden').hasClass('subjectdrop')){
		$(".subjectdrop").show();
		$("#subject_dropdown").val('');
		$(".suerrmsg").hide();
	}
	if(from_p === 'side'){
		$("#topic_name").hide();
		$("#topicid").val('');
	}
    
  }

	$(".asktutor_cls").each(function(){
		$(this).on("click", function(){	
			var sub_name   = $("#sub_name").val();
			var topic_id   = $(this).attr('topic_id');
			var rowcount   = $(this).attr('rowcount');
			var srcfrom = $(this).attr('srcfrom');	                  		
			if(srcfrom == "search"){
				var subject_id = $(this).attr('subject_id');
				var sub_name = $("#subtid"+topic_id).val();
				$("#subject_id").val(subject_id);				
			}			
			$("#topicid").val(topic_id);
			$("#subject_name").text(sub_name);
			var topictext = $("#"+rowcount).val();
			$("#topic_name").text(topictext);			
			$('#askModal').modal('show');
			$("#ask_submit").show();
			$("#topicmsg").show();
			$("#thanksmsg").hide();
			$("#thanksmsg").text('');
			$(".errmsg").hide();
			$("#question").val('');
			$(".popup_cancel").html('<i class="fa fa-times"></i> cancel');
			$(".modal-footer").show();
			$("#topic_name").show();
			$(".subjectdrop").hide();
			$("#subjectdropdown").val('');
			$(".suerrmsg").hide();
			$(".main_close").removeClass('succ_close');
			$("#subject_name").show();
			
		});
	});

	 loadCSS = function(href){
		var csslink = $("<link rel='stylesheet' type='text/css' href='"+href+"'>");
		$("head").append(csslink);
	 };
	 
	 
	$("#ask_submit").on('click', function(){
		loadCSS("../resources/user/css/jquery.loadmask.css");
		var ques = $("#question").val();
		ques = ques.trim();
        var ifsubjectdropdown = $("#subjectdropdown").val();
        if(ifsubjectdropdown === "1"){
           var sub_val = $("#subject_dropdown").val();
            if(sub_val === ''){
				$(".suerrmsg").html("<br/>Please select subject");
				$(".suerrmsg").show();
				return false;
			}		   
		}	
		
		if(ques === ''){
			$(".errmsg").show();
			$(".suerrmsg").hide();
			return false;
		}
		$(".errmsg").hide();
		$(".suerrmsg").hide();
		var data = $("#ask_question_form").serialize();
		$.ajax({
			url: '../beta/asktutor_ajax.php',
			type: 'POST',
			data: {formdata:data, req_from:'ajax'},
			beforeSend: function(){
				$.getScript("../resources/user/js/jquery.loadmask.min.js").done(function() {
					$(".modal-content").mask("Please Wait...");	
				});
			},
			success: function(res){
				$(".modal-content").unmask("Please Wait...");
				if(res !== ''){
					$(".subjectdrop").hide();
					$(".reset,.submit").hide();
					$(".b_close").show();
					$("#topicmsg").hide();
					$("#thanksmsg").show();
					$("#thanksmsg").html('<p>'+res+'</p><hr><button data-dismiss="modal" class="btn btn-default popup_cancel" type="button"><i class="fa fa-times"></i> Cancel</button>');
					$(".modal-footer").hide();
					$(".main_close").addClass('succ_close');
					$(".popup_cancel").html('<i class="fa fa-times"></i> Close');
					
				}
			}
		});
		return false;
	});	
	
	$('#myModal').on('click', '.succ_close', function(){
		window.location.reload(); 
	});
	
	
	/* SIDE BAR JS SCRIPT */
	
		$("#asktutor_sidebar").append('<ul class="mainul"></ul>');
		/// generating bars
		$(".mainul").append("<li class='list' >" + '<ul class="scli" style="background-color:#FF9908">' +
		'<li >Ask a Doubt<img src="images/doubt-icon.png"/></li></ul></li>');
			/// bar click event
			$(".scli").click(function(){
				var link = $(this).text();		
			});

			/// mouse hover event
			$(".scli").mouseenter(function() {	
				$(this).stop(true);	
				$(this).clearQueue();
				$(this).animate({
				right : "153px"
				}, 300);
			});

			/// mouse out event
			$(".scli").mouseleave(function(){
				$(this).animate({
				right:"0px"
				},700);
			});
			$( ".mainul > li:eq(0)" ).addClass('first');
			
			$("#ask_dashboard").on('click', function(){
				$("#askModal").modal();
				hidesome();
			});
			
			$(".first").on('click', function(){
				var pagename = $("#asktutor_sidebar").attr('class');
				if(pagename === "searchpage_and_advance"){
					 $(".subjectdrop").show();
                     $("#subjectdropdown").val(1);
					 $("#subject_name").hide();
				}else if(pagename === "topics"){
					 $(".subjectdrop").hide();
                     $("#subjectdropdown").val('');
					 $("#subject_name").show();
				}
				$("#askModal").modal();
				hidesome('side');
			});