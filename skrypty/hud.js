var oknoKoszar = null;
var oknoSztabu = null;

//TODO: Czyscic liste oddzialow
function updateListyOddzialow(ktoryOddzial){
	var wiersz = '<p class="odd" id="odd' + ktoryOddzial + '"> ' + gracz[turaGracza].oddzialy[ktoryOddzial].nazwa + ' </p>';
	$("#listaOddzialow").append(wiersz);
    $(".odd").click(function () {
        var tid = $(this).attr('id').replace(/[A-Za-z$-]/g, "");
        var pos = isoH.pos2px(gracz[turaGracza].oddzialy[tid].x - 2, gracz[turaGracza].oddzialy[tid].y - 3);
        isoH.centerAt(pos.left, pos.top);
    }).mouseenter(function () {
            $(this).animate({ color: "#E8C23B" });
    }).mouseleave(function () {
            $(this).animate({ color: "#D8D8C0" });
        });
}


$(document).ready(function() {
    //Sciemnia te nieobslugiwane
    $('#pole1').css("opacity", "0.5");
    $('#pole2').css("opacity", "0.5");
    $('#pole3').css("opacity", "0.5");
    $('#pole4').css("opacity", "0.5");
    $('#pole5').css("opacity", "0.5");
  //  $('#pole6').css("opacity", "0.5");
    $('#pole7').css("opacity", "0.5");
    $('#pole8').css("opacity", "0.5");
    $('#pole9').css("opacity", "0.5");
  //  $('#pole10').css("opacity", "0.5");
  //  $('#pole11').css("opacity", "0.5");
  //  $('#pole12').css("opacity", "0.5");
  //  $('#pole13').css("opacity", "0.5");


    $('.poleSiatki,#pole13').mouseenter(function () {
        $(this).css("background-color", "#660000");
    }).mouseleave(function () {
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

    $('#pole12').click(function() {
    sek=0;
    });

    $('#pole13').click(function() {

        var pos = isoH.pos2px(gracz[turaGracza].zamek.x-2, gracz[turaGracza].zamek.y-3);
        isoH.centerAt(pos.left,pos.top);
    });

	$("body").mousemove(function() {
		if (oknoKoszar && !oknoKoszar.closed) {
		window.parent.document.getElementById("container").style.visibility="hidden";
		}
		if(oknoKoszar && oknoKoszar.closed) window.parent.document.getElementById("container").style.visibility="visible";
		if(oknoSztabu && oknoSztabu.closed)  window.parent.document.getElementById("container").style.visibility="visible";
	});



     $(".poleSiatki").tooltip();



});
