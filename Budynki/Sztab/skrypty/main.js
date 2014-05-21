var tablicaOddzialu =  new Array(10);
var jednostkaId = 0;

$(document).ready(function() {
	var turaGracza =  window.opener.turaGracza;
	jednostkiGracza =  window.opener.gracz[turaGracza].zamek.jednostki;
	
	console.log(jednostkiGracza);
	
	for(var i=0;i<jednostkiGracza.length;i++){
		$("#pole" + i + " .dolPola p").html( jednostkiGracza [i]  );
	}

	var index = 0;

	$('.poleSiatki').mouseenter(function() {
		id = $(this).attr("id");
		var index = 0;
		jednostkaId = id[id.length - 1];
		console.log(jednostkaId);
		$("#tytul").html(jednostka[jednostkaId].nazwa);
		$("#hp strong").html(jednostka[jednostkaId].hp);
		$("#atk strong").html(jednostka[jednostkaId].atk);
		$("#def strong").html(jednostka[jednostkaId].def);
		$("#luck strong").html(jednostka[jednostkaId].luck); 

	});
	$(".poleSiatki").draggable({ revert: "valid",helper: "clone" });
	
	var id  = 0;
	var ileMax = 0;
	var pozycjaW = 0;
	$(".pole").droppable({
		 accept: ".poleSiatki",
      drop: function( event, ui ) {
      	id = ui.draggable.attr( "id").replace(/[A-Za-z$-]/g, ""); // pobiera id
      	pozycjaW = $(this).attr( "id").replace(/[A-Za-z$-]/g, "");
      	ileMax = ui.draggable.find(".dolPola").find("p").html();
      	$("#amount").html(ileMax);
		
			slider = $("#slider").slider({
				range : "min",
				min : 0,
				max : ileMax,
				value : 0,
				slide : function(event, ui) {
					$("#amount").html(ui.value);
				}
			});
			

			slider.slider("value", ileMax);
			//ustawia wart poczatkowa slidera
			var pole = $(this); 

			$("#przyciski").dialog({
				modal : true,
				title: "Wybierz ilosc" ,
				buttons : {				
					Ok : function() {
						jednostkiGracza[id] = ileMax - slider.slider("value");
						if (slider.slider("value") > 0) {
							pole.find("img").attr('src', ui.draggable.find("img").attr('src'));
							tablicaOddzialu[pozycjaW] = new Array(2);
							tablicaOddzialu[pozycjaW][0] = id; // ID
							tablicaOddzialu[pozycjaW][1] = slider.slider("value");// ILOSC
							console.log(tablicaOddzialu);
						}// Kopiowanie elementu przeciaganego
						
						$("#pole" + id + " .dolPola p").html(jednostkiGracza[id]);
						$("#fs" + pozycjaW + " .ile p").html(tablicaOddzialu[pozycjaW][1]);
						
						slider.slider("value", 0);
						$(this).dialog("close");
					}, 

						Cancel: function() {
							$(this).dialog("close");
						}

				}
			}); 

      }
    });
    
    var slider = $( "#slider" ).slider({min: 0, max: 10});
    slider.slider( "enable" );
    


    $( document).tooltip({
      content: function() {
          return $("#menuInfo").html();
      },
      items: $(".poleSiatki")
    });
    
    var tmpTab= new Array(2);
  
	$("#formacjaSiatka").sortable({
		start : function(event, ui) {
			pozycjaStartowa = ui.item.index() + 1;
			if(tablicaOddzialu[pozycjaStartowa] != undefined){
			tmpTab[0] = tablicaOddzialu[pozycjaStartowa][0];
			tmpTab[1] = tablicaOddzialu[pozycjaStartowa][1];}

		},
		stop : function(event, ui) {
			pozycjaKoncowa = ui.item.index()+1;
			if(tablicaOddzialu[pozycjaStartowa] != undefined){
			tablicaOddzialu[pozycjaStartowa][0] = tablicaOddzialu[pozycjaKoncowa][0];
			tablicaOddzialu[pozycjaStartowa][1] = tablicaOddzialu[pozycjaKoncowa][1];
			tablicaOddzialu[pozycjaKoncowa][0] = tmpTab[0];
			tablicaOddzialu[pozycjaKoncowa][1] = tmpTab[1];
			}
		}
	}); 

    $( "#formacjaSiatka" ).disableSelection();
    
 	console.log($("#nazwaOddzialu"));
 	$("#akceptuj").button()
      .click(function( event ) {
      	var nazwaOddzialu =$("#nazwaOddzialu").val();
        event.preventDefault();
        console.log(tablicaOddzialu);
        window.opener.gracz[turaGracza].addOddzial(nazwaOddzialu,tablicaOddzialu);
        window.opener.updateListyOddzialow();
      });



});
