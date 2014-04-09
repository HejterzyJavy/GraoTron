var tablica = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var wszystkieJednostki = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var info = new Array();
var jednostkaId = 0;

$(document).ready(function() {

	info = "<p>Miotacz TOPORÓW <strong> " + wszystkieJednostki[0] + "</strong> </p> <p>PIKINIER <strong> " + wszystkieJednostki[1] + "</strong></p> <p>ŁUCZNIK  <strong> " + wszystkieJednostki[2] + "</strong></p> <p>KAWALERIA  <strong> " + wszystkieJednostki[3] + "</strong> </p><p>CIĘZKA KAWALERIA <strong>" + wszystkieJednostki[4] + "</strong></p><p>RYCERZ <strong>" + wszystkieJednostki[5] + "</strong></p><p>KLERYK <strong>" + wszystkieJednostki[6] + "</strong></p>	<p>DOWÓDCA <strong>" + wszystkieJednostki[7] + "</strong></p><p>WILKOR <strong>" + wszystkieJednostki[8] + "</strong></p>";
	menuLista.innerHTML = info;
	var index = 0;

	var lista;
	$('.add').click(function() {
		id = $(this).parent().parent().attr("id");
		ilosc = ++tablica[id.charAt(id.length - 1) - 1];
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

		info = "<p>Miotacz TOPORÓW <strong> " + wszystkieJednostki[0] + "</strong> </p> <p>PIKINIER <strong> " + wszystkieJednostki[1] + "</strong></p> <p>ŁUCZNIK  <strong> " + wszystkieJednostki[2] + "</strong></p> <p>KAWALERIA  <strong> " + wszystkieJednostki[3] + "</strong> </p><p>CIĘZKA KAWALERIA <strong>" + wszystkieJednostki[4] + "</strong></p><p>RYCERZ <strong>" + wszystkieJednostki[5] + "</strong></p><p>KLERYK <strong>" + wszystkieJednostki[6] + "</strong></p>	<p>DOWÓDCA <strong>" + wszystkieJednostki[7] + "</strong></p><p>WILKOR <strong>" + wszystkieJednostki[8] + "</strong></p>";
		menuLista.innerHTML = info;

	});

	$('.poleSiatki').mouseenter(function() {
		id = $(this).attr("id");
		var index = 0;
		jednostkaId = id[id.length - 1];
		$("#obrazek").css("background-image", $("#" + id + " .obrazekJednostki").css("background-image"));
		
		$.getJSON('dane.json', function(data) {
			$("#tytul").html(data.jednostka[jednostkaId-1].nazwa);
			$("#hp strong").html(data.jednostka[jednostkaId-1].hp);
			$("#atk strong").html(data.jednostka[jednostkaId-1].atk);
			$("#def strong").html(data.jednostka[jednostkaId-1].def);
			$("#luck strong").html(data.jednostka[jednostkaId-1].luck);
			$("#koszt strong").html(data.jednostka[jednostkaId-1].koszt);
		});

	});

});
