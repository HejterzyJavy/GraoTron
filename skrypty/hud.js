var oknoKoszar = null;
$(document).ready(function() {
	$('.poleSiatki,#pole13').mouseenter(function() {
		$(this).css("background-color", "#660000");
	});

	$('.poleSiatki,#pole13').mouseleave(function() {
		$(this).css("background-color", "#554236");
	});

	$('#pole10').click(function() {

		oknoKoszar = window.open("Budynki/Koszary/index.html", "_blank", "toolbar=no, scrollbars=no, resizable=no, top=100, left=100, width=1020, height=620", "koszary", "");

	});

	$("body").mousemove(function() {
		if (oknoKoszar && !oknoKoszar.closed) {
		window.parent.document.getElementById("container").style.visibility="hidden";
		}
		if(oknoKoszar && oknoKoszar.closed) window.parent.document.getElementById("container").style.visibility="visible";
	});

});
