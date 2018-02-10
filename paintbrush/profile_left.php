<div class="col-md-3 produ_info">
		<div class="picture-container">
			<div class="picture">
			<form id="profileimg" name="profileimgform" encrypt="multipart/form-data" method="post">
				<img src="resources/uploads/users/<?php echo $data['profileImage']; ?>" class="picture-src" id="wizardPicturePreview" title="" width="150" height="150" />
				<input type="file" id="prof-pic" name="prof-pic" title="&nbsp;">
			</form>
			</div>
			<h6>Choose Picture</h6>
		</div>
		<div class="panel-bg">
			<div class="panel-group" id="accordion">
			
				<div class="panel panel-default">
					<a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
						<div class="panel-heading">
							<h4 class="panel-title">
								<i class="glyphicon glyphicon-minus glyphiconsize"></i> Wishlist
							</h4>
						</div>
					</a>
					<div id="collapseThree" class="panel-collapse collapse in">
						<div class="panel-body">
							<ul class="table">
								<li>
									<a href="wishlist.php">MY Wishlist</a>
								</li>
								<li>
									<a href="order.php">MY Order</a>
								</li>								
								<li>
									<a href="shipaddr.php">Shipping Address</a>
								</li>								
								<li>
									<a href="ordetail.php">Order Detail</a>
								</li>								
							</ul>
						</div>
					</div>
				</div>
			
			</div>
		</div>
	</div>
<script> 
$(document).ready(function() {    
    var readURL = function(input) {		
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#prof-pic').attr('src', e.target.result);
            }    
            reader.readAsDataURL(input.files[0]);
        }
    }   	
    $("#prof-pic").on('change', function(){		
		$("#profileimg").submit();		
    });	
}); 

$(document).ready(function(){	
$("#profileimg").on('submit', function(e){
	e.preventDefault();	
	filename= $('#prof-pic').val();
	extension = filename.split('.').pop().toLowerCase();
	if(extension == "jpg" || extension == "jpeg" || extension == "png" || extension == "gif"){	
	//if(filename != ""){
		$.ajax({
			url: 'profileimg_upload.php',
			type:'post',
			data:  new FormData(this),
			contentType: false,
			cache: false,
			processData:false,
			success:function(res){						
				$('#wizardPicturePreview').attr('src', res);
			}
		});	
}else{
	alert("Invalid Format of File");
}			
}); 		
}); 
</script>