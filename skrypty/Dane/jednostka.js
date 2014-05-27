var jednostka=[
	{},//puste
    {
    	"nazwa":"Miotacz Toporów",
        "hp":"100",
        "atk":"55",
        "def":"60",
		"luck":"20",
		"koszt":"100",
		"nazwaObrazka":"topor"
    },
    {
        "nazwa":"Pikinier",
        "hp":"70",
        "atk":"65",
        "def":"60",
		"luck":"40",
		"koszt":"120",
		"nazwaObrazka":"pikinier"
    },
	    {
	    "nazwa":"Łucznik",
        "hp":"30",
        "atk":"95",
        "def":"60",
		"luck":"60",
		"koszt":"110",
		"nazwaObrazka":"lucznik"
    },
	    {
	    "nazwa":"Kawaleria",
        "hp":"90",
        "atk":"67",
        "def":"65",
		"luck":"46",
		"koszt":"170",
		"nazwaObrazka":"kawaleria"
		
    },
	    {
	    "nazwa":"Ciężka Kawaleria",
        "hp":"80",
        "atk":"95",
        "def":"50",
		"luck":"60",
		"koszt":"220",
		"nazwaObrazka":"Ckawaleria"
    },
	    {
	    "nazwa":"Rycerz",
        "hp":"130",
        "atk":"165",
        "def":"160",
		"luck":"140",
		"koszt":"320",
		"nazwaObrazka":"rycerz"
		
    },
	    {
	    "nazwa":"Kleryk",
        "hp":"14",
        "atk":"25",
        "def":"20",
		"luck":"240",
		"koszt":"700",
		"nazwaObrazka":"kleryk"
    },
	    {
	    "nazwa":"Dowódca",
        "hp":"430",
        "atk":"465",
        "def":"360",
		"luck":"540",
		"koszt":"320"		,
		"nazwaObrazka":"dowodzca"
    },
	    {
	    "nazwa":"Wilkor",
        "hp":"404",
        "atk":"665",
        "def":"360",
		"luck":"440",
		"koszt":"420",
		"nazwaObrazka":"wilkor"
    }
];

var dziki = {
	wlocznik: {
		nazwa: 'wlocznik',
		atk:50,
		def:100,
		hp:40,
	},
	zabojca :  {
		nazwa: 'zabojca',
		atk:100,
		def:50,
		hp:80,
		
	},
	lucznik : {
		nazwa: 'lucznik',
		atk:100,
		def:20,
		hp:40,
	},
	olbrzym :  {
		nazwa: 'olbrzym',
		atk:200,
		def:200,
		hp:200,
	},
	niedzwiedz :  {
		nazwa: 'niedzwiedz',
		atk:200,
		def:200,
		hp:200,
	},
	inny :  {
		nazwa: 'inny',
		atk:400,
		def:400,
		hp:200,
	},
	getJednostka: function(id){
		if(id==0) return this.wlocznik;
		if(id==1) return this.zabojca;
		if(id==2) return this.lucznik;
		if(id==3) return this.olbrzym;
		if(id==4) return this.niedzwiedz;
		if(id==5) return this.inny;
		if(id>5 || id<0) return false;
	}
	
};