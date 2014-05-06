var asocjacja = ['Tartak','Kopalnia','Koszary','Kowal','Mur','Ratusz','Sanktuarium','Spichlerz'];
var poziomRozbudowania = new Array(2,1,2,3,2,4,1,2);
var zielony = new Array(0,0,0,0,0,0,0,0);
var drewno = 100;
var zloto = 4653;
var zelazo = 1111;
var wybudowano = 0;
var kliknietePole = new Array(0,0,0,0,0,0,0,0);

$(document).ready(function() {
    	
	$('.pole').mouseenter(function() {
		id = $(this).attr("id");
		jednostkaId = id[id.length - 1];
		
		$.getJSON('JSON/budynki.json', function(data) {
			$("#nazwa").html(data.budynek[jednostkaId-1].nazwa);
			$("#bonus1").html(data.budynek[jednostkaId-1].bonus1);
			$("#bonus2").html(data.budynek[jednostkaId-1].bonus2);
			$("#bonus3").html(data.budynek[jednostkaId-1].bonus3);
		});
		
		$.getJSON('JSON/dane.json', function(data2) {
			if (poziomRozbudowania[jednostkaId-1]==4) $("#kolDos"+jednostkaId).html("  MAX level"); 
				$("#drewno"+jednostkaId).html("Dr: "+data2.budynekDrwal[poziomRozbudowania[jednostkaId-1]].drewno);
				$("#zloto"+jednostkaId).html("Zl: "+data2.budynekDrwal[poziomRozbudowania[jednostkaId-1]].zloto);
				$("#zelazo"+jednostkaId).html("Ze: "+data2.budynekDrwal[poziomRozbudowania[jednostkaId-1]].zelazo);

			for (var i=0;i<4;i++){
				if (wybudowano == 0) 
					if (drewno>data2.budynekDrwal[poziomRozbudowania[jednostkaId-1]].drewno && zloto>data2.budynekDrwal[poziomRozbudowania[jednostkaId-1]].zloto && zelazo>data2.budynekDrwal[poziomRozbudowania[jednostkaId-1]].zelazo) 
							$(function(){
								if (kliknietePole[id]==1) {}
									else $('#'+jednostkaId+' .kolorDostepnosci').css('background-color', '#006600'); 
								zielony[jednostkaId] = 1; 
							});
						else
							$(function(){
								$('#'+jednostkaId+'  .kolorDostepnosci').css('background-color', '#770000'); 
							});
				}
		});
	});	
	
	$('#wstecz').click(function(e) {
		e.preventDefault();
		$("#popup").fadeIn(1000).fadeOut("slow");
	});
	
	$('.pole').click(function() {
		id = $(this).attr("id");
		for (var m=1;m<9;m++) kliknietePole[m]=0;
		kliknietePole[id] = 1;
		aktualnaPozycja = id;
		if (wybudowano == 0) {
			if (zielony[id]==1) $('#kolDos'+id).css('background-color', '#00DD00'); 
			for (var numer=1;numer<9;numer++) {
				if (numer == id) continue;
				if (zielony[numer]==1) $('#kolDos'+numer).css('background-color', '#006600');
			}
			if (zielony[id]==1) $('#wybrano').html('Wybrano: '+asocjacja[id-1]);
		}
	});
	
	$('#wykonaj').click(function() {
		if (wybudowano == 0) {
			//alert('Wybrano: '+aktualnaPozycja);
			for(var num=1;num<9;num++) {
				$('#kolDos'+num).css('background-color', '#000055');
				zielony[num] = 0;
			}
				wybudowano=1;
		
		$.getJSON('JSON/dane.json', function(data2) {
				alert('Wybudowano: '+asocjacja[aktualnaPozycja]+' przed: '+drewno+' '+zloto+' '+zelazo);
				
				drewno=drewno-data2.budynekDrwal[poziomRozbudowania[aktualnaPozycja-1]].drewno;
				zloto=zloto-data2.budynekDrwal[poziomRozbudowania[aktualnaPozycja-1]].zloto;
				zelazo=zelazo-data2.budynekDrwal[poziomRozbudowania[aktualnaPozycja-1]].zelazo;
				
				alert('Wybudowano: '+asocjacja[aktualnaPozycja]+' po: '+drewno+' '+zloto+' '+zelazo);
		});
		}
	});
});	

function Sprawdz() {
	for(var x=0;x<9;x++) 
		Poziomy(x,asocjacja[x],poziomRozbudowania[x]);
}

function Poziomy(a,b,c) {
	$(function(){
		$("#"+(a+1)+" .nazwaBudynku").text(b+'   ['+ c + ']');
	});
}

Sprawdz();



