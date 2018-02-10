//Side bar Script Start here
            $(document).ready(function () {
                   $('.askadoubt, .assesment').click(function () {
                    $('.askdummybg').css("display", "block");
                    $('.fixednav').css("width", "320px");
                    $('.wholediv').css("margin-left", "-320px");
                    $('.sidebarmenuicon').css("margin-right", "320px");                  
                    $('.close-sidebar').show();
                });
               $('.askdummybg').click(function () {
                    $('.askdummybg').css("display", "none")
                    $('.fixednav').css("width", "0");
                    $('.wholediv').css("margin-left", "0");
                    $('.sidebarmenuicon').css("margin-right", "0");
                    $('.close-sidebar').hide();
                });
                $('.close-sidebar, .ask_close, #closeclick, #ass-closeclick').click(function () {
                    $('.fixednav').css("width", "0");
                    $('.wholediv').css("margin-left", "0");
                    $('.sidebarmenuicon').css("margin-right", "0");
                    $('.close-sidebar').hide();
                });
                $('.fixedulclass li, #closeclick, #ass-closeclick').click(function (e) {
                    e.preventDefault();
                    $('li').removeClass('active');
                    $(this).addClass('active');
                });
				$('.fixedulclass-bottompart li, #closeclick, #ass-closeclick').click(function (e) {
                    e.preventDefault();
                    $('li').removeClass('active');
                    $(this).addClass('active');
                });
                $("#askdoubt_tab").click(function () {
                    $('#tab2').removeClass('active').addClass('hide')
                    $('#tab1').removeClass('hide').addClass('active');
                });
				$("#askdoubt_tab1").click(function () {
                    $('#tab2').removeClass('active').addClass('hide')
                    $('#tab1').removeClass('hide').addClass('active');
                });
                $("#assesment_tab").click(function () {
                    $('#tab1').removeClass('active').addClass('hide')
                    $('#tab2').removeClass('hide').addClass('active');
                });
				$("#assesment_tab1").click(function () {
                    $('#tab1').removeClass('active').addClass('hide')
                    $('#tab2').removeClass('hide').addClass('active');
                });
            });
//Side bar Script End here