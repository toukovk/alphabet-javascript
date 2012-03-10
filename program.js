(function() {
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
    function isAlpha(parm) {
	return isValid(parm,lwr+upr);
    }
    
    var images = {
	'a': 'a.jpg',
	'b': 'b.jpg',
	'c': 'c.jpg', 
	'd': 'd.jpg', 
	'e': 'e.png', 
	'f': 'f.jpg', 
	'g': 'g.jpg', 
	'h': 'h.jpg', 
	'i': 'i.png', 
	'j': 'j.jpg', 
	'k': 'k.jpg', 
	'l': 'l.jpg', 
	'm': 'm.jpg', 
	'n': 'n.jpg', 
	'o': 'o.jpg', 
	'p': 'p.png', 
	'q': 'q.jpg', 
	'r': 'r.jpg', 
	's': 's.jpg', 
	't': 't.jpg', 
	'u': 'u.jpg', 
	'v': 'v.png', 
	'w': 'w.jpg', 
	'x': 'x.png', 
	'y': 'y.png', 
	'z': 'z.jpg', 
	'å': 'a_o.jpg', 
	'ä': 'a_uml.png', 
	'ö': 'o_uml.jpg', 
    };
    
    function get_image(key) {
	key = key.toLowerCase();
	return images[key] || 'a.jpg';
    }

    function get_sound_name(key) {
	key = key.toLowerCase();
	if(key == 'ä')
	    return "a_uml";
	else if(key == "å")
	    return "a_o";
	else if(key == "ö")
	    return "o_uml";
	else
	    return key.toLowerCase();
    }
    
    function get_entry(key) {
	if(key == null || !isAlpha(key)) {
	    return null;
	} 
	key = key.toUpperCase();
	entry = new Object();
	entry.title = key.toUpperCase() + " " + key.toLowerCase();
	entry.image = get_image(key);
	entry.sound = get_sound_name(key);
	return entry;
    }
    
    function update_image(image_name) {
	imgFldr = 'images/';
	$("#image").attr('src', imgFldr+image_name);
	resizeImage();
    }

    function resizeImage() {
	var window_height = $(window).height(); 
	var window_width  = $(window).width(); 
	var image = $('#image');
	var image_width   = image.width();
	var image_height  = image.height();
	var height_ratio  = image_height / window_height;
	var width_ratio   = image_width / window_width;
	if (height_ratio > width_ratio) {
	    image.width("auto");
	    image.height("100%");
	} else {
	    image.width("100%");
	    image.height("auto");
	}
    }
    
    // Key should be one-character string
    function update_key(key) {
	entry = get_entry(key);
	if(entry == null) {
	    return;
	}
	$("#greeting").text("");
	$("#key_label").text(entry.title);
	update_image(entry.image);
	$("#image").show();
	play_sound(entry.sound);
    }
    
    function generate_sound_name(name, extension) {
	return "audio/" + name + "." + extension;
    }
    
    var a = null;
    
    function play_sound(name) {
	if(a != null) {
     	    a.pause();
	} else {
	    a = new Audio();
	}
	if(a.canPlayType("audio/mp3")) {
	    name = generate_sound_name(name, "mp3");
	    a.src = name;
	    a.play();
	} else if(a.canPlayType("audio/ogg; codec=vorbis")) {
	    name = generate_sound_name(name, "ogg");
	    a.src = name;
	    a.play();
	} else {
	    debug("audio/mp3 not supported");
	}
    }
    
    
    // Register keypress listener
    $(function() {
	$("#image").hide();
	$(window).keypress(function(e) {
	    var key = e.which;
	    // debug(key);
	    str = String.fromCharCode(key);
	    update_key(str);
	});
    });
}());

