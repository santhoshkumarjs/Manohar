
$(document).ready(function () {
    $('#slider-list1').freeSimpleSlider({
        dots: true,
        arrows: true,
        time: 3000,
        animation: "basic"
    });

    $('#slider-list2').freeSimpleSlider({
        dots: true,
        arrows: true,
        time: 6000,
        animation: "fade"
    });

    $('#slider-list3').freeSimpleSlider({
        dots: true,
        arrows: true,
        time: 5000,
        animation: "slide"
    });
	$("#wizard-picture").change(function(){
					readURL(this);
			});
			function readURL(input) {
				if (input.files && input.files[0]) {
					var reader = new FileReader();

					reader.onload = function (e) {
						$('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
					}
					reader.readAsDataURL(input.files[0]);
				}
			}
});
