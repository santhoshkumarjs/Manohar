<?php $url = basename($_SERVER['REQUEST_URI'], '?' . $_SERVER['QUERY_STRING']); ?>
<header>
	<div class="navbar navbar-default" role="navigation">		
		<div class="container">
			<!-- Toggle Btn -->
			<div class="navbar-header">
			 <button data-target=".navbar-collapse" data-toggle="collapse" class="navbar-toggle collapsed" type="button">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			  </button>
				<a href="dashboard.php" class="navbar-brand"> <img src="resources/images/mtutor-logo.png"> </a>
			</div>
			<div class="navbar-collapse collapse">
			  <ul class="nav navbar-nav navbar-right">
				<li>  <a  href="#"> Welcome! admin </a> </li>
				<li><a  href="logout.php"><i class="fa fa-lock"> </i> Sign Out </a></li>
			  </ul>					  
			</div>
		</div>
	</div><!--header end-->
	
<div class="menu container-fluid" id="nav">
<ul id="breadcrumb">
	<li><a <?php if($url == "dashboard.php")echo "class='active'"; ?> href="dashboard.php">
		<span class="fa fa-university"></span> Category </a></li>
	<li><a <?php if($url == "product.php" || $url == 'editproduct.php')echo "class='active'"; ?> href="product.php">
	        <span class="fa fa-folder-open"></span> Product </a></li>
	<li><a <?php if($url == "artist.php" || $url == "editartist.php")echo "class='active'"; ?>  href="artist.php">
		<span class="fa fa-bars"></span> Artist </a></li>
	<li><a <?php if($url == "user.php")echo "class='active'"; ?> href="user.php"><span class="fa fa-user"></span> User </a></li>
	<!--<li><a href="order.php"><span class="fa fa-shopping-basket"></span> Order </a></li>-->
	<li><a <?php if($url == "banner.php")echo "class='active'"; ?> href="banner.php"><span class="fa fa-list-alt"></span> Banner </a></li>
	<li><a <?php if($url == "pricerequest.php")echo "class='active'"; ?> href="pricerequest.php"><span class="fa fa-list-alt"></span> Price Request </a></li>
	<li><a <?php if($url == "faq.php")echo "class='active'"; ?> href="faq.php"><span class="fa fa-list-alt"></span> Faq </a></li>	
	<li><a <?php if($url == "newsletter.php")echo "class='active'"; ?> href="newsletter.php"><span class="fa
	fa-list-alt"></span> News Letter </a></li>	
	<li><a <?php if($url == "contactus.php")echo "class='active'"; ?> href="contactus.php"><span class="fa fa-list-alt"></span> Contact Us </a></li>		
</ul>
<ul id="breadcrumb" style="margin-right:0px;float: right;">
</ul>
</div>
	</header>