var oknoKoszar = null;
var oknoSztabu = null;
var oknoRatusz = null;
function updateListyOddzialow() {
	var lista = "";
	for (var i = 0; i < gracz[turaGracza].oddzialy.length; i++) {
		var wiersz = '<p class="odd" id="odd' + i + '"> ' + gracz[turaGracza].oddzialy[i].nazwa + ' </p>';
		lista += wiersz;
	};
	
	$("#listaOddzialow").html(lista);
	console.log("dl:"+gracz[turaGracza].oddzialy.length);
	for (var k = 0; k < gracz[turaGracza].oddzialy.length; k++) {
		$('#odd'+k).click(function() {
			console.log(k-1);
			var pos = isoH.pos2px(gracz[turaGracza].oddzialy[k-1].x-2, gracz[turaGracza].oddzialy[k-1].y-3);
			isoH.centerAt(pos.left,pos.top);
			console.log(pos);
		});
	}

	

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
