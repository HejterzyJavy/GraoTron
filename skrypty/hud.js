var oknoKoszar = null;
var oknoSztabu = null;
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
	
	$('#pole11').click(function() {

		oknoSztabu = window.open("Budynki/Sztab/index.html", "_blank", "toolbar=no, scrollbars=no, resizable=no, top=100, left=100, width=1140, height=710", "sztab", "");

	});

	$("body").mousemove(function() {
		if (oknoKoszar && !oknoKoszar.closed) {
		window.parent.document.getElementById("container").style.visibility="hidden";
		}
		if(oknoKoszar && oknoKoszar.closed) window.parent.document.getElementById("container").style.visibility="visible";
		if(oknoSztabu && oknoSztabu.closed) console.log(gracz);
	});

});
