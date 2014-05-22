var oknoKoszar = null;
var oknoSztabu = null;
var oknoRatusz = null;
function updateListyOddzialow() {
	var iloscOddzialow =  gracz[turaGracza].oddzialy.length-1;
	console.log(iloscOddzialow);
	var wiersz = '<p class="odd" id="odd' + iloscOddzialow + '"> ' + gracz[turaGracza].oddzialy[iloscOddzialow].nazwa + ' </p>';
	$("#listaOddzialow").append(wiersz);
	$(".odd").click(function() {
			tid = $(this).attr('id').replace(/[A-Za-z$-]/g, "");
			var pos = isoH.pos2px(gracz[turaGracza].oddzialy[tid].x-2, gracz[turaGracza].oddzialy[tid].y-3);
			isoH.centerAt(pos.left,pos.top);
		});

	$(".odd").mouseenter(function() {
		$(this).animate({ color: "#E8C23B" });
	}); 
	
	$(".odd").mouseleave(function() {
		$(this).animate({ color: "#D8D8C0" });
	}); 
	

	
};




$(document).ready(function() {
	$('.poleSiatki,#pole13').mouseenter(function() {
		$(this).css("background-color", "#660000");
	});

	$('.poleSiatki,#pole13').mouseleave(function() {
		$(this).css("background-color", "#554236");
	});

	$('#pole6').click(function() {

		oknoSztabu = window.open("Budynki/Ratusz/index.htm", "_blank", "toolbar=no, scrollbars=no, resizable=no, top=100, left=100, width=1140, height=710", "sztab", "");

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
		if(oknoSztabu && oknoSztabu.closed)  window.parent.document.getElementById("container").style.visibility="visible";
	});
	


});
