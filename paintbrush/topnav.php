<div class="header-v5 header-static header-fixed-shrink">
<!-- Navbar -->
<div class="navbar navbar-default navbar-custom navbar-fixed-top mega-menu" role="navigation">
	<!-- Topbar v3 -->
	<div class="topbar-v3">
		<div class="container">
			<div class="row padlr15">
				<div class="col-sm-8">
					<!-- Topbar Navigation -->
					<ul class="left-topbar">
						<li><a href="mailto:connect@paintbrush.ae">connect@paintbrush.ae</a></li>
						<!--<li><a href="callto:+91 98840 98840">+91 98840 98840</a></li>-->
						<li>Free shipping worldwide</li>
<?php if(isset($_SESSION['user_id'])){ 
		echo "<li>Welcome ".ucwords(strtolower($_SESSION['username']))."</li>";
		} ?>								
						
					</ul><!--end left-topbar-->
				</div>
				<div class="col-sm-4 tb_right">
				<?php // if(isset($_SESSION['user_id'])){ ?>
					<ul class="list-inline right-topbar pull-right">
<li>
	<div class="tbr-info">
		<span>
		<a><i class="fa fa-user"></i> Account <i class="fa fa-caret-down"></i></a>				
		</span>
		<div class="tbr-inner">
		<?php if(isset($_SESSION['user_id'])){  ?>
			<a href="account.php">My Account</a>
			<a href="wishlist.php">My Wishlist</a>
		<?php } ?>	
			<?php if(isset($_SESSION['user_id'])){ ?>
			<a href="logout.php">Logout</a>
			<?php  }else{ ?>
			<a href="login.php" data-toggle="modal" data-target="#login-modal" onclick="clearlogin();">
			Login
			</a>
			<?php } ?>
		</div>
	</div>
</li>
<!--
<?php  //if(isset($_SESSION['user_id'])){  ?>
						<li>
<div class="tbr-info topcart">
<span><a><i class="ti-shopping-cart"></i>My Cart (2)</a></span>

<div class="header-xtra pull-right">
	<div class="cart-info">
		<div>
			<div class="col-md-6 col-xs-6">
				<a href="soon.php" class="btn btn-grey">View Cart</a>
			</div>
			<div class="col-md-6 col-xs-6">
				<a href="soon.php" class="btn btn-grey">Checkout</a>
			</div>
		</div>								
		<small>You have <em class="highlight">2 item(s)</em> in your shopping bag</small>
	
		<div class="ci-item trash-header">
			<a href="art-inner.php"><img src="resources/images/art/01.jpg" width="80" alt=""/></a>
			<div class="ci-item-info">
				<h5><a href="art-inner.php">Lorem Ipsum is simply dummy</a></h5>
				<p>by Surendra Pal Singh</p>												
				<div class="ci-edit">
					<a href="#" class="edit"><i class="fa fa-heart"></i></a>
					<a href="#" class="edit trash"><i class="fa fa-trash-o"></i></a>
				</div>
			</div>
		</div>										
			<div class="ci-item trash-header">
				<a href="print-inner.html"><img src="resources/images/art/02.jpg" width="80" alt=""/></a>
				<div class="ci-item-info">
					<h5><a href="print-inner.html">Product fashion</a></h5>
					<p>by Surendra Pal Singh</p>
					<div class="ci-edit">
						<a href="#" class="edit"><i class="fa fa-heart"></i></a>
						<a href="#" class="edit trash"><i class="fa fa-trash-o"></i></a>
					</div>
				</div>
			</div>	
	</div>
</div>
</div>	
				</li>--> <?php //} ?>
				</ul> 
				</div>
			</div>
		</div><!--/container-->
	</div>
<!-- End Topbar -->
	<div class="container">
		<div class="row mrg_0">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand page-scroll" href="index.php">
					<img id="logo-header" class="mobileview" src="resources/images/paintbrush-logomobile.png" alt="Logo">
					<img id="logo-header1" class="webview" src="resources/images/paintbrush-logo.png" alt="Logo">
				</a>
			</div>
			<div id="sb-search" class="sb-search">
				<form method="get" action="search.php">
					<input class="sb-search-input" placeholder="Search By Title..." type="text" value="" name="search" id="search">
					<input class="sb-search-submit" type="submit" value="">
					<span class="sb-icon-search"></span>
				</form>
			</div>
			<script src="resources/js/classie.js"></script>
			<script src="resources/js/uisearch.js"></script>
			<script>
				new UISearch( document.getElementById( 'sb-search' ) );
			</script>
		<div class="collapse navbar-collapse navbar-responsive-collapse">
			<!-- Nav Menu -->
			<?php require 'menu.php'; ?>
			<!-- End Nav Menu -->
		</div>
	</div>
	</div>
</div>
<!-- End Navbar -->
</div>
<!-- End Header v5 -->
<script>
function clearlogin(){
	$("#login_email").val('');
	$("#login_password").val('');	
}
</script>