var tablica = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var wszystkieJednostki = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var info = new Array();
var jednostkaId = 0;
var zlotoGracza ;

function blokowanieKupowania(){
    for(var i=0;i<jednostka.length;i++){
        if(jednostka[i].koszt>zlotoGracza) {
            $("#pole"+i).fadeTo( "fast" , 0.5).find(".srodekPola").find(".add").removeClass("klikalny");
        }
        else{ $("#pole"+i).fadeTo( "fast" , 1).find(".srodekPola").find(".add").addClass("klikalny");}
    }
}

$(document).ready(function() {


	var turaGracza = window.opener.turaGracza;
	jednostkiGracza =  window.opener.gracz[turaGracza].zamek.jednostki;
    zlotoGracza = window.opener.gracz[turaGracza].surowce.zloto;
    console.log ("zloto:",zlotoGracza);
	console.log(jednostkiGracza);
    $("#pozostaleZloto_tresc").html(": "+zlotoGracza);

    blokowanieKupowania();

	info =  "<p>Miotacz TOPORÓW  <strong> " + wszystkieJednostki[1] + "</strong></p>"+
			"<p>PIKINIER         <strong> " + wszystkieJednostki[2] + "</strong></p>"+
			"<p>ŁUCZNIK          <strong> " + wszystkieJednostki[3] + "</strong></p>"+
			"<p>KAWALERIA        <strong> " + wszystkieJednostki[4] + "</strong></p>"+
			"<p>CIĘZKA KAWALERIA <strong> " + wszystkieJednostki[5] + "</strong></p>"+
			"<p>RYCERZ           <strong> " + wszystkieJednostki[6] + "</strong></p>"+
			"<p>KLERYK           <strong> " + wszystkieJednostki[7] + "</strong></p>"+
			"<p>DOWÓDCA          <strong> " + wszystkieJednostki[8] + "</strong></p>"+
			"<p>WILKOR           <strong>"  + wszystkieJednostki[9] + "</strong></p>";
	menuLista.innerHTML = info;

	$('.add.klikalny').click(function() {
        var id = $(this).parent().parent().attr("id");
        var jednostkaId = id[id.length - 1];
        if (jednostka[jednostkaId ].koszt<zlotoGracza) {
            ilosc = ++tablica[jednostkaId ];
            $("#" + id + " .goraPola strong").html("[" + ilosc + "]");
            zlotoGracza -= jednostka[jednostkaId ].koszt;
            $("#pozostaleZloto_tresc").html(": " + zlotoGracza);
            blokowanieKupowania();
        }

	});

	$('.sub').click(function() {
        var id = $(this).parent().parent().attr("id");
        var jednostkaId = id[id.length - 1];
        if (tablica[jednostkaId]>0) {
            ilosc = --tablica[jednostkaId];
            $("#" + id + " .goraPola strong").html("[" + ilosc + "]");
            zlotoGracza = zlotoGracza + parseInt(jednostka[jednostkaId ].koszt);
            $("#pozostaleZloto_tresc").html(": " + zlotoGracza);
            blokowanieKupowania();
        }

	});

	$('.przycisk').click(function() {

		for ( i = 0; i < 9; i++) {
			wszystkieJednostki[i] += tablica[i];
			tablica[i] = 0;
			info = 0;
			$("#pole" + (i + 1) + " .goraPola strong").html("");
		}
		jednostkiGracza = wszystkieJednostki;
		window.opener.gracz[turaGracza].zamek.jednostki = wszystkieJednostki;
		console.log(jednostkiGracza);
		info =  
			"<p>Miotacz TOPORÓW  <strong> " + wszystkieJednostki[1] + "</strong></p>"+ 
			"<p>PIKINIER         <strong> " + wszystkieJednostki[2] + "</strong></p>"+
			"<p>ŁUCZNIK          <strong> " + wszystkieJednostki[3] + "</strong></p>"+
			"<p>KAWALERIA        <strong> " + wszystkieJednostki[4] + "</strong></p>"+
			"<p>CIĘZKA KAWALERIA <strong> " + wszystkieJednostki[5] + "</strong></p>"+
			"<p>RYCERZ           <strong> " + wszystkieJednostki[6] + "</strong></p>"+
			"<p>KLERYK           <strong> " + wszystkieJednostki[7] + "</strong></p>"+
			"<p>DOWÓDCA          <strong> " + wszystkieJednostki[8] + "</strong></p>"+
			"<p>WILKOR           <strong>"  + wszystkieJednostki[9] + "</strong></p>";
		menuLista.innerHTML = info;
	});

	$('.poleSiatki').mouseenter(function() {
		var id = $(this).attr("id");
		var jednostkaId = id[id.length - 1];
		$("#obrazek").css("background-image", $("#" + id + " .obrazekJednostki").css("background-image"));
		
		$("#tytul").html(jednostka[jednostkaId ].nazwa);
		$("#hp strong").html(jednostka[jednostkaId ].hp);
		$("#atk strong").html(jednostka[jednostkaId ].atk);
		$("#def strong").html(jednostka[jednostkaId ].def);
		$("#luck strong").html(jednostka[jednostkaId ].luck);
		$("#koszt strong").html(jednostka[jednostkaId ].koszt);

	});

});
