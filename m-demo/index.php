<?php
  if($_REQUEST['subject'] == '1'){
	  $page = "biology.html";
  }else if($_REQUEST['subject'] == '2'){ // CHEMISTRY
	  // for chemistry
  }else if($_REQUEST['subject'] == '3'){ // ENGLISH
	  $page = "english.html";
  }else if($_REQUEST['subject'] == '4'){ // HINDI
      // for hindi
  }else if($_REQUEST['subject'] == '5'){ // MATHS
		$page = "maths.html";
  }else if($_REQUEST['subject'] == '6'){ // PHYSICS
	$page = "physics.html";
  }
  
  if($page != ''){
	  header('location:'.$page); exit;
  }
?>
<!doctype html>
<html lang="en" class="no-js">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Mtutor Learning Demo</title>
	<link href='http://fonts.googleapis.com/css?family=Lora:400,700|Open+Sans:400,300,700' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="css/reset.css"> <!-- CSS reset -->
	<link rel="stylesheet" href="css/style.css"> <!-- Resource style -->	
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	
	<script src="js/modernizr.js"></script> <!-- Modernizr -->
</head>
<body class="textureBg">
	<a href="#cd-nav" class="cd-nav-trigger">
		Menu<span><!-- used to create the menu icon --></span>
	</a> <!-- .cd-nav-trigger -->	
	<main>
		<section class="cd-section index cd-selected">
	<!-- header -->
	<header>
		<div class="logo">
			<img src="images/logo1.png" alt="" title="">							
		</div> 
	</header><!-- /header -->	
	   <!-- Wrapper for slides -->
      <div class="carousel-inner" role="listbox">	  
        <div class="item active">
          <img src="images/banner1.jpg" alt="banner" width="100%" height="100%">
          <div class="carousel-caption">
            <h3>Stay Learned, Stay Ahead</h3>            
          </div>
        </div>
      </div>
	 <!-- main --> 
	<section class="container">
		<h3>M-Tutor Learning Demo</h3>
		<hr>
		<div class="row">
			<div class="col-sm-12">
				<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
				<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
				<p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
			</div>
		</div>	
	</section><!-- /Main -->
	</section> <!-- .cd-section -->
	</main>
	<!-- Side Nav Bar -->
	<nav class="cd-nav-container" id="cd-nav">
		<header>
			<h3>Navigation</h3>
			<a href="#0" class="cd-close-nav">Close</a>
		</header>
		<div class="main-form main-center">	
			<form class="" method="post" action="#">
				<div class="form-group form-group-main">
					<label for="sel1" class="cols-sm-2">Select Boards:</label>
					<div class="cols-sm-10 form-group-select">
						 <select class="form-control" id="sel1">
							<option value="">-- Select from Boards --</option>
							<option value="1">CBSE</option>
							<option value="2">Cambridge</option>
							<option value="3">ICSE</option>
						  </select>
					</div>
				</div>

				<div class="form-group form-group-main">
					<label for="sel2" class="cols-sm-2 control-label">Select Class:</label>
					<div class="cols-sm-10 form-group-select">
						<div class="form-group">
						  <select class="form-control" id="sel2">
							<option value="">-- Select from Class --</option>
							<option value="">Class 1</option>
							<option value="">Class 2</option>
							<option value="">Class 3</option>
							<option value="">Class 4</option>
							<option value="">Class 5</option>
							<option value="">Class 6</option>
							<option value="">Class 7</option>
							<option value="">Class 8</option>
							<option value="">Class 9</option>
							<option value="">Class 10</option>
							<option value="">Class 11</option>
							<option value="">Class 12</option>
						  </select>
						</div>
					</div>
				</div>

				<div class="form-group form-group-main">
					<label for="sel3" class="cols-sm-2 control-label">Select Subjects:</label>
					<div class="cols-sm-10 form-group-select">
						<div class="form-group">
						  <select class="form-control" name="subject" id="sel3">
							<option value="">-- Select from Subjects --</option>
							<option value="1">Biology</option>
							<option value="2">Chemistry</option>
							<option value="3">English</option>
							<option value="4">Hindi</option>
							<option value="5">Maths</option>
							<option value="6">Physics</option>
						  </select>
						</div>
					</div>
				</div>

				<div class="form-group form-group-main">
					<label for="sel4" class="cols-sm-2 control-label">Select Lesson:</label>
					<div class="cols-sm-10 form-group-select">
						<div class="form-group">
						  <select class="form-control" id="sel4">
							<option value="">-- Select from Lesson --</option>
							<option value="">Lesson 1</option>
							<option value="">Lesson 2</option>
							<option value="">Lesson 3</option>
							<option value="">Lesson 4</option>
							<option value="">Lesson 5</option>
							<option value="">Lesson 6</option>
							<option value="">Lesson 7</option>
							<option value="">Lesson 8</option>
							<option value="">Lesson 9</option>
							<option value="">Lesson 10</option>
							<option value="">Lesson 11</option>
							<option value="">Lesson 12</option>
						  </select>
						</div>
					</div>
				</div>

				<div class="form-group form-group-main">
					<label for="sel5" class="cols-sm-2 control-label">Select Worksheet:</label>
					<div class="cols-sm-10 form-group-select">
						 <select class="form-control" id="sel5">
							<option value="">-- Select from Worksheet --</option>
							<option value="">Worksheet 1</option>
							<option value="">Worksheet 2</option>
							<option value="">Worksheet 3</option>
							<option value="">Worksheet 4</option>
							<option value="">Worksheet 5</option>
							<option value="">Worksheet 6</option>
							<option value="">Worksheet 7</option>
							<option value="">Worksheet 8</option>
							<option value="">Worksheet 9</option>
							<option value="">Worksheet 10</option>
							<option value="">Worksheet 11</option>
							<option value="">Worksheet 12</option>
							<option value="">Worksheet 13</option>
							<option value="">Worksheet 14</option>
							<option value="">Worksheet 15</option>
							<option value="">Worksheet 16</option>
							<option value="">Worksheet 17</option>
							<option value="">Worksheet 18</option>
							<option value="">Worksheet 19</option>
							<option value="">Worksheet 20</option>
						  </select>
					</div>
				</div>

				<div class="form-group">
					<!--<a href="maths.html" type="button" id="button" class="btn btn-primary btn-lg btn-block login-button">Submit Form</a>-->
					<button type="submit" id="button" class="btn btn-primary btn-lg btn-block login-button">Submit</button>
				</div>
			</form>
		</div>						
		<p class="text-center">
			<small class="text-muted">Copyright © 2017 Mobile Tutor Private Ltd.</small>
		</p>
	</nav>
	<div class="cd-overlay"><!-- shadow layer visible when navigation is visible --></div>

<script src="js/jquery-2.1.1.js"></script>
<script src="js/main.js"></script> <!-- Resource jQuery -->
</body>
</html>