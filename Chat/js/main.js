$(document).ready(function(){
	$('.user-profile-box').hide(); 
	$('.arrow-left').hide();	
	$('#user-1').click(function(){
		$('.dummyLayer').css({"opacity":"0.2"});
		$('.dummyLayer').css({"z-index":"-1"});
		$('.user-profile-box').show(); 
		$('.user-profile-box').css({"margin-top":"-480px"});
		$('.user-profile-box').css({"margin-right":"-420px"});	
		$('.arrow-left').css({"left":"240px"});
		$('.arrow-left').css({"top":"76px"});
		$('.arrow-left').show(); 
	});
	$('#user-3').click(function(){
		$('.user-profile-box').show(); 
		$('.user-profile-box').css({"margin-top":"-450px"});
		$('.user-profile-box').css({"margin-right":"-420px"});
		$('.arrow-left').css({"left":"240px"});
		$('.arrow-left').css({"top":"176px"});
		$('.arrow-left').show(); 
	});	
	$('#user-7').click(function(){
		$('.user-profile-box').show();
		$('.user-profile-box').css({"margin-top":"-250px"});
		$('.user-profile-box').css({"margin-right":"-420px"});	
		$('.arrow-left').css({"left":"240px"});
		$('.arrow-left').css({"top":"390px"});		
		$('.arrow-left').show(); 
	});	
	$('#user-9').click(function(){
		$('.user-profile-box').show(); 
		$('.user-profile-box').css({"margin-top":"-240px"});
		$('.user-profile-box').css({"margin-right":"-420px"});
		$('.arrow-left').css({"left":"240px"});
		$('.arrow-left').css({"top":"490px"});
		$('.arrow-left').show(); 
	});
	$('.dummyLayer').click(function(){
		$('.user-profile-box').hide(); 
		$('.arrow-left').hide();
	});
});