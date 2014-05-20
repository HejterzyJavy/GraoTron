/**
 * @author w4nted
 */

var turaGracza = 0;
var turaGlowna = 1;

function add() {
   if ( sek == 0 ) {
      sek = 60;
      min--;
      if ( min == 0 && sek == 0) {
         turaGracza++;
         if (turaGracza == 4) {
         	turaGlowna++;
         	turaGracza=0;
         }
      }
   }
   sek--; 
   refresh(); 
}

function refresh() {
   var text = "Do konca tury  " + min + " : " + sek;
   var text2 = "Do konca tury  " + min + " : 0" + sek;
   if (sek<10) 
   		document.getElementById("belkaCzas").innerHTML = text2;
   else
   		document.getElementById("belkaCzas").innerHTML = text;
}

var min, sek;
min = 2;
sek = 0;
setInterval( "add()", 1000 );
add();