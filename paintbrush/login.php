<?php  require 'framework/initialise/framework.init.php'; 
     $_SESSION['pr'] = "pr".$request['id'];
?>	
	<div class="modal-dialog" id="login-modal" >		
		<div class="modal-content">
			<div class="modal-header" align="center">
				<img id="img_logo" src="resources/images/paintbrush-logo.png">				
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="$('#login-modal').removeData('bs.modal'); ">
					<span class="ti-close" aria-hidden="true"></span>
				</button>
			</div>
                
			<!-- Begin # DIV Form -->
			<div id="div-forms">
			
				<!-- Begin # Login Form -->
				<form id="login-form" method='post'>				
					<div class="modal-body">
						<div id="div-login-msg">
							<div id="icon-login-msg" class="ti-angle-right"></div>
							<span id="text-login-msg">Type your E-mail and Password.</span>
						</div>
						<input name="email" id="login_email" class="form-control" type="email" placeholder="E-mail" required>
						<input name="password" id="login_password" class="form-control" type="password" placeholder="Password" required>
						<div class="checkbox">
							<label>
								<input type="checkbox"> Remember me
							</label>
						</div>
					</div>
					<div class="modal-footer">
						<div><!--
							<button type="submit" name="submit" value="login" class="btn btn-primary btn-lg btn-block">Login</button>-->
							<button type="submit" class="btn btn-primary btn-lg btn-block">Login</button>
						</div>
						<div>
							<button id="login_lost_btn" type="button" class="btn btn-link">Forgot Password?</button>
							<button id="login_register_btn" type="button" class="btn btn-link">Register</button>
						</div>
					</div>
			
			</form>
				<!-- End # Login Form -->
				
				<!-- Begin | Lost Password Form -->
				<form id="lost-form" style="display:none;" onsubmit="return forgot();">
					<div class="modal-body">
						<div id="div-lost-msg">
							<div id="icon-lost-msg" class="ti-angle-right"></div>
							<span id="text-lost-msg">Type your E-mail.</span>
						</div>
						<input id="lost_email" class="form-control" type="text" placeholder="E-Mail" required>
					</div>
					<div class="modal-footer">
						<div>
							<button type="submit" class="btn btn-primary btn-lg btn-block">Send</button>
						</div>
						<div>
							<button id="lost_login_btn" type="button" class="btn btn-link">Log In</button>
							<button id="lost_register_btn" type="button" class="btn btn-link">Register</button>
						</div>
					</div>
				</form>
				<!-- End | Lost Password Form -->
				
				<!-- Begin | Register Form -->
				<form id="register-form" name="register-form" style="display:none;" action="ajax/add.php" onsubmit="return validateregform();">
					<div class="modal-body">
						<div id="div-register-msg">
							<div id="icon-register-msg" class="ti-angle-right"></div>
							<span id="text-register-msg">Register an account.</span>
						</div>
						
						<input id="username" name="name" class="form-control" type="text" placeholder="Name" required maxlength="30" pattern="^[A-Za-z .]+$" title="No special characters/Numbers">
						
						<input id="register_email" name="email" class="form-control" type="email" placeholder="E-Mail" required style="margin-top:10px" onblur>
						
						<input id="register_password" name="password" class="form-control" type="password" placeholder="Password" required minlength="6">
						
					</div>
					<div class="modal-footer">
						<div>
							<button type="submit" value="register" name="submit" class="btn btn-primary btn-lg btn-block">Register</button>
						</div>
						<div>
							<button id="register_login_btn" type="button" class="btn btn-link">Log In</button>
							<button id="register_lost_btn" type="button" class="btn btn-link">Lost Password?</button>
						</div>
					</div>
				</form>
				<!-- End | Register Form -->
				
			</div>
			<!-- End # DIV Form -->
        </div>
	</div>        
	
<script>
function forgot(){
	regemail = $("#lost_email").val();
$.ajax({
	url: "ajax/check.php?check=sendPassword&email="+regemail, 
	async : false,			
	success: function(result){
		//if(result == 'noemail'){
		if(result == 'noemail'){
			$("#text-lost-msg").text("Email does not exist");
		}else{
			$("#text-lost-msg").text("Email sent to your mailid");
		}
	}	
	});	
	return false;
}		
function validateregform(){
	regemail = $('#register_email').val();
    var status;
	$.ajax({
			url: "ajax/check.php", 
			async : false,
			data:{
				check:'emailExist', 
				email: regemail, 
				},				
			success: function(result){										
				if(result == 'true'){
					alert("EmailID already Exist");
					status = result;
					return false;
					
			}	}				
		});	
		if(status == 'true')
			return false;
}	
	
		$(function() {
    
    var $formLogin = $('#login-form');
    var $formLost = $('#lost-form');
    var $formRegister = $('#register-form');
    var $divForms = $('#div-forms');
    var $modalAnimateTime = 300;
    var $msgAnimateTime = 150;
    var $msgShowTime = 2000;
	
  $("form").submit(function () {
        switch(this.id) {
            case "login-form":
                var $lg_email=$('#login_email').val();
                var $lg_password=$('#login_password').val();
								
				$.ajax({
						url: "ajax/add.php", 
						async : false,
						data:{
							submit:'login', 
							email: $lg_email, 
							password: $lg_password,							
							},				
						success: function(result){										
                          if(result == "fail"){
							  msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "E-MailID and Password Mismatch");
						  }else if(result == "notexist"){
							 msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "This E-mail ID is not registered yet");
						  }else{
							  <?php if(isset($_SESSION['prev_page'])){ ?>							     
								  window.location = "<?php echo $_SESSION['prev_page']; ?>";
							  <?php }else{ ?>							  
							    window.location = "account.php";
							  <?php } ?>							 
						  }
						}					
					});					
				
				/*
                if ($lg_username == "ERROR") {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                } else {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
                } */
                return false;
		}	});		
				
/*
    $("form").submit(function () {
        switch(this.id) {
            case "login-form":
                var $lg_username=$('#login_username').val();
                var $lg_password=$('#login_password').val();
                if ($lg_username == "ERROR") {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                } else {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
                }
                return false;
                break;
            case "lost-form":
                var $ls_email=$('#lost_email').val();
                if ($ls_email == "ERROR") {
                    msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "error", "glyphicon-remove", "Send error");
                } else {
                    msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "success", "glyphicon-ok", "Send OK");
                }
                return false;
                break;
            case "register-form":
                var $rg_username=$('#register_username').val();
                var $rg_email=$('#register_email').val();
                var $rg_password=$('#register_password').val();
                if ($rg_username == "ERROR") {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register error");
                } else {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "glyphicon-ok", "Register OK");
                }
                return false;
                break;
            default:
                return false;
        }
        return false;
    });
    */
    $('#login_register_btn').click( function () { modalAnimate($formLogin, $formRegister) });
    $('#register_login_btn').click( function () { modalAnimate($formRegister, $formLogin); });
    $('#login_lost_btn').click( function () { modalAnimate($formLogin, $formLost); });
    $('#lost_login_btn').click( function () { modalAnimate($formLost, $formLogin); });
    $('#lost_register_btn').click( function () { modalAnimate($formLost, $formRegister); });
    $('#register_lost_btn').click( function () { modalAnimate($formRegister, $formLost); });
    
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
    }
});
	</script>
	<script>
	/*
		$(document).ready(function validation() {
			$("#register-form").validate({
				rules: {
					username: {
						required: true
					},		
				},
				messages: {							
				}
			});
		});  */
	</script>	