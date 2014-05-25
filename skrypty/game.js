
var spriteArray = [
"grass", 
"bloto", 
"kamien", 
"baratheon", 
"lannister", 
"stark", 
"targaryen"];


var isoH;
var podswietlenie ;
var podswietlenieTab = [];
var mozliwyRuchTab = [];
var oddzialKlikniety = null;
var jednostkaAktywna = null;
var mapaTest= [];
var mapa = [];
var mapaDzicy;
var oknoWalki = null;
var gracz = [];
var turaGracza = 0;
var turaGlowna = 1;
var oknoCzyZamkniete = 1;

var oddzialAtk = new Array(6);
var oddzialDef = new Array(6);

//GLOWNY OBIEKT GRACZA
var Gracz = function(imieGracza, rodGracza) {
    var obj = {
        imie : imieGracza,
        rod : rodGracza,
        oddzialy : [],
        surowce : {
            zloto : 10,
            zelazo : 10,
            drzewo : 10,
            ludzie : 10,
            teren : 5,
            kopalnie:0,
            lasy:0
        },
        zamek:{
            x:0,
            y:0,
            jednostki : []
        },
        przychod:{
            zloto : 10,
            zelazo : 10,
            drzewo : 10,
            ludzie : 10
        },
        addOddzial : function(nazwaOddzialu, tabJednostek) {
            var tablica = [];
            var pozycja = wylosujPozycjeNowegoOddzialu(this.zamek);
            for (var i = 0; i < 7; i++) {
                if(tabJednostek[i] != undefined)
                    tablica.push({
                        id : tabJednostek[i][0],
                        ilosc : tabJednostek[i][1]
                    });
                else{
                    tablica.push({
                        id : 0,
                        ilosc : 0
                    });
                }
            }
            this.oddzialy.push({
                nazwa : nazwaOddzialu,
                jednostki : tablica,
                x : pozycja.x,
                y : pozycja.y
            });
            rysujOddzial(turaGracza);

        }
    };
    for(var i=0;i<jednostka.length;i++) obj.zamek.jednostki.push(0);
    console.log(obj);
    return obj;
};



function checkIsFree(obiekt){
		//Sprawdza czy to miejsce jest puste
	for (var i = 0; i < gracz.length; i++) { // PETLE PO oddzialach
		for (var j = 0; j < gracz[i].oddzialy.length; j++) {
			if(gracz[i].oddzialy[j].x == obiekt.x && gracz[i].oddzialy[j].y == obiekt.y) return false;
		}
	}
	return true;
}


function wylosujPozycjeNowegoOddzialu(pozycja) {
	var tablica = isoH.obszarWokol(pozycja.x, pozycja.y);
	var obiektZwracany = null;
	for (var i = 0; i < tablica.length; i++) {
		if (checkIsFree({x:tablica[i][0],y:tablica[i][1]})) {
			obiektZwracany = {x:tablica[i][0],y:tablica[i][1]};
			break;
		}
	}
	return obiektZwracany;
}




 
function rysujOddzial(idGracza) {
	var j = gracz[idGracza].oddzialy.length - 1;	//id ost elementu

var rycerz = Crafty.e("2D, Canvas, rycerz" + idGracza + ", Mouse, Tween, rod_" + gracz[idGracza].rod).areaMap([0, 38], [15, 23], [48, 23], [62, 38], [48, 50], [15, 50]).bind("Click", function () {
        if (oddzialKlikniety) {

		} else {
			var pos = isoH.px2pos(this.x, this.y);
			mozliwyRuchTab = isoH.obszarWokol(pos.x, pos.y);
			for (var a = 0; a < mozliwyRuchTab.length; a++) {
				podswietlenie = Crafty.e("2D, Canvas, podswietl");
				isoH.place(podswietlenie, mozliwyRuchTab[a][0], mozliwyRuchTab[a][1], 2);
				podswietlenieTab.push(podswietlenie);
			}
			oddzialKlikniety = this;
            jednostkaAktywna = this;
            console.log(jednostkaAktywna);
			$("#miniM").css("background-image", "url(img/herby/" + Object.keys(oddzialKlikniety.get(0).__c)[6].slice(4) + ".png)");
		}

	});
	rycerz.attr({
		id : j,
		nazwa : gracz[idGracza].oddzialy[j].nazwa
	});

	isoH.place(rycerz, gracz[idGracza].oddzialy[j].x, gracz[idGracza].oddzialy[j].y, 5);

}





function aktualizujSurowce(){
    console.log(turaGracza);
	$("#zloto").find("p").html(gracz[turaGracza].surowce.zloto);
	$("#zelazo").find("p").html(gracz[turaGracza].surowce.zelazo);
	$("#drewno").find("p").html(gracz[turaGracza].surowce.drzewo);
	$("#ludzie").find("p").html(gracz[turaGracza].surowce.ludzie);
	$("#teren").find("p").html(gracz[turaGracza].surowce.teren);
}

function nowaTura(){
		var iloscTerenu =0;
	for (var i = 0; i < 40; i++) {
		for (var j = 0; j < 40; j++) {
			if(mapa[i][j] == turaGracza+3) iloscTerenu++;
		}
	}

    $("#miniM").css("background-image", "url(img/herby/" + gracz[turaGracza].rod + ".png)");
	
	gracz[turaGracza].surowce.teren = iloscTerenu; // aktualizacja terenu	
	aktualizujSurowce(); // aktualizacja Surowcow
	$("#ntm_nazwa").html("Tura gracza: "+gracz[turaGracza].imie);
	$("#nowaTuraModal").dialog({
				height : 350,
				modal : true,
				title: "Nowa tura"
			});

    $("#przychod_zlota").html(gracz[turaGracza].przychod.zloto);
    $("#przychod_drewna").html(gracz[turaGracza].przychod.drzewo);
    $("#przychod_zelaza").html(gracz[turaGracza].przychod.zelazo);
    $("#przychod_ludzi").html(gracz[turaGracza].przychod.ludzie);

    //Centruje kamere na zamku
    var pos = isoH.pos2px(gracz[turaGracza].zamek.x-2, gracz[turaGracza].zamek.y-3);
    isoH.centerAt(pos.left,pos.top);

    if(oknoWalki) oknoWalki.close();
}


function idToName(id) {
	return spriteArray[id];
}

function kopiujTablice(stara,nowa){
		for (var i = 0; i < stara.length; i++) {
		nowa.push(stara[i].slice(0));
	}
	return nowa;
}

function kopiujMape(stara,nowa){
		for (var i = 0; i < stara.length; i++) {
			for (var j = 0; j < stara[0].length; j++) {
				nowa[i][j]=stara[i][j];
		}
	}
	return nowa;
}

function ruchMozliwy(x,y){
	var pos = isoH.px2pos(x,y);
	for (var i = 0; i < mozliwyRuchTab.length; i++){ 
		var a = new Crafty.math.Vector2D(mozliwyRuchTab[i][0],mozliwyRuchTab[i][1]);
		var b = new Crafty.math.Vector2D(pos.x,pos.y);
		if(a.equals(b)){
			return true;
		}
	}
	return false;
}

function obecneJednostki(tab){
	for (var i = 1; i < tab.length; i++){ 
		if(tab[i][1]>0) return true;
	}
	return false;
}


function indexInGracz(szukane) {
	for (var i = 0; i < gracz.length; i++) 
		if (gracz[i].rod == szukane) return i;
	return "false";
}


var ruszJednostka = function(obiekt) {
	oddzialKlikniety.tween({
		x : obiekt.x,
		y : obiekt.y
	}, 3);
	var pos = isoH.px2pos(obiekt.x,obiekt.y);
	isoH.centerAt(obiekt.x, obiekt.y);
	var rod = Object.keys(oddzialKlikniety.get(0).__c)[6].slice(4);
	isoH.place(Crafty.e("2D, Canvas, "+rod), pos.x, pos.y, 1);
	
	mapa[pos.x][pos.y] = indexInGracz(rod)+3;
	mapaTest = kopiujMape(mapa,mapaTest);
	wypelnij(pos.x, pos.y, indexInGracz(rod)+3);

		while (listaDoZajecia.length > 0) {
			isoH.place(Crafty.e("2D, Canvas, "+rod), listaDoZajecia[0].x, listaDoZajecia[0].y, 1);
			mapa[listaDoZajecia[0].x][listaDoZajecia[0].y] = indexInGracz(rod)+3;
			listaDoZajecia.shift();
		}
		
	oddzialAtk = [pos.x,pos.y];
	gracz[turaGracza].oddzialy[oddzialKlikniety.id].x =pos.x;
	gracz[turaGracza].oddzialy[oddzialKlikniety.id].y =pos.y;
	if (obecneJednostki(mapaDzicy[pos.x][pos.y])) {
		oddzialDef = gracz[turaGracza].oddzialy[oddzialKlikniety.id];
		oknoWalki = window.open("Walka/index.html", "_blank", "toolbar=no, scrollbars=no, resizable=no, top=100, left=100, width=1020, height=680", "walka", "");
		oknoCzyZamkniete = 0;
	}
	oddzialKlikniety = null;
	
	aktualizujSurowce();
};


$(document).ready(function() {
	isoH = Crafty.hexametric.init(64, 64, 40, 40);
	Crafty.init(924, 736);
	Crafty.viewport.scale(1.2);

	Crafty.sprite(64, "img/tiles_rozdz.png", {
		grass : [0, 0, 1, 1],
		bloto : [1, 0, 1, 1],
		kamien : [2, 0, 1, 1],
		baratheon : [3, 0, 1, 1],
		lannister : [4, 0, 1, 1],
		stark : [5, 0, 1, 1],
		targaryen : [6, 0, 1, 1],
		castle : [7, 0, 1, 1],
		drzewa : [8, 0, 1, 1],
		kopalniaZlota : [0, 2, 1, 1],
		rycerz0:[9,0,1,1],
		rycerz1:[10,0,1,1],
		rycerz2:[11,0,1,1],
		rycerz3:[12,0,1,1],
		podswietl:[1,2,1,1]

	});


	mapa = generate(40, 700, 70);
	mapaDzicy = losujDzikich(mapa);
	mapaTest = kopiujTablice(mapa,mapaTest);
	
	// TWORZENIE GRACZY
	gracz.push(new Gracz("Teo","baratheon"));
	gracz.push(new Gracz("Gardian","lannister"));
	gracz.push(new Gracz("Przemek","stark"));
	gracz.push(new Gracz("Wyczes","targaryen"));

	// PRZYPISUJE ZAMKI GRACZOM
	for (var k = 0; k < pozZamku.length; k++) {
		gracz[k].zamek.x=pozZamku[k][0];
		gracz[k].zamek.y=pozZamku[k][1];
	}

	
	for (var i = 40; i > 0; i--) for (var y = 0; y < 40; y++) {
        var which = mapa[i][y];
        if (!which)
            which = 0;
        var tile = Crafty.e("2D, Canvas, " + idToName(which) + ", Mouse").attr({
            z: i +  y + 1
        }).areaMap([0, 38], [15, 23], [48, 23], [62, 38], [48, 50], [15, 50])
            .bind("MouseDown",function (e) {
                var pos;
                if (e.button > 1) {
                    pos = isoH.px2pos(this.x, this.y);
                    console.log(isoH.px2pos(this.x, this.y));
                    console.log(mapaDzicy[pos.x][pos.y]);
                }

                if (oddzialKlikniety) {
                    for (var a = 0; a < podswietlenieTab.length; a++)
                        podswietlenieTab[a].destroy();
                    if (ruchMozliwy(this.x, this.y)) {
                        ruszJednostka(this);
                    }
                    else oddzialKlikniety = null;
                }

            }).bind("MouseOver",function () {
                for (var m = 0; m < spriteArray.length; m++)
                    if (this.has(spriteArray[m]))
                        this.sprite(m, 1);
            }).bind("MouseOut", function () {
                for (var m = 0; m < spriteArray.length; m++)
                    if (this.has(spriteArray[m]))
                        this.sprite(m, 0);
            });
        isoH.place(tile, i, y, 1);
        if (which == 1)
            isoH.place(Crafty.e("2D, Canvas, drzewa"), i, y, 2);
        if (which == 2) {
            isoH.place(Crafty.e("2D, Canvas, kopalniaZlota"), i, y, 2);
        }
    }
	//Rysowanie zamków
	for (var i = 0; i < pozZamku.length; i++) {
		isoH.place(Crafty.e("2D, Canvas, castle"), pozZamku[i][0], pozZamku[i][1], 2);
	}

	Crafty.addEvent(this, Crafty.stage.elem, "mousedown", function(e) {
		if (e.button > 1)
			return;
		var base = {
			x : e.clientX,
			y : e.clientY
		};

		function scroll(e) {
			var dx = base.x - e.clientX, dy = base.y - e.clientY;
			base = {
				x : e.clientX,
				y : e.clientY
			};
			Crafty.viewport.x -= dx;
			Crafty.viewport.y -= dy;
        }
        Crafty.addEvent(this, Crafty.stage.elem, "mousemove", scroll);
		Crafty.addEvent(this, Crafty.stage.elem, "mouseup", function() {
		Crafty.removeEvent(this, Crafty.stage.elem, "mousemove", scroll);
		});
	});
	

	$("body").mouseover(function() {
		if (oknoWalki && !oknoWalki.closed) {
			window.parent.document.getElementById("container").style.visibility = "hidden";
		}
		if (oknoWalki && oknoWalki.closed) {
			window.parent.document.getElementById("container").style.visibility = "visible";
			aktualizujSurowce();
		}
	});

    nowaTura();

});
