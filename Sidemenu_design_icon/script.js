// JavaScript Document

    
   $(document).ready(function() {
	$('body').click(function(){
	
	$('.askmain').css('display','none');
	$('.assemmain').css('display','none');
	})
$('.askmain').css('display','none');
$('.assemmain').css('display','none');
$('.askmainew').css('display','none');

$('.askbtn').click(function(e){
	$('.askmain').slideToggle("slow");
	e.stopPropagation();
	})
$('.assementbtn').click(function(e){
	$('.assemmain').slideToggle("slow");
	e.stopPropagation();
	})
$('.askbtnsecond').click(function(e){
	$('.askmainew').css("display","block")
	})
$('.sidebarnew').hover(function(){
	$('.askmainew').css("display","block")
	
	},function(){
		$('.askmainew').css("display","none")
		})						






$('.askdoubtfourthdesign').click(function(){
	$('.accordiondiv').css('marginRight','0px')
	
	})
$('#leftangle').click(function(){
	
	$('.accordiondiv').css('marginRight','-640px')
	
	})


$("#assesment_tab").click(function(){
	$('#tab2,#tab3').removeClass('active').addClass('hide')
	$('#tab1').removeClass('hide').addClass('active');
	
	})
	$("#ask_tab").click(function(){
	$('#tab1,#tab3').removeClass('active').addClass('hide')
	$('#tab2').removeClass('hide').addClass('active');
	
	})
$("#ask1_tab").click(function(){
	$('#tab1,#tab2').removeClass('active').addClass('hide')
	$('#tab3').removeClass('hide').addClass('active');
	})
	$('.nav-justify > li > a').click(function(e){
			e.preventDefault();
			var active_tab_selector = $('.nav-justify > li.active > a').attr('href');					
			var actived_nav = $('.nav-justify > li.active');
			actived_nav.removeClass('active');
			$(this).parents('li').addClass('active');
			});




$('.radialdesign').click(function(){
	
	 if($('.above').hasClass('open')){
		 $('.above').removeClass('open');
		 }else{
			 $('.above').addClass('open');
		 }
	
	
	})

$('.ask_btn').click(function(){
	$('.dummyblock').css('display','block')	
	$('.slide-out-div').toggleClass('slideclose')
	//$('.slide-out-div').removeClass('slideopen')
   if($('.slide-out-ass').hasClass('slideclose-ass')){
	   $('.slide-out-ass').removeClass('slideclose-ass')
	   }
	else{
		
		}
	
	})

$('.ast_btn').click(function(){
	$('.dummyblock').css('display','block')	
	$('.slide-out-ass').toggleClass('slideclose-ass')
	//$('.slide-out-div').removeClass('slideopen')
   if($('.slide-out-div').hasClass('slideclose')){
	   $('.slide-out-div').removeClass('slideclose')
	   }
	else{
		
		}
	})
$('#closeclick').click(function(){
	if($('.slide-out-div').hasClass('slideclose')){
	   $('.slide-out-div').removeClass('slideclose')
	   }
	else{
		
		}
	})
	
$('#ass-closeclick').click(function(){
	if($('.slide-out-ass').hasClass('slideclose-ass')){
	   $('.slide-out-ass').removeClass('slideclose-ass')
	   }
	else{
		
		}
	})
$('.dummyblock').css('display','none')		
$('.dummyblock').click(function(){
	$('.dummyblock').css('display','none')	
	if($('.slide-out-div').hasClass('slideclose')){
	   $('.slide-out-div').removeClass('slideclose')
	   }
	else{
		 
		}
	if($('.slide-out-ass').hasClass('slideclose-ass')){
	   $('.slide-out-ass').removeClass('slideclose-ass')
	   }
	else{
		
		}
	})

});
   