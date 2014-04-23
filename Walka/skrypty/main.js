$(document).ready(function() {
	//TRZEBA POPRAWIC INDEKSY!!!
	
	var turaGracza = 1;
	var oddzial_1 = new Array(6);
	var oddzial_2 = new Array(6);
	
	var atakujaca;
	var broniaca;
	
	
	for( var i=0;i<oddzial_1.length;i++){
		oddzial_1[i] = {
			nazwa:"lucznik",
			ilosc: 10,
			mozeAtakowac:true,
			stan:0,
			atk:32,
			def:10,
			hp:5
			};
			
			oddzial_2[i] = {
			nazwa:"lucznik",
			ilosc: 10,
			mozeAtakowac:true,
			stan:0,
			atk:10,
			def:10,
			hp:5
			};
			
			$("#lewa_"+(i+1)+" img").attr('src',"img/"+oddzial_1[i].nazwa+".png");
			$("#prawa_"+(i+1)+" img").attr('src',"img/"+oddzial_1[i].nazwa+".png");
			
			$("#lewa_"+(i+1)+" .ilosc").html(oddzial_2[i].ilosc);
			$("#prawa_"+(i+1)+" .ilosc").html(oddzial_2[i].ilosc);
	}
	
	$('.przycisk').click(function() {

	});
	
	if(turaGracza == 1){
		$('#lewa .naglowek').css('borderBottom', '10px solid #D0D63E'); 
		$('#lewa .naglowek').css('height', '54px'); 
	}

	$('.poleSiatki').mouseenter(function() {
		id = $(this).attr("id");

		$(this).animate({
			opacity : 1
		}, 300, function() {
		}); 

		jednostkaId = id[id.length - 1];
		
		$.getJSON('dane.json', function(data) {
			$("#tytul").html(data.jednostka[jednostkaId-1].nazwa);
			$("#hp strong").html(data.jednostka[jednostkaId-1].hp);
			$("#atk strong").html(data.jednostka[jednostkaId-1].atk);
			$("#def strong").html(data.jednostka[jednostkaId-1].def);
			$("#luck strong").html(data.jednostka[jednostkaId-1].luck);
			$("#koszt strong").html(data.jednostka[jednostkaId-1].koszt);
		});

	});
	
	$('.poleSiatki').mouseleave(function() {
		if (atakujaca == 0) {
			$(this).animate({
				opacity : 0.60
			}, 300, function() {
			});
		}
		//trzeba poprawic ten warunek
		if(this.id!="lewa_"+atakujaca){
			$(this).animate({
				opacity : 0.2
			}, 300, function() {
			});
		}


	});
	
	
	$('#lewa .poleSiatki').click(function() {
		jednostkaId = id[id.length - 1];
		for( var i=0;i<=6;i++){
				if(i == jednostkaId) continue;
				$('#lewa_'+i).css('opacity', '0.2'); 
			}
		if (turaGracza == 1) {
			atakujaca = jednostkaId;
			console.log(atakujaca);
			
		}
		else{
			broniaca = jednostkaId;
			console.log(broniaca);
		}
	});
	
	$('#prawa .poleSiatki').click(function() {
		jednostkaId = id[id.length - 1];
		for( var i=0;i<=6;i++){
				if(i == jednostkaId) continue;
				$('#prawa_'+i).css('opacity', '0.2'); 
			}
		if (turaGracza == 2) {
			atakujaca = jednostkaId;
			console.log(atakujaca);
			
		}
		else{
			broniaca = jednostkaId;
			console.log(broniaca);
		}
	}); 
	
	

	$('#lewa .atakuj').click(function() {
		var zadaneObrazenia = 0;
		var zabiteJednostki = 0;

		if (turaGracza == 1) {
			zadaneObrazenia = Math.abs(oddzial_2[broniaca].hp -  (oddzial_1[atakujaca].atk - oddzial_2[broniaca].def ));
			zabiteJednostki = Math.floor(zadaneObrazenia/oddzial_2[broniaca].hp);
			console.log(zabiteJednostki);
			console.log(zadaneObrazenia);
			$("#prawa_"+broniaca+" .ilosc").html(oddzial_2[broniaca].ilosc-zabiteJednostki);
			oddzial_2[broniaca].ilosc-= zabiteJednostki	;
			
			$("#srodek").html("Gracz "+turaGracza+" zadal: "+zadaneObrazenia+" obrazen <br> Zabijajac: "+zabiteJednostki+" jednostki");
		} else {
			broniaca = jednostkaId;
			console.log(broniaca);
		}

	});



});
