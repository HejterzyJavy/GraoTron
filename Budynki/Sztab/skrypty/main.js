var tablicaJednostek =  new Array(10);
var tablicaOddzialu =  new Array(10);
var jednostkaId = 0;

$(document).ready(function() {
	
	
	for(var i=0;i<tablicaJednostek.length;i++){
		tablicaJednostek [i] = i;
		$("#pole" + i + " .dolPola p").html( tablicaJednostek [i] + 5 );
	}

	var index = 0;

	$('.poleSiatki').mouseenter(function() {
		id = $(this).attr("id");
		var index = 0;
		jednostkaId = id[id.length - 1];
			$("#tytul").html(jednostka[jednostkaId-1].nazwa);
			$("#hp strong").html(jednostka[jednostkaId-1].hp);
			$("#atk strong").html(jednostka[jednostkaId-1].atk);
			$("#def strong").html(jednostka[jednostkaId-1].def);
			$("#luck strong").html(jednostka[jednostkaId-1].luck);
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
      	
			spinner = $("#spinner").spinner({
				min : 0,
				max : ileMax
			});
			spinner.spinner("value", ileMax);
			//ustawia wart poczatkowa spinnera
			var pole = $(this); 

			$("#przyciski").dialog({
				modal : true,
				buttons : {
					
						Ok : function() {
							tablicaJednostek[id] = ileMax - spinner.spinner("value");
							tablicaOddzialu[pozycjaW] = spinner.spinner("value");
							$("#pole" + id + " .dolPola p").html(tablicaJednostek[id]);
							$("#fs" + pozycjaW + " .ile p").html(tablicaOddzialu[pozycjaW]);
							if(spinner.spinner("value")>0)  {pole.find("img").attr('src',ui.draggable.find("img").attr('src'));}// Kopiowanie elementu przeciaganego 
							spinner.spinner("value", 0);
							$(this).dialog("close");
						}, 
						Cancel: function() {
							$(this).dialog("close");
						}

				}
			}); 

      }
    });
    
    var spinner = $( "#spinner" ).spinner({min: 0, max: 10});
    spinner.spinner( "enable" );
    


    $( document).tooltip({
      content: function() {
          return $("#menuInfo").html();
      },
      items: $(".poleSiatki")
    });
    
    $( "#formacjaSiatka" ).sortable({
        update: function(event, ui) {
        	var newTab = $("#formacjaSiatka" ).sortable('toArray'); 
            console.log($("#formacjaSiatka" ).sortable('toArray'));
            for(var i=0;i<tablicaOddzialu.length;i++){
            	 if ($("#"+newTab[i]).find("p").html() != undefined )
            	tablicaOddzialu[i] = $("#"+newTab[i]).find("p").html().replace(/[A-Za-z$-]/g, "");
            }
            console.log(tablicaOddzialu);
        }
    });
    $( "#formacjaSiatka" ).disableSelection();
    
 	console.log($("#nazwaOddzialu"));
 	$("#akceptuj").button()
      .click(function( event ) {
      	var nazwaOddzialu =$("#nazwaOddzialu").val();
        event.preventDefault();
        window.opener.gracz[0].addOddzial(nazwaOddzialu,tablicaOddzialu);
      });



});
