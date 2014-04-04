var spriteArray = [
		"grass",
		"stone",
		"drzewa",
		"baratheon",
		"lannister",
		"stark",
		"targaryen"
		];
		
function idToName(id){
	return spriteArray[id];
}

$(document).ready(function() {
	Crafty.init(924,736);

	Crafty.sprite(64, "img/tiles_moje.png", {
		grass: 		[0,0,1,1],
		stone: 		[1,0,1,1],
		drzewa:		[2,0,1,1],
		baratheon : [3,0,1,1],
		lannister:  [4,0,1,1],
		stark: 		[5,0,1,1],
		targaryen:  [6,0,1,1],
		castle:		[3,2,1,1]
	});

	var isoH = Crafty.hexametric.init(64,64,40,40);
	var z = 0;
	var mapa = generate(40,700,70);
	for(var i = 40; i > 0; i--) {
		for(var y = 0; y < 40; y++) {
			var which = mapa[i][y];
			if (!which) which=0;
			var tile = Crafty.e("2D, Canvas, "+ idToName(which) +", Mouse")
			.attr({
				z:i+1 * y+1
				})
			.areaMap([0,38],[15,23],[48,23],[62,38],[48,50],[15,50])
			.bind("Click", function(e) {
				console.log(e.mouseButton);
			}).bind("MouseOver", function() {
				for(var m=0;m<7;m++)
					if(this.has(spriteArray[m])) this.sprite(m,1);
			}).bind("MouseOut", function() {
				for(var m=0;m<7;m++)
					if(this.has(spriteArray[m])) this.sprite(m,0);
			});
			isoH.place(tile, i, y, 1);
		}
	}
	
	for(var i=0;i<pozZamku.length;i++){
		isoH.place(Crafty.e("2D, Canvas, castle"),pozZamku[i][0],pozZamku[i][1],2);
	}
	
	Crafty.addEvent(this, Crafty.stage.elem, "mousedown", function(e) {
		if(e.button > 1) return;
		var base = {x: e.clientX, y: e.clientY};

		function scroll(e) {
			var dx = base.x - e.clientX,
				dy = base.y - e.clientY;
				base = {x: e.clientX, y: e.clientY};
			Crafty.viewport.x -= dx;
			Crafty.viewport.y -= dy;
		};

		Crafty.addEvent(this, Crafty.stage.elem, "mousemove", scroll);
		Crafty.addEvent(this, Crafty.stage.elem, "mouseup", function() {
			Crafty.removeEvent(this, Crafty.stage.elem, "mousemove", scroll);
		});
	});
});