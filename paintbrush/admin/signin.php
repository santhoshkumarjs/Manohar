 <?php 
include_once ('../framework/initialise/framework.init.php');
	global $db, $request; 
	session_start();
	$error="";  

	console(LOG_LEVEL_INFO, "UserAction user entered into the view/signin.php");	
	
	
	if(isset($request['login']))
	{
		//echo "SELECT * FROM appusers WHERE emailid = '".$request['email']."' AND password = '".md5($request['password'])."' AND status = 'active'"; */
	$loginResult = $db['master']->getOneRow("SELECT * FROM appusers WHERE emailid = '".$request['email']."' AND password = '".md5($request['password'])."' AND status = 'active'");

    console(LOG_LEVEL_INFO, "UserAction - request parameter ".var_export($request,true));	
	
	if($loginResult)
	{
		$_SESSION['isloggedin'] ='yes';
		$_SESSION['iduser'] = $loginResult['idusers'];
		$_SESSION['username'] = $loginResult['username'];
		$_SESSION['emailid'] = $loginResult['emailid'];
		$_SESSION['usertype'] = $loginResult['user_type'];
		$_SESSION['time_loggedin'] = time();
		$_SESSION['last_loggedin'] = $loginResult['last_loggedin'];
		
		console(LOG_LEVEL_INFO, "UserAction - session parameter ".var_export($_SESSION,true));	
		
		$db['master']->query("UPDATE appusers SET last_loggedin=CURRENT_TIMESTAMP WHERE idusers = ".$loginResult['idusers']);

		if($_SESSION['usertype'] == "admin" || $_SESSION['usertype'] == "mtutoradmin" || $_SESSION['usertype'] == "content"|| $_SESSION['usertype'] == "mtutor")
		{ 
			header("Location: dashboard.php");
		}
	}
	else
	{
		$error = "Please check your Email ID OR Password";
	}
 }

 ?>
<!DOCTYPE html>
<html><head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Paintbrush</title>
<!-- CSS -->
<link href="../resources/css/bootstrap.css" rel="stylesheet">
<link rel="stylesheet" href="../resources/css/bootstrap-theme.min.css">
<style>body { 
  background: url(../resources/images/login-bg.jpg) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.panel-default {
opacity: 0.9;
margin-top:30px;
}
</style>
<!-- Mainly scripts -->   
<script src="../resources/js/jquery.min.js"></script>   
<script src="../resources/js/jquery.validate.js" ></script>

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	<script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
<![endif]-->
<script>
	$(document).ready(function(){
		jQuery.validator.addMethod("validateMail", function(value, element) {
				 var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
				return expr.test(value);
		}, "Please specify the correct email");
			$('#myForm').validate({
				rules: {
					Email: {
						required: true,
						validateMail:true
					},
					password: {
						required: true
					}
				},
				messages:{
					Email:"Enter Your Valid Email ID",
					password:"Enter your valid password"			
				},
			});

		});
	</script>

</head>
<body>
	<div class="container">
		<?php 
			if($error != "") { ?>
			<div class="alert text-center  alert-warning alert-dismissible" role="alert">
			<!--  <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>   -->
			  <strong> <i class ="fa fa-warning"> </i> <?php echo $error; ?> </strong>
			</div>
		<?php } ?>
	
    <div class="row">
        <div class="col-md-4 col-md-offset-7">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <span class="glyphicon glyphicon-lock"></span> Login</div>
                <div class="panel-body">
                    <form class="form-horizontal" role="form" method="post">
                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">
                            Email</label>
                        <div class="col-sm-9">
                            <input type="email" class="form-control" id="email" name="email" placeholder="Email" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputPassword3" class="col-sm-3 control-label">
                            Password</label>
                        <div class="col-sm-9">
                            <input type="password" class="form-control" id="password" name="password" placeholder="Password" required>
                        </div>
                    </div>
                   <!-- <div class="form-group">
                        <div class="col-sm-offset-3 col-sm-9">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox"/>
                                    Remember me
                                </label>
                            </div>
                        </div>
                    </div> -->
                    <div class="form-group last">
                        <div class="col-sm-offset-3 col-sm-9">
                            <button type="submit" class="btn btn-success btn-sm" name="login" id="login">
                                Sign in</button>
                                 <button type="reset" class="btn btn-default btn-sm">
                                Reset</button>
                        </div>
                    </div>
                    </form>
                </div>
              <!--  <div class="panel-footer">
                    Not Registred? <a href="http://www.jquery2dotnet.com">Register here</a></div> -->
            </div>
        </div>
    </div>
</div>

	</body>
</html>