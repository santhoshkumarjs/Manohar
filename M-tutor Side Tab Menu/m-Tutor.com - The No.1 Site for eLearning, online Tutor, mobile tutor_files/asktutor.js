 function hidesome(from_p, pagename){
	$("#topicmsg").show();
	$("#thanksmsg").hide();
	$("#thanksmsg").text('');
	$("#question").val('');
	$(".modal-footer").show();
	$(".errmsg").hide();
	$(".popup_cancel").html('<i class="fa fa-times"></i> Cancel');
	$("#ask_submit").show();
	if($(".modal-content").find(':hidden').hasClass('subjectdrop')){
	   if(pagename == 'betaindex' || pagename == 'search_and_advance' || pagename == 'dashboard'){
		$("#subject_dropdown_div").show();
		$("#subject_dropdown").val('');
		$('#subject_dropdown').selectpicker('refresh');
	   }
		$(".suerrmsg").hide();
	}
	if(from_p === 'side'){
		$("#topic_name").hide();
		$("#topicid").val('');
	}
	$("#captcha_div").show();
	$("#captcha_key").val('');
    
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
				$(".suerrmsg").html('<a href="#" class="close" aria-label="close" title="close">×</a>Please select subject');
				$(".suerrmsg").show();
				return false;
			}		   
		}	
		
		if(ques === ''){
			$(".errmsg").html('<a href="#" class="close" aria-label="close" title="close">×</a>Enter Your Questions');
			$(".errmsg").show();
			$(".suerrmsg").hide();
			return false;
		}
		var captcha_key = $("#captcha_key").val();
		if(captcha_key === '') {
			$(".suerrmsg").html('<a href="#" class="close" aria-label="close" title="close">×</a>Please enter Captcha');
			$(".suerrmsg").show();
			$(".errmsg").hide();
			return false;			
		}	
			
		$(".errmsg").hide();
		$(".suerrmsg").hide();
		var data = $("#ask_question_form").serialize();		
		var isValidCaptcha = 'invalid';
		$.ajax({
			url: 'validate_captcha.php',
			type: 'POST',
			data: data,
			success: function(res){
				if(res == 'valid') {
						$.ajax({
							url: 'asktutor_ajax.php',
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
									$("#captcha_div").hide();
								}
							}
						});					
				} else {
				    $("#captcha_img").attr("src", "captcha.php?"+Math.random());
					$(".suerrmsg").html('<a href="#" class="close" aria-label="close" title="close">×</a>Invalid Captcha');
					$(".suerrmsg").show();			
					return false;
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
		$(".mainul").append("<li class='list' >" + '<ul class="scli" style="background-color:#03a9f4;right:100px;">' +
		'<li >Assessment<img src="images/assessment-icon.png"/></li></ul></li>');
		
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
			$( ".mainul > li:eq(1)" ).addClass('second');
			
			$(".second").on('click', function(){
			  window.location.href = 'http://online.m-tutor.com/mtutor/assessment'; 
			  //window.open('http://online.m-tutor.com/mtutor/assessment');
			});
			
			$(".first").on('click', function(){
				var pagename = $("#asktutor_sidebar").attr('class'); console.log(pagename);
				if(pagename == "search_and_advance"){
					 $("#subject_dropdown_div").show();
                     $("#subjectdropdown").val(1);
					 $("#subject_name").hide();
				}else if(pagename == "topics"){
					 $("#subject_dropdown_div").hide();
                     $("#subjectdropdown").val('');
					 $("#subject_name").show();
				}else if(pagename == "betaindex"){
				    $("#subject_dropdown_div").show();
                     $("#subjectdropdown").val(1);
					 $("#subject_name").hide();
				}
				$("#askModal").modal();
				
				hidesome('side', pagename);
			});
			
$("#new_captcha").click(function() {
	$("#captcha_img").attr("src", "captcha.php?"+Math.random());
}); 			

$('#askModal').on('show.bs.modal', function (e) {
	$("#captcha_img").attr("src", "captcha.php?"+Math.random());
});					

$(document).on('click', '.alert .close', function(e) {
	$(this).parent().hide();
});	
