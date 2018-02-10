	<footer id="footer"><!--Footer-->		
		<div class="footer-widget">
			<div class="container">
				<div class="row mrg_0">
					<div class="col-sm-3 col-xs-6">
						<div class="single-widget">
							<h2>Service</h2>
							<ul class="nav nav-stacked">								
								<li><a href="support.php">Support</a></li>
								<li><a href="requeststatus.php">Request Status</a></li>
								<li><a href="faq.php">FAQ’s</a></li>
							</ul>
						</div>
					</div>
					<div class="col-sm-3 col-xs-6">
						<div class="single-widget">
							<h2>Policies</h2>
							<ul class="nav nav-stacked">
								<li><a href="terms.php">Terms and condition </a></li>
								<li><a href="policy.php">Privacy Policy</a></li>
							</ul>
						</div>
					</div>
					<div class="col-sm-3 col-xs-6">
						<div class="single-widget">
							<h2>About</h2>
							<ul class="nav nav-stacked">
								<li><a href="testimonial.php">Testimonials</a></li>
								<li><a href="contact.php">Contact Us</a></li>
							</ul>
						</div>
					</div>
					<div class="col-sm-3 col-xs-12">
						<div class="single-widget">
							<h2>newsletter</h2>
							<div class="searchform">
							<!--<form action="#" class="searchform">-->
								<input type="text" name="newsletter" id="newsletter" placeholder="Your email address" onkeydown="if (event.keyCode == 13) savesnews();" />
								<button type="button" class="btn btn-default" onclick="savesnewsletter();">
								<i class="fa fa-arrow-circle-o-right"></i></button>
								
								<!-- Error Message for Newsletter -->
								<div id="news_msg" style="color: white;padding: 7px 7px;background: green;border-radius: 6px;margin-top: 10px;display:none"></div>
								
								<p>Get the most recent updates from <br />our site and be updated your self...</p>
							<!--</form>--></div>
						</div>
						<div class="clearfix"></div>
						
							
					</div>
					
				</div>
			</div>
		</div>
		
		<div class="footer-bottom">
			<div class="container">
				<div class="row">
					<div class="col-md-6 col-sm-6">
						<p class="pull-left">Copyright © 2017 paintbrush Inc. All rights reserved.</p>
					</div>
					<div class="col-md-6 col-sm-6">
						<!--<div class="pay_cards">
							<img class="img-responsive" src="resources/images/cards/payment.png" />
						</div>-->
						<div class="pull-right">
							<ul class="social_media padd0">
								<li class="circle"><a href="<?php echo FACEBOOK; ?>" title="facebook" target="blank"><i class="ti-facebook"></i></a></li>
								<li class="circle"><a href="<?php echo TWITTER; ?>" title="twitter" target="blank"><i class="ti-twitter-alt"></i></a></li>
								<li class="circle"><a href="<?php echo GOOGLEPLUS; ?>" title="google+" target="blank"><i class="ti-google"></i></a></li>
								<li class="circle"><a href="<?php echo PRINTREST; ?>" title="pinterest" target="blank"><i class="ti-pinterest"></i></a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</footer><!--/Footer-->
		
<script>
function savesnews(){
   savesnewsletter();
   
}
function savesnewsletter(){
	email = $('#newsletter').val();
	if(!isValidEmailAddress(email)){
		$('#news_msg').html("<i class='fa fa-exclamation-triangle'></i> Please Enter Valid Email");
		$('#news_msg').css("background", "red");
		$('#news_msg').show();
		return false;
	}
$.ajax({
	url: "ajax/add.php", 
	async : false,
	data:{
		submit:'newsletter', 
		email: email, 
		},				
	success: function(result){
		if(result == '1') {
			$('#news_msg').html("<i class='fa fa-check'></i> Email Added Successfully");
			$('#news_msg').css("background", "green");
			$('#news_msg').show();
		} else {
			$('#news_msg').html("<i class='fa fa-exclamation-triangle'></i> Email Already Subscribed");
			$('#news_msg').css("background", "red");
			$('#news_msg').show();
		}
	}					
});	
}
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);    
    return pattern.test(emailAddress);
};

/*
   = "if (event.keyCode == 13)
                        document.getElementById('btnSearch').click()"
*/					
</script>	