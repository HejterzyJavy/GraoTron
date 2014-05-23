/**
 * @author w4nted
 */


function add() {
	//if (oknoCzyZamkniete==1) {
	//if (oknoWalki.closed) {
	   	if (sek == 0) {
	   		turaGracza++;
	   		nowaTura();
	        if (turaGracza == 4) {
	         	turaGlowna++;
	         	turaGracza=0;
	         	sek = 60;
	      	}
	      	sek = 60;
	   	}
   		sek--; 
   		refresh(); 
   //}
}

function refresh() {
   var textTura = "Do konca tury  " + sek;
   var textTura2 = "<font color=\"red\">Do konca tury  0" + sek + "</font>";
   var text ="";
   switch (turaGracza) {
   	case 0: 
   		text1 = "baratheon";
   		break;
   	case 1: 
   		text1 = "lannister";
   		break;
   	case 2: 
   		text1 = "stark";
   		break;
   	case 3: 
   		text1 = "targaryen";
   		break;
   }
   document.getElementById("belkaTura").innerHTML = "Tura " + turaGlowna + " - " + text1;
   $("#miniM").css("background-image", "url(img/herby/"+text1+".png)"); 
 
   if (sek<10) 
   		document.getElementById("belkaCzas").innerHTML = textTura2;
   else
   		document.getElementById("belkaCzas").innerHTML = textTura;
}


var sek = 60;
setInterval( "add()", 1000 );

add();
