$(document).ready(function() {
    $.ajax({
	url: "http://thehub.fsd38.ab.ca/rss/file.php/70376/d12e1058a2b9d2ded48313651517905e/mod_data/23/rss.xml"
	datType: "xml"
    }).then(function(data) {
	$('.greeting-id').append(data.channel.title);
	$('.greeting-content').append(data.item.description);
    });
});
