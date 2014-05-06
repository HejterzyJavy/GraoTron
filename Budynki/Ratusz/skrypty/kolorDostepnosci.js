var drewno = 100;
var zloto = 4653;
var zelazo = 1111;

var poziomRozbudowania = new Array(2,1,2,3,2,1,1,2);
var asocjacja2 = [['Tartak',poziomRozbudowania[0]],['Kopalnia',poziomRozbudowania[1]],
					['Koszary',poziomRozbudowania[2]],['Kowal',poziomRozbudowania[3]],
						['Mur',poziomRozbudowania[4]],['Ratusz',poziomRozbudowania[5]],
							['Sanktuarium',poziomRozbudowania[6]],['Spichlerz',poziomRozbudowania[7]]];
var myArray2 = [myArrayKowal,myArrayKowal,myArrayKoszary,myArrayKowal,myArrayMur,myArrayRatusz,myArraySpichlerz,myArraySpichlerz];


function Sprawdz() {
	for(var x=1;x<9;x++) {
		Poziomy(x,asocjacja2[x][0],asocjacja2[x][1]);
	}
}

function Poziomy(a,b,c) {
	$(function(){
		$("#"+a+" .nazwaBudynku").text(b+'   ['+ c + ']');
	});
}

Sprawdz();

function Kolor() {
	for (var y=0;y<9;y++){
		KolorAA(y+1,poziomRozbudowania[y],myArray2[0]);
	}
}

function KolorAA(l,a,tab) {
		for (var i=0;i<4;i++){
			if (a==tab[i][0]) {
				if (drewno>tab[i][1] && zloto>tab[i][2] && zelazo>tab[i][3]) 
					$(document).ready(function(){
						$('#'+l+' .kolorDostepnosci').css('background-color', '#007700'); 
					});
				else
					$(document).ready(function(){
						$('#'+l+'  .kolorDostepnosci').css('background-color', '#770000'); 
					});
				}
		}
}
