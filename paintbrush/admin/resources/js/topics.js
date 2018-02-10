	function removetag(){
	$('#demo .tagit-choice').remove();
	}
	
		$(document).ready(function(){
			$('#searchtopic').autocomplete({		
		      	source: function( request, response ) {
		      		$.ajax({
		      			url : 'searchtopics.php',
		      			dataType: "json",
						data: {
						   topics_starts_with: $('#searchtopic').val(),
						   type: 'topic_name'
						},
						 success: function( data ) {
							 response( $.map( data, function( item ) {
								return {
									label: item.split('~~~')[0],
                                    val: item.split('~~~')[1]
								}
								//$('#linktopicid').val(value);
							}));
							
							
						}
		      		});
		      	},
				select: function (e, i) {
				
                    $('#linktopicid').val(i.item.val);
                },
		      	autoFocus: true,
		      	minLength: 0      	
		      });
	});
				
		$(document).ready(function validation() {
			$("#addpopup").validate({
				rules: {
					topic: {
						required: true
					}
				},
				messages: {
					topic: "Please enter the topic",
				}
			});
			$("#editpopup").validate({
				rules: {
					edittopic: {
						required: true
					}
				},
				messages: {
					edittopic: "Please enter the topic",
				}
			});
		});

	function deletedata(id){
		$("#deleteval").val(id); 
	}
	function editdata(id,name){
		$("#edittopic").val(name); 
		$("#editvalue").val(id); 
		$("#edit_topic_desc").text($("#"+id).val());
		$.ajax({ 
			url: 'topics.php',
			type: 'POST',
			data: 'topicId='+id+'&getuserid=4',
			dataType: "json",
			success: function(data) { 
				// var filtered = [];
				if( data != false ){ //alert(data);
					//jsonArray = jQuery.parseJSON(data);
					// $("#editDemo").append("<li>Here's 3</li>");
					$("#editDemo").val(data);
					/*showTags($('#editDemo').tagit('tags'));
					for (var i = 0; i < data.length; i++) {
                        filtered.push(data[i]);
					}
				
					$("#editDemo").tagit({
						tagSource: filtered
					});
					//$("#editvalue").val(jsonArray); */
				}else{         
					alert("Unable to retreive data. Try again later");
				}
			}
		});
	}
	function setVal(){
		var val = '';var res = '';
		var val = ($("#demo").clone().children().remove().text())
		var res = val.split("*");
		document.getElementById('tagsList').value = res;
	}
	function setEditVal(){
		var val = '';var res = '';
		var val = ($("#demo").clone().children().remove().text())
		var res = val.split("*");
		document.getElementById('tagsList').value = res;
	}
	
	
	$(function (){	
		$('#demo').tagit({ editable: true});
		$('#getTags').click(function (){
			showTags($('#demo').tagit('tags'))
		});
		/*$('#editDemo').tagit({ editable: true});
		$('#editGetTags').click(function (){
			showTags($('#editDemo').tagit('tags'))
		});*/
		function showTags(tags){
			var string = "Tags (label : value)\r\n";
			string += "--------\r\n";
			for (var i in tags)
				string += tags[i].label + " : " + tags[i].value + "\r\n";
		}
	});
	
	function showalert(){
		alert("It is a mapped Topic,so it will be redirect to original topic");
	}
