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
		$.getJSON('dane.json', function(data) {
			$("#tytul").html(data.jednostka[jednostkaId-1].nazwa);
			$("#hp strong").html(data.jednostka[jednostkaId-1].hp);
			$("#atk strong").html(data.jednostka[jednostkaId-1].atk);
			$("#def strong").html(data.jednostka[jednostkaId-1].def);
			$("#luck strong").html(data.jednostka[jednostkaId-1].luck);
		});
	});
	$(".poleSiatki").draggable({ revert: "valid",helper: "clone" });
	
	var id  = 0;
	var ile = 0;
	var pozycjaW = 0;
	$(".pole").droppable({
      drop: function( event, ui ) {
      	id = ui.draggable.attr( "id").replace(/[A-Za-z$-]/g, ""); // pobiera id
      	pozycjaW = $(this).attr( "id").replace(/[A-Za-z$-]/g, "");
      	ile = ui.draggable.find(".dolPola").find("p").html();
      	
        $( this ).find("img").attr('src',ui.draggable.find("img").attr('src'));
         spinner = $( "#spinner" ).spinner({min: 0, max: ile});
         spinner.spinner( "value", ile );
         $("#przyciski").show();
      }
    });
    
    $( "button" ).button();
    var spinner = $( "#spinner" ).spinner({min: 0, max: 10});
    spinner.spinner( "enable" );
    
    $("#akceptuj").click(function() {
    	tablicaJednostek[id] = ile -  spinner.spinner( "value" );
    	tablicaOddzialu[pozycjaW] = spinner.spinner( "value" );
		$("#pole" + id + " .dolPola p").html( tablicaJednostek [id]);
		$("#fs" + pozycjaW + " .ile p").html( tablicaOddzialu[pozycjaW]);
		spinner.spinner( "value", 0 );
		$("#przyciski").hide();
	
    });


});
