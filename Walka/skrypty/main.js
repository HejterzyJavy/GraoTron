$(document).ready(function() {
	//TRZEBA POPRAWIC INDEKSY!!!

	var turaGracza = 1;
	var oddzial_1 = new Array(6);
	var oddzial_2 = new Array(6);

	var atakujaca;
	var broniaca;

	for (var i = 0; i < oddzial_1.length; i++) {
		oddzial_1[i] = {
			nazwa : "lucznik",
			ilosc : 10,
			mozeAtakowac : true,
			stan : 0,
			atk : 32,
			def : 10,
			hp : 5
		};

		oddzial_2[i] = {
			nazwa : "lucznik",
			ilosc : 10,
			mozeAtakowac : true,
			stan : 0,
			atk : 10,
			def : 10,
			hp : 5
		};

		$("#lewa_" + (i + 1) + " img").attr('src', "img/" + oddzial_1[i].nazwa + ".png");
		$("#prawa_" + (i + 1) + " img").attr('src', "img/" + oddzial_1[i].nazwa + ".png");

		$("#lewa_" + (i + 1) + " .ilosc").html(oddzial_2[i].ilosc);
		$("#prawa_" + (i + 1) + " .ilosc").html(oddzial_2[i].ilosc);
	}

	$('.przycisk').click(function() {

	});

	$('.poleSiatki').mouseenter(function() {
		id = $(this).attr("id");

		$(this).animate({
			opacity : 1
		}, 300, function() {
		});

		jednostkaId = id[id.length - 1];

		$.getJSON('dane.json', function(data) {
			$("#tytul").html(data.jednostka[jednostkaId - 1].nazwa);
			$("#hp strong").html(data.jednostka[jednostkaId - 1].hp);
			$("#atk strong").html(data.jednostka[jednostkaId - 1].atk);
			$("#def strong").html(data.jednostka[jednostkaId - 1].def);
			$("#luck strong").html(data.jednostka[jednostkaId - 1].luck);
			$("#koszt strong").html(data.jednostka[jednostkaId - 1].koszt);
		});

	});

	function zmienGracza() {
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
					zadaneObrazenia = Math.abs(oddzial_2[broniaca].hp - (oddzial_1[atakujaca].atk - oddzial_2[broniaca].def ));
					zabiteJednostki = Math.floor(zadaneObrazenia / oddzial_2[broniaca].hp);
					$("#prawa_" + broniaca + " .ilosc").html(oddzial_2[broniaca].ilosc - zabiteJednostki);
					oddzial_2[broniaca].ilosc -= zabiteJednostki;
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
					zadaneObrazenia = Math.abs(oddzial_1[broniaca].hp - (oddzial_2[atakujaca].atk - oddzial_1[broniaca].def ));
					zabiteJednostki = Math.floor(zadaneObrazenia / oddzial_1[broniaca].hp);
					$("#lewa_" + broniaca + " .ilosc").html(oddzial_1[broniaca].ilosc - zabiteJednostki);
					oddzial_1[broniaca].ilosc -= zabiteJednostki;
					$("#srodek").html("Gracz " + turaGracza + " zadal: " + zadaneObrazenia + " obrazen <br> Zabijajac: " + zabiteJednostki + " jednostki");
					turaGracza = 1;
					zmienGracza();
					console.log("TURA:" + turaGracza);
				}
			});
		}
	}

	zmienGracza();

});
