

var fsdmenu={"links":[
    {"css":"apply","link":"apply","title":"How to Apply", "page":"careers-in-foothills"},
    {"css":"","link":"about","title":"About Us","page":"About"},
    {"css":"","link":"compstaffdev","title":"Comprehenshive Staff Development","page":"comprehensive-staff-development"},
    {"css":"","link":"engaged-learners","title":"Engaged Learners","page":"engaged-learners"},
    {"css":"","link":"student-voice","title":"Student Voice","page":"student-voice"},
    {"css":"","link":"wide-ranging","title":"Wide Ranging Programming","page":"wide-ranging-programming"}
]};

var fsdinternalnav={"links":[
{"link":"supportive","title":"Supportive Environment?", "page":"supportive-environment"},
{"link":"attracted","title":"What attracted you to Foothills?","page":"what-attracted-you-to-foothills"},
{"link":"likefoot","title":"What do you like about working in Foothills?","page":"what-do-you-like-about-working-in-foothills"}
]};

function menuFadeOut(menuid)
{
	document.getElementById("mySidenav").style.width = "0";
}

function menuFadeIn(menuid)
{
	document.getElementById("mySidenav").style.width = "200px";
}

function fsdPage(pagename,pageid)
{
    $.ajax(
	{
	    url: "http://www.fsd38.ab.ca/API.php/"+pageid,
	    success: function(result){
			menuFadeOut("#menufill");
			$("#header").html(pagename);
			$("#settext").html(result.html);
	    }
	    
	}
	    
    );
}

$(document).ready(function()
{

    
	menuFadeIn("Test");
	fsdmenu.links.forEach(function(item,index){
	
    	$("#menufill").append("<div class='"+item.css+"' id='"+item.link+"'>"+item.title+"</div><br>");
		$("#"+item.link).on("tap",function(){fsdPage(item.title,item.page)});
    });
    fsdinternalnav.links.forEach(function(item,index)
    	{
    	$("#"+item.link).on("tap",function(){fsdPage(item.title,item.page)});
    	}
    	);
    $(document).on("swiperight",menuFadeIn);
    $(document).on("swipeleft",menuFadeOut);
    
});

								
								
								

