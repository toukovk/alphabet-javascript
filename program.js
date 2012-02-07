function debug(msg) {
    // Find the debug section
    var log = document.getElementById("debuglog");

    if(!log) {
	log = document.createElement("div");
	log.id = "debuglog";
	log.innerHTML = "<h1>Debug Log</h1>";
	document.body.appendChild(log);
    }

    var pre = document.createElement("pre");
    var text = document.createTextNode(msg);
    pre.appendChild(text);
    log.appendChild(pre);
}

var lwr = 'abcdefghijklmnopqrstuvwxyzåäö';
var upr = lwr.toUpperCase();

function isValid(parm,val) {
    if (parm == "") return true;
    for (i=0; i<parm.length; i++) {
	if (val.indexOf(parm.charAt(i),0) == -1) return false;
    }
    return true;
}
function isAlpha(parm) {return isValid(parm,lwr+upr);}

function get_entry(key) {
    if(key == null || !isAlpha(key)) {
	// debug("Invalid character");
	return null;
    } 
    // debug("Valid");
    key = key.toUpperCase();
    entry = new Object();
    entry.title = key.toUpperCase() + " " + key.toLowerCase();
    return entry;
}

// Key should be one-character string
function update_key(key) {
    // debug(key);
    entry = get_entry(key);
    if(entry == null) {
	return;
    }
    $("#key_label").text(entry.title);
}

// Register keypress listener
$(function() {
   $(window).keypress(function(e) {
       var key = e.which;
       // debug(key);
       str = String.fromCharCode(key);
       update_key(str);
   });
});
