<?php $fname = basename($_SERVER['PHP_SELF']);  ?>			
			<div class="artist_banner" style="background: #fff;">
				<img class="img-responsive author_banner" src="resources/uploads/artists/<?php echo $data['bannerimage'];?> " alt="artworks" title="art works" />
				<div class="container-fulid">
					<div class="container" >
						<div class="banner_content">
							<div class="col-md-2 padd0">
								<img class="artist_image" src="resources/uploads/artists/<?php echo $data['thumbimage']; ?>" alt="<?php echo $data['name']; ?>" title="<?php echo $data['name']; ?>" />	
							</div>
<div class="col-md-10 artist_detail padd0"> 
	<p class="artist_content"><b><?php echo $data['name']; ?></b> &ndash; Born in <?php echo date('Y', strtotime($data['dob'])); ?> at <?php echo $data['city'].",".$data['state']; ?> </br>Based in <?php echo ucfirst($data['country']); ?></br></p>
	<ul class="social_media padd0" >
		<li class="circle artist_follow">
		<a href="<?php echo $data['facebook']; ?>" title="facebook" target="blank"><i class="ti-facebook"></i></a></li>
		<li class="circle artist_follow"><a href="<?php echo $data['twitter']; ?>" title="twitter" target="blank">
		<i class="ti-twitter-alt"></i></a></li>
		<li class="circle artist_follow"><a href="<?php echo $data['googleplus']; ?>" title="google+" target="blank">
		<i class="ti-google"></i></a></li>
		<li class="circle artist_follow"><a href="<?php echo $data['printrest']; ?>" title="pinterest" target="blank">
		<i class="ti-pinterest"></i></a></li>
	</ul>
								<div class="viewall mobile-view" ><a href="artist.php">VIEW ALL</a></div>
							</div>
						</div>
					</div>
					<div class="clearfix"></div>
<div class="nav_step">
	<div class="viewall web-view" ><a href="artist.php">VIEW ALL</a></div>
	<div class="container padd0">
		<ul id="tabs">
			<li <?php if($fname == 'author.php') echo 'class="active"'; ?>>
			<a href="author.php?id=<?php echo $aid; ?>">Overview</a></li>
			<li <?php if($fname == 'sale.php') echo 'class="active"'; ?>>
			<a href="sale.php?aid=<?php echo $aid; ?>">Artworks for sale</a></li>
			<li <?php if($fname == 'sold.php') echo 'class="active"'; ?>>
			<a href="sold.php?aid=<?php echo $aid; ?>">Sold Artworks</a></li>
			<li <?php if($fname == 'spfe.php') echo 'class="active"'; ?>>
			<a href="spfe.php?aid=<?php echo $aid; ?>">Special Features</a></li>
		</ul>
	</div>
</div>			
				</div>
			</div>