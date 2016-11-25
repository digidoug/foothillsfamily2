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
			$.ajax(
					{
						url: "/js/links.json",
						success: function(result){
							result.links.forEach(function(item,index){
								$("#menufill").append("<div class='"+item.css+"' id='"+item.link+"'>"+item.title+"</div><br>");
								$("#"+item.link).click(function(){fsdPage(item.title,item.page)});	
							})
							
						}
					}
					);
			$("#settext").html("Try this one");
			$("#header").click(function(){fsdPage("Careers In Foothills","careers-in-foothills")});
		}
	);	
