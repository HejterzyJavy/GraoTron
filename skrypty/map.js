function linearInterpolate(before, after, atPoint) {
	return before + (after - before) * atPoint;
};
function interpolate(data, fitCount, prog) {
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

// Sprawdza czy odleglosc miedzy graczami nie jesst zbyt mala
function sprawdzOdleglosc(tab, x, y, odleglosc) {
	for (var i = 0; i < tab.length; i++) {
		if (Crafty.math.distance(tab[i][0], tab[i][1], x, y) < odleglosc) {
			return false;
		}
	}
	return true;
};

function wylosujPozGraczy(ilu, rozm) {
	var tabGraczy = [];
	var koniec = false;
	var nrGracza = 0;
	tabGraczy.push([Crafty.math.randomInt(4, rozm - 4), Crafty.math.randomInt(4, rozm - 4)]);
	while (!koniec) {
		if (nrGracza >= ilu - 1)
			break;
		var x = Crafty.math.randomInt(4, rozm - 4);
		var y = Crafty.math.randomInt(4, rozm - 4);
		if (sprawdzOdleglosc(tabGraczy, x, y, rozm / 2.5)) {
			tabGraczy.push([x, y]);
			nrGracza++;
		}
	}
	pozZamku = tabGraczy;
	return tabGraczy;
};

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

	var tmpArray = wylosujPozGraczy(4, size);
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

