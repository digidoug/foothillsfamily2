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
	}, {
		"css" : "whitebutton",
		"link" : "aboutapp",
		"title" : "About App",
		"page" : ""
	}

	]
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

function aboutApp() {
	menuFadeOut();
	$("#header").html("About This App");
	$("#settext").html("<h2>Join the Foothills Family</h2><p><strong>v. 2.0.0<br>Copyright 2014-2017<br>All Rights Reserved</strong></p>                          <p>Foothills School Division<br>P.O. Box 5700<br>120 5th Ave W.&nbsp;<br>High River, AB T1V 1M7<br>http://www.fsd38.ab.ca<br>(403)652-3001</p>");

}

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

function rssFeed(blogid, bltitle) {
	menuFadeOut("");

	$
			.ajax({
				url : "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Fwww.fsd38.ab.ca%2Frss.php%3Fid%3D"
						+ blogid
						+ "%22&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
				accepts : {
					xml : "application/rss+xml"
				},
				type : "GET",
				dataType : "xml",
				// async:true,

				success : function(result) {
					var $xml = $(result);
					var $counter = 0;
					$("#header").html(bltitle);
					$("#settext").html("");
					$xml.find("item").each(
							function() {
								$counter++;
								var $this = $(this), item = {
									title : $this.find("title").text(),
									link : $this.find("link").text(),
									description : $this.find("description")
											.text(),
									pubDate : $this.find("pubDate").text(),
									author : $this.find("author").text()
								}
								$("#settext").append(
										"<div class='dkbutton' id='blog"
												+ $counter + "'>" + item.title
												+ "</div>");
								$("#blog" + $counter).on("tap", function() {
									var $text = item.description;
									$text = $text.replace(/\n/g, "<br>");
									$("#settext").html($text);
                                                                        $("#header").html(item.title);
								});
							});

				},
				error : function(result) {
					alert("Feed Unavailable, Sorry");
					goHome();
				}

			}

			);

}

function lsNews() {
	rssFeed("3", "FSD News");
}

function lsBlog() {
	rssFeed("71", "FSD Leadership Blog");
}

$(document).ready(
		function() {
			$.cors = true;
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
			$("#menuicon").on("tap", menuFadeIn);
			$("#aboutapp").on("tap", aboutApp);
		});
