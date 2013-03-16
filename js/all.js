
var Avgrund = (function(){

	var container = document.documentElement,
		popup = document.querySelector( '.avgrund-popup-animate' ),
		cover = document.querySelector( '.avgrund-cover' ),
		currentState = null;

	container.className = container.className.replace( /\s+$/gi, '' ) + ' avgrund-ready';

	// Deactivate on ESC
	function onDocumentKeyUp( event ) {
		if( event.keyCode === 27 ) {
			deactivate();
		}
	}

	// Deactivate on click outside
	function onDocumentClick( event ) {
		if( event.target === cover) {
			deactivate();
		}
	}

	function activate( state ) {
		document.addEventListener( 'keyup', onDocumentKeyUp, false );
		document.addEventListener( 'click', onDocumentClick, false );
		document.addEventListener( 'touchstart', onDocumentClick, false );
    $(".avgrund-cover").click(function(){
      deactivate();
    });
		removeClass( popup, currentState );
		addClass( popup, 'no-transition' );
		addClass( popup, state );
		$(".avgrund-cover").css("top",window.pageYOffset);
		$(".avgrund-popup").css("top",($(window).height()/2)+window.pageYOffset);

		setTimeout( function() {
			removeClass( popup, 'no-transition' );
			addClass( container, 'avgrund-active' );
		}, 0 );

		currentState = state;
	}

	function deactivate() {
		document.removeEventListener( 'keyup', onDocumentKeyUp, false );
		document.removeEventListener( 'click', onDocumentClick, false );
		document.removeEventListener( 'touchstart', onDocumentClick, false );

		removeClass( container, 'avgrund-active' );
		removeClass( popup, 'avgrund-popup-animate');
	}

	function disableBlur() {
		addClass( document.documentElement, 'no-blur' );
	}

	function addClass( element, name ) {
		element.className = element.className.replace( /\s+$/gi, '' ) + ' ' + name;
	}

	function removeClass( element, name ) {
		element.className = element.className.replace( name, '' );
	}

	function show(selector){
		popup = document.querySelector( selector );
		addClass(popup, 'avgrund-popup-animate');
		activate();
		return this;
	}
	function hide() {
		deactivate();
	}

	return {
		activate: activate,
		deactivate: deactivate,
		disableBlur: disableBlur,
		show: show,
		hide: hide
	};

})();


$(document).ready(function() {
  
  $("#dropdown").click(function(){
    if ($("#quickSelect").is(":visible")){
      
    }
    else{
      $(this).toggleClass("on");
    }
  });
  $(".quickSelection").click(function(){
    event.preventDefault();
    $("#dropdown").removeClass("on");
    Avgrund.show("#quickSelect");
  });
  if($("#background").length !==0){
    $("#main-wrapper").backstretch($("#background").attr("src"));
  }
  else{
    $("#main-wrapper").addClass("on");
  }
  $("#main-wrapper").on("backstretch.show", function () {
   $("#main-wrapper").addClass("on");
  });
});
