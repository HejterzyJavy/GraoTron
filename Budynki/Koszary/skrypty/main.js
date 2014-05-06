var tablica = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var wszystkieJednostki = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var info = new Array();
var jednostkaId = 0;

$(document).ready(function() {
	var turaGracza = window.opener.turaGracza;
	var jednostkiGracza =  window.opener.gracz[turaGracza].zamek.jednostki;
	console.log(jednostkiGracza);

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
	var index = 0;

	var lista;
	$('.add').click(function() {
		id = $(this).parent().parent().attr("id");
		ilosc = ++tablica[id.charAt(id.length - 1) ];
		$("#" + id + " .goraPola strong").html("[" + ilosc + "]");

	});

	$('.sub').click(function() {
		id = $(this).parent().parent().attr("id");
		klasa = $(this).parent().parent().attr("id");
		if (tablica[id.charAt(id.length - 1)-1] > 0)
			ilosc = --tablica[id.charAt(id.length - 1) - 1];
		$("#" + id + " .goraPola strong").html("[" + ilosc + "]");

	});

	$('.przycisk').click(function() {

		for ( i = 0; i < 9; i++) {
			wszystkieJednostki[i] += tablica[i];
			tablica[i] = 0;
			info = 0;
			$("#pole" + (i + 1) + " .goraPola strong").html("");
		}
		jednostkiGracza = wszystkieJednostki;
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
		id = $(this).attr("id");
		var index = 0;
		jednostkaId = id[id.length - 1];
		$("#obrazek").css("background-image", $("#" + id + " .obrazekJednostki").css("background-image"));
		
		$("#tytul").html(jednostka[jednostkaId ].nazwa);
		$("#hp strong").html(jednostka[jednostkaId ].hp);
		$("#atk strong").html(jednostka[jednostkaId ].atk);
		$("#def strong").html(jednostka[jednostkaId ].def);
		$("#luck strong").html(jednostka[jednostkaId ].luck);
		$("#koszt strong").html(jednostka[jednostkaId ].koszt);

	});

});
