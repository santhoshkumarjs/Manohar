<?php
   $category_sql = "select id,name from category where status = 'active'";
   $art_category_data = $db['master']->getResults($category_sql);  
?>

<ul class="nav navbar-nav">
	<!-- Pages -->
	<li class="dropdown">
		<a href="art.php" class="dropdown-toggle" data-hover="dropdown" data-toggle="dropdown">
			Art <i class="fa fa-caret-down"></i>
		</a>
		<ul class="dropdown-menu">
			<li><a href="art.php" class="dropdown-toggle">All</a></li>
			<?php foreach($art_category_data as $cdata){ ?>
			<li><a href="art.php?cid=<?php echo $cdata['id'];?>"><?php echo $cdata['name']; ?></a></li>
			<?php } ?>				
		</ul>
	</li>
	<!---
	<li>
		<a href="print.php" class="dropdown-toggle">print</a>
	</li>--->
	<li>
		<a href="artist.php" class="dropdown-toggle">artist</a>
	</li>
	
	

	<li class="dropdown">
		<a href="gallery.php" class="dropdown-toggle">gallery</a>
	</li>
	<li>
		<a href="soon.php" class="dropdown-toggle">Art Vacation</a>
	</li>
	<li class="dropdown">
		<a href="more.php" class="dropdown-toggle" data-hover="dropdown" data-toggle="dropdown">
			more <i class="fa fa-caret-down"></i>
		</a>
		<ul class="dropdown-menu">
			<li><a href="soon.php">Gift Vouchers</a></li>
			<li><a href="soon.php"> Artify</a></li>			
			<li><a href="soon.php"> Events</a></li>
		</ul>
	</li>
	<!-- End Clothes -->
</ul>