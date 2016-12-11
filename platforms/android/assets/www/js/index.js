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

function lsBlog() {
	menuFadeOut("");
	$("#header").html("Leadership Blog");
	var request=$.get("http://www.fsd38.ab.ca/rss.php?id=71");
	request.success(function(data) {

			
			var $XML = $(data);
			$XML.find("item").each(
					function() {

						var $this = $(this), item = {
							title : $this.find("title").text(),
							link : $this.find("link").text(),
							description : $this.find("description").text()

						};

						$("#settext").append(
								"<div class='dkbutton'>" + item.title
										+ "</div>");

					});

		});
	request.error(function(jqXHR, textStatus, errorThrown){
		alert(errorThrown);
	}
	)
						
	

}

function lsNews() {
	menuFadeOut("");
	$
			.ajax({
				url : "http://feeds.feedburner.com/FoothillsSchoolDivision",
				success : function(result) {
					$("#header").html("FSD News");
					$("#settext").html("");
					result.channel
							.forEach(function(item, index) {
								$("#settext")
										.append(
												"<div class='dkbutton' id='npost"
														+ index
														+ "'><img align='left' src='http://www.fsd38.ab.ca/image.php?t=news&s=40&f="
														+ item.photo
														+ "&siteid=1'></img>"
														+ item.title + "</div>");
								$("#npost" + index).on("tap", function() {
									$("#header").html(item.title);
									$("#settext").html(item.article);
								});
							});

				}

			});
}

$(document).ready(
		function() {

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
