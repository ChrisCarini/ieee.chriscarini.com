// - your HTML event calls <strong><em>load</em></strong>
// - which sets up <strong><em>loadSomething</em></strong> to issue an asynchronous <strong><em>request</em></strong>
// - which in turn sets up <strong><em>doneLoading</em></strong> to handle the <strong><em>response</em></strong>

// called from load to provide asynchronous loading
function loadSomething( uriString, targetId ) {
  $(targetId);
  // sets a variable of img to the gif file
  var img = document.createElement("IMG");
  img.src = "commands/images/ajax-loader.gif";
  //document.getElementById( targetId ).innerHTML = "Loading...";
  document.getElementById( targetId ).appendChild(img);
  if ( window.XMLHttpRequest ) {  // not IE
    currentRequest = new XMLHttpRequest();
  }
  else if ( window.ActiveXObject ) {  // IE only
    currentRequest = new ActiveXObject( "Microsoft.XMLHTTP" );
  }
  if ( currentRequest != undefined ) {   // else unable to get a request object
    currentRequest.onreadystatechange = function() {doneLoading( uriString, targetId ); };
    currentRequest.open( "GET", uriString, true );  // true means non-blocking/asynchronous I/O
    currentRequest.send( "" );
  }
  else {
    document.getElementById( targetId ).innerHTML = " Error obtaining request object...\n";    
  }
}

// set up by loadSomething to handle the response(s)
function doneLoading( uriString, targetId ) {
  if ( currentRequest.readyState == 4 ) { // if currentRequest state is "loaded"
    if ( currentRequest.status == 200 ) {  // if status code is "OK"
      // Not necessary, but used to slow down the animated gif
      setTimeout(function(){ document.getElementById( targetId ).innerHTML = currentRequest.responseText}, 1000);
    }
    else {
      document.getElementById(targetId ).innerHTML = " Error loading:\n" + 
      currentRequest.status + "\n" + currentRequest.statusText;
    }
  }
}

// this is the <strong>main entry point</strong> and is called from the HTML
// (for example, using an <strong><em>onclick</em></strong> event)
// to load something into any generic element
function load( targetUriString, targetIdString ) {
	loadSomething( targetUriString, targetIdString );
	// so why do we <strong><em>return false</em></strong> here?
	return false;
}