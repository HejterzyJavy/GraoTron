var broniaca;
var oddzial_1 = new Array(6);
var oddzial_2 = new Array(6);
var listaStratObr = []; // Lista straconych jednostek obroncy 
var listaStratAtk = []; 


function pokazDialog(tmp) {


	if (tmp == "wygrana") {
		var tekst = "";
		var wiersz = "";
		for (var i = 0; i < listaStratObr.length; i++) {
			wiersz = "<p>" + listaStratObr[i].ilosc + "x " + listaStratObr[i].nazwa + "</p>";
			tekst += wiersz;
		}
		$("#stracone_tresc").html(tekst);

		wiersz = "";
		var zdobyteZloto = 0;
		for (var i = 0; i < listaStratAtk.length; i++) {
			zdobyteZloto += (listaStratAtk[i].ilosc * 8);
		}
		wiersz = "<p> Zloto: " + zdobyteZloto + "</p>";
		$("#zdobyte_tresc").html(wiersz);
		surowceGracza.zloto += zdobyteZloto;
	}

	if (tmp == "przegrana") {
		
		$("#dialog h1").html("Przegrana!");
		$("#dialog").find("img").attr('src', "img/Lose.png");
		var tekst = "";
		var wiersz = "";
		for (var i = 0; i < listaStratObr.length; i++) {
			wiersz = "<p>" + listaStratObr[i].ilosc + "x " + listaStratObr[i].nazwa + "</p>";
			tekst += wiersz;
		}
		$("#stracone_tresc").html(tekst);
		$("#zdobyte_tresc").html("");
	}


	$("#dialog").dialog({
		modal : true,
		buttons : {
			Ok : function() {
				$(this).dialog("close");
				window.close();
			}
		}
	});
	console.log(listaStratObr);
};


function sprawdzKoniecWalki(){
	var wygral = 0;
	wygral = 1;
	console.log(oddzial_2);
	console.log(oddzial_2.length);
	for (var i = 1; i < 7; i++){
		if(oddzial_2[i] != undefined)
		if(oddzial_2[i].ilosc > 0)  { wygral = 0; break;}
	}
	if (wygral == 1) pokazDialog('przegrana');
	
	wygral = 2;
	console.log(oddzial_1);
	for (var i = 1; i < 7; i++){
		if(oddzial_1[i] != undefined)
		if(oddzial_1[i].ilosc > 0)  { wygral = 0; break;}
	}
	if (wygral == 2) pokazDialog('wygrana');
	
	return wygral;
};
	
$(document).ready(function() {
	//TRZEBA POPRAWIC INDEKSY!!!
	

	surowceGracza =  window.opener.gracz[window.opener.turaGracza].surowce;
	
	dziki = window.opener.dziki;
	oddzialAtk = window.opener.oddzialAtk;
	oddzialDef = window.opener.oddzialDef;
	var atak= window.opener.mapaDzicy[oddzialAtk[0]][oddzialAtk[1]];
	var turaGracza = 1;


	var atakujaca;

	
	$("#prawa .naglowek").html(oddzialDef.nazwa);

	for (var i = 1; i < 7; i++) {
		try {
				if (atak[i][1] > 0) {//sprawdza ilosc
					var nazwa = oddzial_1[i] = {
						nazwa : dziki.getJednostka(atak[i][0]).nazwa,
						ilosc : atak[i][1],
						mozeAtakowac : true,
						stan : 0,
						atk : 32,
						def : 10,
						hp : 5
					};
					$("#lewa_" + i + " img").attr('src', "img/" + oddzial_1[i].nazwa + ".png");
					$("#lewa_" + i + " .ilosc").html(oddzial_1[i].ilosc);
				} else {

					$("#lewa_" + i + " img").hide();
					$("#lewa_" + i + " .ilosc").hide();
				}
		} catch(err) {
			console.log(err);
		}
		var id = oddzialDef.jednostki[i].id;
		if (id > 0 && oddzialDef.jednostki[i].ilosc >0) {
			oddzial_2[i] = {
				nazwa : jednostka[id].nazwaObrazka,
				ilosc : oddzialDef.jednostki[i].ilosc,
				mozeAtakowac : true,
				stan : 0,
				atk : jednostka[id].atk,
				def : jednostka[id].def,
				hp : jednostka[id].hp
			};

			$("#prawa_" + i + " img").attr('src', "img/" + oddzial_2[i].nazwa + ".png");
			$("#prawa_" + i + " .ilosc").html(oddzial_2[i].ilosc);
		}
	}



	$('.poleSiatki').mouseenter(function() {
		id = $(this).attr("id");

		$(this).animate({
			opacity : 1
		}, 300, function() {
		});

		jednostkaId = id[id.length - 1];

		$("#tytul").html(jednostka[jednostkaId].nazwa);
		$("#hp strong").html(jednostka[jednostkaId ].hp);
		$("#atk strong").html(jednostka[jednostkaId ].atk);
		$("#def strong").html(jednostka[jednostkaId ].def);
		$("#luck strong").html(jednostka[jednostkaId ].luck);
		$("#koszt strong").html(jednostka[jednostkaId].koszt); 

	});

	function zmienGracza() {
		
		sprawdzKoniecWalki();
		atakujaca = 0;
		broniaca = 0;
		
		for (var i = 0; i <= 6; i++) { // chowa klikniete
						$('#lewa_' + i).css('opacity', '0.4');
						$('#prawa_' + i).css('opacity', '0.4');
					}
		if (turaGracza == 1) {
			$('#prawa .naglowek').css('borderBottom', '0px solid #D0D63E');
			$('#prawa .przyciski' ).hide( "fast" );
			$('#lewa .naglowek').css('borderBottom', '10px solid #D0D63E');
			$('#lewa .naglowek').css('height', '54px');
			$('#lewa .przyciski' ).show( "fast" );
			
		}

		if (turaGracza == 2) {
			$('#lewa .naglowek').css('borderBottom', '0px solid #D0D63E');
			$('#lewa .przyciski' ).hide( "fast" );
			$('#prawa .naglowek').css('borderBottom', '10px solid #D0D63E');
			$('#prawa .naglowek').css('height', '54px');
			$('#prawa .przyciski' ).show( "fast" );
		}

		if (turaGracza == 1) {
			$('.poleSiatki').mouseleave(function() {
				if (turaGracza == 1) {
					//trzeba poprawic ten warunek
					if (this.id != "lewa_" + atakujaca && this.id != "prawa_" + broniaca) {
						$(this).animate({
							opacity : 0.4
						}, 300, function() {
						});
					}
				}
			});
			$('#lewa .poleSiatki').click(function() {
				if (turaGracza == 1) {
					jednostkaId = id[id.length - 1];
					for (var i = 0; i <= 6; i++) {
						if (i == jednostkaId)
							continue;
						$('#lewa_' + i).css('opacity', '0.4');
					}
					atakujaca = jednostkaId;
					console.log("atk " + atakujaca);
				}
			});

			$('#prawa .poleSiatki').click(function() {
				if (turaGracza == 1) {
					jednostkaId = id[id.length - 1];
					for (var i = 0; i <= 6; i++) {
						if (i == jednostkaId)
							continue;
						$('#prawa_' + i).css('opacity', '0.4');
					}
					broniaca = jednostkaId;
					console.log("Bro " + broniaca);
				}
			});

			$('#lewa .atakuj').click(function() {
				if (turaGracza == 1) {
					var zadaneObrazenia = 0;
					var zabiteJednostki = 0;
					console.log(oddzial_2);
					zadaneObrazenia = Math.abs(oddzial_2[broniaca].hp - (oddzial_1[atakujaca].atk - oddzial_2[broniaca].def )*oddzial_1[atakujaca].ilosc );
					zabiteJednostki = Math.floor(zadaneObrazenia / oddzial_2[broniaca].hp);
					$("#prawa_" + broniaca + " .ilosc").html(oddzial_2[broniaca].ilosc - zabiteJednostki);
					oddzial_2[broniaca].ilosc -= zabiteJednostki;
					listaStratObr.push({nazwa:oddzial_2[broniaca].nazwa, ilosc: zabiteJednostki});
					oddzialDef.jednostki[broniaca].ilosc = oddzial_2[broniaca].ilosc;
					if(oddzial_2[broniaca].ilosc <= 0) $("#prawa_" + broniaca).hide( "fast" );
					$("#prawa_" + broniaca).effect("shake");
					$("#srodek").html("Gracz " + turaGracza + " zadal: " + zadaneObrazenia + " obrazen <br> Zabijajac: " + zabiteJednostki + " jednostki");
					turaGracza = 2;
					zmienGracza();
					console.log("TURA:" + turaGracza);
				}
			});
		}
		/////////////////////////////////////////////////
		if (turaGracza == 2) {
			$('.poleSiatki').mouseleave(function() {
				if (turaGracza == 2) {
					//trzeba poprawic ten warunek
					if (this.id != "prawa_" + atakujaca && this.id != "lewa_" + broniaca) {
						$(this).animate({
							opacity : 0.4
						}, 300, function() {
						});
					}
				}
			});
			$('#prawa .poleSiatki').click(function() {
				if (turaGracza == 2) {
					jednostkaId = id[id.length - 1];
					for (var i = 0; i <= 6; i++) {
						if (i == jednostkaId)
							continue;
						$('#prawa_' + i).css('opacity', '0.4');
					}
					atakujaca = jednostkaId;
					console.log("atk " + atakujaca);
				}
			});

			$('#lewa .poleSiatki').click(function() {
				if (turaGracza == 2) {
					jednostkaId = id[id.length - 1];
					for (var i = 0; i <= 6; i++) {
						if (i == jednostkaId)
							continue;
						$('#lewa_' + i).css('opacity', '0.4');
					}
					broniaca = jednostkaId;
					console.log("Bro " + broniaca);
				}
			});

			$('#prawa .atakuj').click(function() {
				if (turaGracza == 2) {
					var zadaneObrazenia = 0;
					var zabiteJednostki = 0;
					zadaneObrazenia = Math.abs(oddzial_1[broniaca].hp - (oddzial_2[atakujaca].atk - oddzial_1[broniaca].def ) *oddzial_2[atakujaca].ilosc);
					zabiteJednostki = Math.floor(zadaneObrazenia / oddzial_1[broniaca].hp);
					$("#lewa_" + broniaca + " .ilosc").html(oddzial_1[broniaca].ilosc - zabiteJednostki);
					
					oddzial_1[broniaca].ilosc -= zabiteJednostki;
					atak[broniaca][1] = oddzial_1[broniaca].ilosc;
					listaStratAtk.push({nazwa:oddzial_1[broniaca].nazwa, ilosc: zabiteJednostki});
					if(oddzial_1[broniaca].ilosc <= 0) $("#lewa_" + broniaca).hide( "fast" );
					$("#lewa_" + broniaca).effect("shake");
					$("#srodek").html("Gracz " + turaGracza + " zadal: " + zadaneObrazenia + " obrazen <br> Zabijajac: " + zabiteJednostki + " jednostki");
					turaGracza = 1;
					console.log("TURA:" + turaGracza);
					
					window.opener.mapaDzicy[oddzialAtk[0]][oddzialAtk[1]][broniaca][1] = oddzial_1[broniaca].ilosc ; 
					zmienGracza();
					
				}
			});
		}
	}
	
	zmienGracza();

});
