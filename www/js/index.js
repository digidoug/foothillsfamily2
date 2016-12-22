var fsdmenu = {
	"links" : [

	{
		"css" : "whitebutton",
		"link" : "home",
		"title" : "Home",
		"page" : ""
	}, {
		"css" : "apply",
		"link" : "apply",
		"title" : "How to Apply",
		"page" : "careers-in-foothills"
	}, {
		"css" : "sidetext",
		"link" : "about",
		"title" : "About Us",
		"page" : "About"
	}, {
		"css" : "sidetext",
		"link" : "workingfoothills",
		"title" : "Working In Foothills",
		"page" : "comprehensive-staff-development"
	}, {
		"css" : "sidetext",
		"link" : "engaged-learners",
		"title" : "Engaged Learners",
		"page" : "engaged-learners"
	}, {
		"css" : "sidetext",
		"link" : "student-voice",
		"title" : "Student Voice",
		"page" : "student-voice"
	}, {
		"css" : "sidetext",
		"link" : "wide-ranging",
		"title" : "Wide Ranging Programming",
		"page" : "wide-ranging-programming"
	}, {
		"css" : "dkbutton",
		"link" : "blog",
		"title" : "Leadership Blog",
		"page" : ""
	}, {
		"css" : "dkbutton",
		"link" : "news",
		"title" : "News",
		"page" : ""
	} ]
};

var fsdinternalnav = {
	"links" : [ {
		"link" : "supportive",
		"title" : "Supportive Environment?",
		"page" : "supportive-environment"
	}, {
		"link" : "attracted",
		"title" : "What attracted you to Foothills?",
		"page" : "what-attracted-you-to-foothills"
	}, {
		"link" : "likefoot",
		"title" : "What do you like about working in Foothills?",
		"page" : "what-do-you-like-about-working-in-foothills"
	} ]
};

function menuFadeOut(menuid) {
	document.getElementById("mySidenav").style.width = "0";
}

function menuFadeIn(menuid) {
	document.getElementById("mySidenav").style.width = "200px";
}

function fsdPage(pagename, pageid) {
	$("#homepage").hide();
	$.ajax({
		url : "http://www.fsd38.ab.ca/API.php/" + pageid,
		success : function(result) {
			menuFadeOut("#menufill");
			$("#header").html(pagename);
			$("#settext").html(result.html);
		}

	}

	);
}

function goHome() {
	menuFadeOut("");
	$("#header").html("");
	$("#settext").html("");
	$("#homepage").fadeIn();
}


function rssFeed(blogid,bltitle)
{
	menuFadeOut("");
	alert("before get");
	$.get("http://www.fsd38.ab.ca/rss.php%3fid%3d"+blogid,function(xml){
		alert("in get");
		var fullfeed = $.xml2json(xml);
		alert(fullfeed.title);
		}
		
	).fail(function(out){alert("Broke"+this.responseJSON());});
	
}


function rssFeedold(blogid,bltitle)
{
	menuFadeOut("");

	$.ajax({
		url: "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://www.fsd38.ab.ca/rss.php%3fid%3d"+blogid,
		type:"GET",
		dataType:"jsonp",

		success: function(result){
			$("#header").html(bltitle);
			$("#settext").html("");
			result.responseData.feed.entries.forEach(function(item,index) {
				$("#settext").append(
					"<div class='dkbutton' id='blpost"+index+"'>"+item.title+"</div>"
					);
				$("#blpost"+index).on("tap",function()
					{
						$("#header").html(item.title);
						$("#settext").html("<fixed>"+item.content+"</fixed>");
					});
					
			});
			
	},
		error: function(result){
			$("#settext").append(JSON.stringify(result));
		}
	
	
	}
	
		
		);
	
}

function lsNews() {
	rssFeed("3","FSD News");
}

function lsBlog() 
{
	rssFeed("71","FSD Leadership Blog");
	}


$(document).ready(
		function() {
			$.cors=true;
			menuFadeIn("Test");
			fsdmenu.links.forEach(function(item, index) {

				$("#menufill").append(
						"<div class='" + item.css + "' id='" + item.link + "'>"
								+ item.title + "</div><br>");
				$("#" + item.link).on("tap", function() {
					fsdPage(item.title, item.page)
				});
			});
			$("#home").on("tap", goHome);
			fsdinternalnav.links.forEach(function(item, index) {
				$("#" + item.link).on("tap", function() {
					fsdPage(item.channel.title, item.channel.description)
				});
			});
			$(document).on("swiperight", menuFadeIn);
			$(document).on("swipeleft", menuFadeOut);
			menuFadeOut();
			$("#home").on("tap", goHome);
			$("#blog").on("tap", lsBlog);
			$("#news").on("tap", lsNews);
		});
