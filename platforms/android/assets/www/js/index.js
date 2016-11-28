

var fsdmenu={"links":[
{"css":"apply","link":"apply","title":"How to Apply", "page":"careers-in-foothills"},
{"css":"ltbluebutton","link":"about","title":"About Us","page":"About"},
{"css":"ltbluebutton","link":"compstaffdev","title":"Comprehenshive Staff Development","page":"comprehensive-staff-development"},
{"css":"ltbluebutton","link":"engaged-learners","title":"Engaged Learners","page":"engaged-learners"},
{"css":"ltbluebutton","link":"student-voice","title":"Student Voice","page":"student-voice"},
{"css":"ltbluebutton","link":"wide-ranging","title":"Wide Ranging Programming","page":"wide-ranging-programming"}
]};

function fsdPage(pagename,pageid)
{
	$.ajax(
			{
				url: "http://www.fsd38.ab.ca/API.php/"+pageid,
				success: function(result){
					$("#header").html(pagename);
					$("#settext").html(result.html);
				}
					
			}
			 
			);
}

$(document).ready(function()
{
	$("#menufill").append("testing");
							fsdmenu.links.forEach(function(item,index){
								
								$("#menufill").append("<div class='"+item.css+"' id='"+item.link+"'>"+item.title+"</div><br>");
								$("#"+item.link).on("tap",function(){fsdPage(item.title,item.page)});
								});
							});
							
								
								
								

