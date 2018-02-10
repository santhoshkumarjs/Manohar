$(document).ready(function validation() {
	$("#addcourse").validate({
		rules: {
			course: {
				required: true
			}
		},
		messages: {
			course: "Please enter the course",
		}
	});
	$("#editpopup").validate({
		rules: {
			editcourse: {
				required: true
			}
		},
		messages: {
			editcourse: "Please enter the course",
		}
	});
});
	
function editdata(id,name)
{
	$("#editcourse").val(name); 
	$("#editvalue").val(id);
}

function deletedata(id)
{
	$("#deleteval").val(id); 
}

$(document).ready(function() {
	$("#addcourse").validate({
		rules: {
			course: {
				required: true,  
			},
		},
		messages: {
			course: "<span style='color:red'>Please Enter the Course</span>",
		}
	});
	
		
});

$(document).ready(function() {
	$("#editpopup").validate({
		rules: {
			editcourse: {
				required: true,  
			},
		},
		messages: {
			editcourse: "<span style='color:red'>Please Enter the Course</span>",
		}
	});							
});


