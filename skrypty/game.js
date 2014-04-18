var spriteArray = [
"grass", 
"bloto", 
"kamien", 
"baratheon", 
"lannister", 
"stark", 
"targaryen"];
var gracz = [
{
	x : 10,
	y : 20,
	rod:"baratheon"
},
{
	x : 10,
	y : 30,
	rod:"lannister"
},
{
	x : 10,
	y : 10,
	rod:"stark"
}
,
{
	x : 10,
	y : 15,
	rod:"targaryen"
}
];
var isoH;
var podswietlenie ;
var podswietlenieTab = [];
var mozliwyRuchTab = [];
var oddzialKlikniety = null;
var mapaT= [];
var mapa = [];

function idToName(id) {
	return spriteArray[id];
}

function ruchMozliwy(x,y){
	var pos = isoH.px2pos(x,y);
	for (var i = 0; i < mozliwyRuchTab.length; i++){ 
		a = new Crafty.math.Vector2D(mozliwyRuchTab[i][0],mozliwyRuchTab[i][1]);
		b = new Crafty.math.Vector2D(pos.x,pos.y);
		if(a.equals(b)){
			return true;
		}
	}
		
	return false;
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
	mapa[pos.x][pos.y] = 3;//na pale
	oddzialKlikniety = null;
};

$(document).ready(function() {
	Crafty.init(924, 736);
	Crafty.viewport.scale(0.8);

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
		rycerz:[9,0,1,1],
		podswietl:[1,2,1,1]

	});

	isoH = Crafty.hexametric.init(64, 64, 40, 40);
	var z = 0;
	mapa = generate(40, 700, 70);
	console.log(mapa);
	mapaT = mapa; //mapa Testowa

	
	for (var i = 40; i > 0; i--) {
		for (var y = 0; y < 40; y++) {
			var which = mapa[i][y];
			if (!which)
				which = 0;
			var tile = Crafty.e("2D, Canvas, " + idToName(which) + ", Mouse").attr({
				z : i + 1 * y + 1
			}).areaMap([0, 38], [15, 23], [48, 23], [62, 38], [48, 50], [15, 50])
			.bind("MouseDown", function(e) {
				if (e.button>1) {
					console.log(isoH.px2pos(this.x,this.y));
					wypelnij(isoH.px2pos(this.x,this.y).x,isoH.px2pos(this.x,this.y).y,3);
					console.log(listaDoZajecia[0].x);
				}
				if (oddzialKlikniety) {	
					for (var a = 0; a < podswietlenieTab.length; a++)		
						podswietlenieTab[a].destroy();	
					if(ruchMozliwy(this.x,this.y)){
						ruszJednostka(this);
					}
					else oddzialKlikniety = null;
				}

			}).bind("MouseOver", function() {
				for (var m = 0; m < spriteArray.length; m++)
					if (this.has(spriteArray[m]))
						this.sprite(m, 1);
			}).bind("MouseOut", function() {
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
	}
	//Rysowanie zamków
	for (var i = 0; i < pozZamku.length; i++) {
		isoH.place(Crafty.e("2D, Canvas, castle"), pozZamku[i][0], pozZamku[i][1], 2);
	}
	//Rysowanie oddzialow
	for (var i = 0; i < gracz.length; i++) {
		var rycerz = Crafty.e("2D, Canvas, rycerz, Mouse, Tween, rod_"+ gracz[i].rod).areaMap([0, 38], [15, 23], [48, 23], [62, 38], [48, 50], [15, 50]).bind("Click", function(e) {
			if (oddzialKlikniety) {
			} else {
				var pos = isoH.px2pos(this.x, this.y);
				mozliwyRuchTab = isoH.obszarWokol(pos.x, pos.y);
				for (var a = 0; a < mozliwyRuchTab.length; a++){
					podswietlenie = Crafty.e("2D, Canvas, podswietl");
					isoH.place(podswietlenie, mozliwyRuchTab[a][0], mozliwyRuchTab[a][1], 2);
					podswietlenieTab.push(podswietlenie);				
				}
				oddzialKlikniety = this;
				$("#miniM").css("background-image","url(img/herby/"+Object.keys(oddzialKlikniety.get(0).__c)[6].slice(4)+".png)");
			}

			});
			
		isoH.place(rycerz, gracz[i].x, gracz[i].y, 5);
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
		};

		Crafty.addEvent(this, Crafty.stage.elem, "mousemove", scroll);
		Crafty.addEvent(this, Crafty.stage.elem, "mouseup", function() {
			Crafty.removeEvent(this, Crafty.stage.elem, "mousemove", scroll);
		});
	});
});
