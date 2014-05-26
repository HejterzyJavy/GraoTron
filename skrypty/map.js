var mapaKopaln ;
var pozZamku;
var listaDoZajecia = [];
/**
 * Funkcja pomocnicza w interpolacji liniowej
 * @param before {Number} Wartość poprzednia
 * @param after {Number} Wartość następna
 * @param atPoint {Number}
 * @returns {Number}
 */
function linearInterpolate(before, after, atPoint) {
	return before + (after - before) * atPoint;
};

/**
 * Funkcja interpolujaca liniowo dane z szumu perlina, do tablicy o danej wartosci
 * @param data
 * @param fitCount
 * @returns {Array}
 */
function interpolate(data, fitCount) {
	var newData = new Array();
	var springFactor = new Number((data.length - 1) / (fitCount - 1));
	newData[0] = data[0];
	// for new allocation
	for (var i = 1; i < fitCount - 1; i++) {
		var tmp = i * springFactor;
		var before = new Number(Math.floor(tmp)).toFixed();
		var after = new Number(Math.ceil(tmp)).toFixed();
		var atPoint = tmp - before;
		newData[i] = this.linearInterpolate(data[before], data[after], atPoint);
	}
	newData[fitCount - 1] = data[data.length - 1];
	return newData;
};

/**
 * Sprawdza czy odleglosc miedzy graczami nie jest zbyt mala
 * @param tab {Array} Tablica z graczami
 * @param x {Number}
 * @param y {Number}
 * @param odleglosc {Number}
 * @returns {boolean}
 */
function sprawdzOdleglosc(tab, x, y, odleglosc) {
	for (var i = 0; i < tab.length; i++) {
		if (Crafty.math.distance(tab[i][0], tab[i][1], x, y) < odleglosc) {
			return false;
		}
	}
	return true;
};
/**
 * Losuje pozycję graczy, każdy gracz oddalony od siebie o "odleglosc"
 * @param iluGraczy {Number}
 * @param rozm {Number}
 * @param odleglosc {Number}
 * @returns {Array}
 */
function wylosujPoz(iluGraczy, rozm,odleglosc) {
	var tabGraczy = [];
	var koniec = false;
	var nrGracza = 0;
	tabGraczy.push([Crafty.math.randomInt(iluGraczy, rozm - 4), Crafty.math.randomInt(iluGraczy, rozm - 4)]);
	while (!koniec) {
		if (nrGracza >= iluGraczy - 1)
			break;
		var x = Crafty.math.randomInt(iluGraczy, rozm - 4);
		var y = Crafty.math.randomInt(iluGraczy, rozm - 4);
		if (sprawdzOdleglosc(tabGraczy, x, y, rozm / odleglosc)) {
			tabGraczy.push([x, y]);
			nrGracza++;
		}
	}
	return tabGraczy;
};
/**
 * Generuje mape przy pomocy algorytmu szumu Perlina
 * @param size {Number} Wielkość mapy
 * @param czulosc {Number} Czulosc szumu
 * @param prog {Number} Prog odcinajacy od "wysokosci"
 * @returns {Array}
 */
function generate(size, czulosc, prog) {

	noise.seed(Math.random());
	size++;
	var map = new Array(czulosc);
	for ( i = 0; i < czulosc; i++)
		map[i] = new Array(czulosc);

	for (var x = 0; x < czulosc; x++) {
		for (var y = 0; y < czulosc; y++) {
			var value = noise.perlin2(x / 100, y / 100);
			if (Math.round(Math.abs(value * 255)) > prog)
				map[x][y] = 1;
				
		}
	}

	var mapNowa = new Array(size);
	for ( i = 0; i < size; i++)
		mapNowa[i] = new Array(size);

	for (var x = 0; x < czulosc; x++)
		if (x % Math.round(czulosc / size) == 0)
			mapNowa[x / Math.round(czulosc / size)] = interpolate(map[x], size);

	
	var tmpArray = wylosujPoz(4, size,2.5);
	pozZamku = tmpArray;
	
	
	mapaKopaln = wylosujPoz(8, size,6);
	console.log(mapaKopaln);
	for (var k = 0; k < mapaKopaln.length; k++) {
		mapNowa[mapaKopaln[k][0]][mapaKopaln[k][1]] = 2;
	}
	
	//obrysowanie terenu gracza i  wokolo gracza
	for (var m = 0; m < tmpArray.length; m++) {
		mapNowa[tmpArray[m][0]][tmpArray[m][1]] = m + 3;
		
		mapNowa[tmpArray[m][0]][tmpArray[m][1] - 1] = m + 3; 
		mapNowa[tmpArray[m][0]] [tmpArray[m][1]+1 ] = m+3;
		mapNowa[tmpArray[m][0]+1] [tmpArray[m][1] ] = m+3;
		mapNowa[tmpArray[m][0]-1] [tmpArray[m][1] ] = m+3;
		
		if ((tmpArray[m][0] % 2) === 0) {
			mapNowa[tmpArray[m][0]-1] [tmpArray[m][1]-1 ] = m+3;
			mapNowa[tmpArray[m][0]+1] [tmpArray[m][1]-1 ] = m+3;
		}
		if ((tmpArray[m][0] % 2) != 0) {
			mapNowa[tmpArray[m][0]-1] [tmpArray[m][1]+1 ] = m+3;
			mapNowa[tmpArray[m][0]+1] [tmpArray[m][1]+1 ] = m+3;
		}

	}
console.log("KONIEC GENEROWANIA MAPY");
	return mapNowa;
}

/**
 * Funkcja rekurencyjna do wypelniania obszarów pomiędzy zajętymi terenami,
 * od zadanego punktu funkcja "rozlewa" sie po mapie, jeśli wypełni obiekt lub dotrze do krawędzi mapy
 * zatrzymuję się
 * @param x {Number} Wartosc x początkowa algorytmu
 * @param y {Number} Wartość y początkowa algorytmu
 * @param kto {Number} Rodzaj gracza który ją wywołał
 */
function wypelnij(x, y,kto) {
	
	if(x>0 && x<40 && y>0 && y<40){
		mapaTest[x][y] = kto;
		listaDoZajecia.push({x:x,y:y});
		
		if (mapaTest[x][y - 1] != kto) wypelnij(x, y-1,kto);
		if (mapaTest[x][y + 1] != kto) wypelnij(x, y+1,kto);
		if (mapaTest[x + 1][y] != kto) wypelnij(x+1, y,kto);
		if (mapaTest[x - 1][y] != kto) wypelnij(x-1, y,kto);
	
		if ((x % 2) === 0) {
			if (mapaTest[x - 1][y - 1] != kto) wypelnij(x-1, y-1,kto);
			if (mapaTest[x + 1][y - 1] != kto) wypelnij(x+1, y-1,kto);
		}
		if ((x % 2) != 0) {
			if (mapaTest[x - 1][y + 1] != kto) wypelnij(x-1, y+1,kto);
			if (mapaTest[x + 1][y + 1] != kto) wypelnij(x+1, y+1,kto);
		}
	}else {
		listaDoZajecia.length = 0;
		return;
	}
	
}

/**
 * Funkcja generująca pozycję i typy dzikich jednostek na mapie, o podanym na stale prawdopobienstwie
 * @param {Array} map Mapa z miejscem dla dzikich
 * @returns {Array}
 */
function losujDzikich(map){
	var mapaDzikich = new Array(map.length);
	var wsp1 = 15; // wspolczynnik prawdopodobienstwa wystapienia dzikiego na danym polu
		for (var i = 0; i < map.length; i++) {
			mapaDzikich[i] = new Array(map.length);
			for (var j = 0; j < map.length; j++) {
				if (map[i][j] == 1) wsp1 *=2;
				else wsp1 = 15;
				mapaDzikich[i][j] = new Array(7);
				for (var k = 1; k < 7; k++) {
					mapaDzikich[i][j][k] = new Array(3);
					if(Crafty.math.withinRange(Crafty.math.randomInt(0,100),0,wsp1)){//sprawdza prawdo. wystapienia dzikich na danym terenie
						var wylosowana = Crafty.math.randomInt(0,100);
						if(Crafty.math.withinRange(wylosowana,0,28))   {mapaDzikich[i][j][k][0] = 0;mapaDzikich[i][j][k][1] = Crafty.math.randomInt(1,6);}
						if(Crafty.math.withinRange(wylosowana,29,56))  {mapaDzikich[i][j][k][0] = 1;mapaDzikich[i][j][k][1] = Crafty.math.randomInt(1,6);}
						if(Crafty.math.withinRange(wylosowana,57,84))  {mapaDzikich[i][j][k][0] = 2;mapaDzikich[i][j][k][1] = Crafty.math.randomInt(1,6);}
						if(Crafty.math.withinRange(wylosowana,85,90))  {mapaDzikich[i][j][k][0] = 3;mapaDzikich[i][j][k][1] = Crafty.math.randomInt(1,2);}
						if(Crafty.math.withinRange(wylosowana,91,94))  {mapaDzikich[i][j][k][0] = 4;mapaDzikich[i][j][k][1] = Crafty.math.randomInt(1,3);}
						if(Crafty.math.withinRange(wylosowana,95,100)) {mapaDzikich[i][j][k][0] = 5;mapaDzikich[i][j][k][1] = Crafty.math.randomInt(1,2);}
					}
				}
			}
		}
		return mapaDzikich;
	
}

