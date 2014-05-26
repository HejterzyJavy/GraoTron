/**
 * @author w4nted
 */
var czasRundy = 90;
var sek = czasRundy;
var petlaCzasu;

function add() {
    //if (oknoCzyZamkniete==1) {
    //if (oknoWalki.closed) {
    if (sek == 0) {
        ++turaGracza;
        if (turaGracza == 4) {
            turaGlowna++;
            turaGracza = 0;
        }
        sek = czasRundy;
        nowaTura();
    }
    sek--;
    refresh();
    //}
}

function ustawKolor(czas){
    var wiersz;
    wiersz = "<span style='"+
        "color: rgb("+(100-(czas/5))+"%, "+(czas+10)+"%, 0%)'>"+
        " Do konca tury:  " + czas + " sec</span>";
    return wiersz;
}

function refresh() {
    document.getElementById("belkaTura").innerHTML = "Tura " + turaGlowna + " - " + gracz[turaGracza].rod;
    document.getElementById("belkaCzas").innerHTML = ustawKolor(sek);
}

function czasStart(){
    petlaCzasu = setInterval("add()", 1000);
}

function czasStop(){
    clearInterval(petlaCzasu);
}


$(document).ready(function () {
    czasStart();
    add();
});