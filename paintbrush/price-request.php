<?php  require 'framework/initialise/framework.init.php'; 
	$id = $request['id'];
	$code = urldecode($request['code']);
	
//$_SESSION['pr'] = basename($_SERVER['REQUEST_URI']);
$sql = "select * from users where id = ".$_SESSION['user_id'];
$data = $db['master']->getOneRow($sql);	
$psql = "select size from product where id = ".$id;
$pdata = $db['master']->getOneRow($psql);	
//print_r($pdata);
?>
	<div class="modal-dialog" id="submit_modal">		
		<div class="modal-content">
			<div class="modal-header" align="center">
				<img id="img_logo" src="resources/images/paintbrush-logo.png">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="closePriceRequest();">
					<span class="ti-close" aria-hidden="true"></span>
				</button>
			</div>
                
			<!-- Begin # DIV Form -->
			<div id="div-forms">
				<!-- Begin # Submit Form -->

			<form id="submit_form">
			
					<div class="modal-body">
						<div id="div-login-msg">
							<div id="icon-login-msg" class="ti-angle-right"></div>
							<span id="text-login-msg">Price On Request.</span>
						</div>
						<div class="border margin10">
							<p class="pad7 text-center"><b>Product Code:</b> <?php echo $code; ?> </p>
							<!---<input type="hidden" name="productID" value="<?php //echo $id; ?>">-->
						</div>
						<div class="margin10">
							<p class="pad7 text-left"><span style="color:red">*</span> All fields are mandatory <?php echo $_SESSION['Price_Dialog_url']; ?> </p>
							<!---<input type="hidden" name="productID" value="<?php //echo $id; ?>">-->
						</div>
						<div class="row">
							<div class="col-md-6 margin10">
								<input id="username" class="form-control" value="<?php echo $data['name'];?>" type="text" placeholder="Name" required>
							</div>
							<div class="col-md-6 margin10">
								<input id="mobile_no" class="form-control" type="text" placeholder="Mobile No" required>
							</div>
							<div class="col-md-6 margin10">
								<input id="email_id" class="form-control" type="email" placeholder="E-mail id" value="<?php echo $data['emailid'];?>" required>
							</div>
							<div class="add-Frame col-md-6 margin10">
							<input id="select_size" name="select_size" class="form-control" type="text" value="<?php echo htmlentities($pdata['size']);?>" readonly>														
							</div>
						</div>
						<textarea id="your_message" class="form-control" type="textarea" placeholder="Write Your Message" required style="resize:none" /></textarea>
					</div>
					<div class="modal-footer">
						<div><!---
							<button type="submit" class="btn btn-primary btn-lg btn-block">Send Email & SMS</button>-->	
			<input type="hidden" name="pid" id="pid" value="<?php echo $id; ?>">
			<button type="button" class="btn btn-primary btn-lg btn-block" id="send-req" onclick="save();">Send Request</button>												
						</div>
					</div>
				</form>
				<!-- End # Login Form -->
			</div>
			<!-- End # DIV Form -->
        </div>
	</div>      
<style>
	.border{border: 2px solid #f1f1f1;}
	.pad7{padding: 7px 0px;margin-bottom: 0px;}
</style>

<script>
function closePriceRequest(){
	$('#submit_form').removeData('bs.modal');               				   
}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);    
    return pattern.test(emailAddress);
};

function isSpclChar(data){
	var iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?";
for (var i = 0; i < data.length; i++) {
    if (iChars.indexOf(data.charAt(i)) != -1) {
		alert ("The name field has special characters. \nThese are not allowed.\n");
		return false;
        }
    }
} 
function isNormalInteger(str) {
    return /^\+?\d+$/.test(str);
}
function save(){	
	var username = $('#username').val();
	var mobile_no = $('#mobile_no').val();
	var email_id = $('#email_id').val();
	var size = $('#select_size').val();
	var message = $('#your_message').val();	
	var pid = $('#pid').val();	
	//$("#submit_form").modal('hide');
	//alert(mobile_no.length); return false;	

	if(username == ""){ alert("please enter name"); return false; }
	if(isSpclChar(username)){alert("User Name has Special characters"); return false; }
	if(mobile_no.length != 10){ alert("please enter valid mobile number"); return false; }	
	if(!isNormalInteger(mobile_no)){ alert("please enter valid mobile number"); return false; } 
	if(email_id == ""){ alert("please enter email"); return false; }	
	if(!isValidEmailAddress(email_id)){
		alert("Invalid Email Address");
		return false;
	}
	/*
    if(size == ""){
		alert("Please select size");
		return false;
	}	*/
    if(message.trim() == ""){	
		alert("Please Enter Message");
		return false;
	}
    if(message.length > 500 ){
		alert("Please Enter Less than 500 Characters");
		return false;		
	}	
	$('#send-req').attr("disabled",true);
	$.ajax({
			url: "ajax/add.php", 
			data:{
				submit : 'pricerequest', 
				username : username, 
				emailid : email_id,							
				size : size,
				msg : message,
				msisdn : mobile_no,
				pid : pid
				},				
			success: function(result){	
			  //alert(result);
				//console.log(result);
			  if(result == "success"){
				  $('#send-req').html('Request sent successfully');
					$('#send-req').prop('onclick',null).off('click');
					$('.close').trigger('click');
					/*
					$('#username').val('');
					$('#mobile_no').val('');
					$('#email_id').val('');
					$('#select_size').val('');
					$('#your_message').val('');	*/
					$('#submit_form').removeData('bs.modal');               				   
				//msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Successful1");							  
			  }else{
				 //$('#send-req').attr("disabled",false);
				 //msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "unsuccessful");							  							  
			  }
			}					
		});	

}
$(function() {    
    var $formLogin = $('#submit_form');
	/*
    var $divForms = $('#div-forms');
    var $modalAnimateTime = 300;
    var $msgAnimateTime = 150;
    var $msgShowTime = 2000;*/

    $("form").submit(function () {	

                var username = $('#username').val();
				var mobile_no = $('#mobile_no').val();
				var email_id = $('#email_id').val();
				var size = $('#select_size').val();
				var message = $('#your_message').val();				
								
				$.ajax({
						url: "ajax/add.php", 
						data:{
							submit : 'pricerequest', 
							username : username, 
							emailid : email_id,							
							size : size,
							msg : message,
							msisdn : mobile_no
							},				
						success: function(result){						
                          if(result == "success"){
							//msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Successful1");							  
						  }else{
							 //msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "unsuccessful");							  							  
						  }
						}					
					});	
					
/*	            $('#username').val('');
			$('#mobile_no').val('');
			$('#email_id').val('');
			$('#select_size').val('');
			$('#your_message').val('');						            
			*/
    });
    
/*	
    $('#login_register_btn').click( function () { modalAnimate($formLogin, $formRegister) });
    $('#register_login_btn').click( function () { modalAnimate($formRegister, $formLogin); });
    $('#login_lost_btn').click( function () { modalAnimate($formLogin, $formLost); });
    $('#lost_login_btn').click( function () { modalAnimate($formLost, $formLogin); });
    $('#lost_register_btn').click( function () { modalAnimate($formLost, $formRegister); });
    $('#register_lost_btn').click( function () { modalAnimate($formRegister, $formLost); });
*/	
    /*
    function modalAnimate ($oldForm, $newForm) {
        var $oldH = $oldForm.height();
        var $newH = $newForm.height();
        $divForms.css("height",$oldH);
        $oldForm.fadeToggle($modalAnimateTime, function(){
            $divForms.animate({height: $newH}, $modalAnimateTime, function(){
                $newForm.fadeToggle($modalAnimateTime);
            });
        });
    }
    
    function msgFade ($msgId, $msgText) {
        $msgId.fadeOut($msgAnimateTime, function() {
            $(this).text($msgText).fadeIn($msgAnimateTime);
        });
    }
    
    function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
        var $msgOld = $divTag.text();
        msgFade($textTag, $msgText);
        $divTag.addClass($divClass);
        $iconTag.removeClass("glyphicon-chevron-right");
        $iconTag.addClass($iconClass + " " + $divClass);
        setTimeout(function() {
            msgFade($textTag, $msgOld);
            $divTag.removeClass($divClass);
            $iconTag.addClass("glyphicon-chevron-right");
            $iconTag.removeClass($iconClass + " " + $divClass);
  		}, $msgShowTime);
    }  */
});
</script>
	<style>
		#submit_form{z-index:99990;top: 50px; outline: 0px;}
		.margin10{margin: 10px 0px;}
		#select_size{border: 1px solid #ccc;padding: 5px 7px;}
		.modal {overflow: auto !important;}
	</style>
