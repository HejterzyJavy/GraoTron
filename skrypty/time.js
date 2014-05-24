/**
 * @author w4nted
 */
var czasRundy = 120;
var sek = czasRundy;

function add() {
    //if (oknoCzyZamkniete==1) {
    //if (oknoWalki.closed) {
    if (sek == 0) {
        turaGracza++;
        nowaTura();
        if (turaGracza == 4) {
            turaGlowna++;
            turaGracza = 0;
            sek = czasRundy;
        }
        sek = czasRundy;
    }
    sek--;
    refresh();
    //}
}

function refresh() {
    var textTura = "Do konca tury  " + sek;
    var textTura2 = "<span style='color: red; >Do konca tury  0" + sek + "</span>";
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
    $("#miniM").css("background-image", "url(img/herby/" + text1 + ".png)");

    if (sek < 10)
        document.getElementById("belkaCzas").innerHTML = textTura2;
    else
        document.getElementById("belkaCzas").innerHTML = textTura;
}


setInterval("add()", 1000);

$(document).ready(function () {
    add();
});