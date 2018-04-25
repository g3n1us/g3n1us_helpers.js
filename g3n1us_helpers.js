var g3n1us_helpers = {
	
	_this: this,
	
	
	ltrim: function(str, charlist) {
	  charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
	    .replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^:])/g, '$1')
	
	  var re = new RegExp('^[' + charlist + ']+', 'g')
	
	  return (str + '')
	    .replace(re, '')
	},
	
	rtrim: function(str, charlist) {
		charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
		.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^:])/g, '\\$1')
		
		var re = new RegExp('[' + charlist + ']+$', 'g')
		
		return (str + '').replace(re, '')
	},
	
	randid: function(){
		return 'ID' + Math.round(Math.random() * 100000);
	},	
	
	getArgs: function(func) {
	  // First match everything inside the function argument parens.
	  var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];
	 
	  // Split the arguments string into an array comma delimited.
	  return args.split(',').map(function(arg) {
	    // Ensure no inline comments are parsed and trim the whitespace.
	    return arg.replace(/\/\*.*\*\//, '').trim();
	  }).filter(function(arg) {
	    // Ensure no undefined values are added.
	    return arg;
	  });
	},
		
	filter_int: function(num){
		if(typeof num !== "string") return num;
		else if(isNaN( parseInt(num) )) return num;
		else return parseInt(num);
	},
	
	str_contains: function(haystack, needle){
		return haystack.indexOf(needle) !== -1;
	},
	
	str_slug: function(text){
		return text.toString().toLowerCase()
			.replace(/\s+/g, '-')           // Replace spaces with -
			.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
			.replace(/\-\-+/g, '-')         // Replace multiple - with single -
			.replace(/^-+/, '')             // Trim - from start of text
			.replace(/-+$/, '');            // Trim - from end of text
		// Thanks @mathewbyrne: https://gist.github.com/mathewbyrne/1280286			
	},
	starts_with: function(string, needle){
		return string.slice(0, needle.length) == needle;
	},
	in_array: function(needle, haystack){
		return haystack.indexOf(needle) !== -1;
	},
	
	array_where: function(arr, callback){
		var first = null;
		arr.forEach(function(item){
			if(callback(item)) first = item;
		})
		return first;
	},
	
	str_rand: function(length){
		length = !length ? 5 : length;
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	
	    for( var i=0; i < length; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));
	
	    return text;
	},
	array_get: function(obj, prop, _default){
		var _default = _default || null;
		return (typeof obj[prop] !== "undefined") ? obj[prop] : _default;
	},
	// below is alias to above function
	object_get: function(obj, prop, _default){
		return array_get(obj, prop, _default);
	},
	
	array_rand: function(arr){
		var len = arr.length;
		var i = Math.ceil((Math.random() * len)) - 1;
		return arr[i];
	},
	
	array_keys_by: function(key, array){
		var keys = [];
		array.forEach(function(item){
			keys.push(item[key]);
		});
		return keys;
	},
	
	array_filter: function(arr, callback){
		var filtered = [];
		arr.forEach(function(v,k){
			if(callback(v, arr)){
				filtered.push(v);
			};
		});
		return filtered;
	},
	array_diff: function(sharedkey, array1, array2){
		var array1keys = this.array_keys_by(sharedkey, array1);
		var array2keys = this.array_keys_by(sharedkey, array2);
		var resultingarray = [];
		array1.forEach(function(array1item){
			if(!g3n1us_helpers.in_array(array1item[sharedkey], array2keys)) resultingarray.push(array1item);
		});
		return resultingarray;
	},
	
	array_except: function(obj, excluded_keys){
		var newobj = {};
		for(key in obj){
			if(!g3n1us_helpers.in_array(key, excluded_keys)) newobj[key] = obj[key];
		}	
		return newobj;
	},
	
	array_only: function(obj, included_keys){
		var newobj = {};
		included_keys.forEach(function(item){
			newobj[item] = obj[item]
		});
		return newobj;
	},
	
	array_dot: function(obj){		
		var res = {};
		(function recurse(obj, current) {
		  for(var key in obj) {
		    var value = obj[key];
		    var newKey = (current ? current + "." + key : key);  // joined key with dot
		    if(value && typeof value === "object") {
				res[newKey] = value;
				recurse(value, newKey);  // it's a nested object, so do it again
		    } else {
				res[newKey] = value;  // it's not an object, so set the property
		    }
		  }
		})(obj);
		return res; 		
	},
		
	is_array: function(possible_array){
		return typeof possible_array === "object" && typeof possible_array.length === "number";
	},
		
	array_pluck: function(obj, val){
		var results = [];
		for(var i in obj){
			var dotobj = g3n1us_helpers.array_dot(obj[i]);
			results.push(dotobj[val]);
		}
		return results;
	},
		
	ucwords: function(str) {
	    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
	        return $1.toUpperCase();
	    });
	},
	
	queryStringify: function(requestquery){
		var str = '?';
		for(key in requestquery) str += key + '=' + requestquery[key] + '&';
		if(str.substr(-1) == '&') str = str.slice(0, -1);
		return str;
	},
	
	merge_object: function(obj1,obj2){
	    var obj3 = {};
	    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
	    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
	    return obj3;
	},
	
	array_merge: function(obj1,obj2){
		return g3n1us_helpers.merge_object(obj1,obj2);
	},
	// next is similar to above, but returns the original object with the seconds objects properties applied to it.
	array_apply: function(dbobj, values){
		for(valuekey in values) dbobj[valuekey] = values[valuekey];
		return dbobj;
	},
	
	objectify: function(keyby, arr){
		var obj = {};
		arr.forEach(function(val){
			obj[val[keyby]] = val;
		});
		return obj;
	},
	
	getMethods: function(obj){
	    var res = [];
	    for(var m in obj) {
	        if(typeof obj[m] == "function") {
	            res.push(m)
	        }
	    }
	    return res;
	},
	
	array_last: function(arr){return arr[arr.length-1]},
	
	getHash: function(key, separator){
		if(!separator) separator = '/';
	    var hash = g3n1us_helpers.rtrim(g3n1us_helpers.ltrim(window.location.hash, '/'), '/');
	    hash = g3n1us_helpers.rtrim(g3n1us_helpers.ltrim(hash, separator), separator);
	    var args = hash.split(separator);
	    var obj = {};
	    args.forEach(function(val){
		    var kv = val.split('=');
		    if(kv.length != 2 || kv[0].length == 0 || kv[1].length == 0) {
			    
		    }
		    else{
			    obj[kv[0]] = g3n1us_helpers.filter_int( kv[1] );
		    }
	    });
	    if(!key)
		    return obj;
	    else 
		    return obj[key];		
	},
	
	setHash: function(obj, hashchange){
		var hasharray = [];
		if(!obj) obj = {};
		var initialobj = g3n1us_helpers.getHash();
		var ischanged = false;
		for(testkey in obj){
			if(obj[testkey] != initialobj[testkey]){
				ischanged = true;
				break;
			}
		}
		if(ischanged){
			obj = g3n1us_helpers.array_merge(initialobj,obj);
			
			for(key in obj){
				if(key && obj[key]){
					hasharray.push(key + '=' + obj[key]);
				}	
			}
			var hashstring = '/' + hasharray.join('/');
			if(hashchange)
				window.location.hash = hashstring;					
			else
				return hashstring;
		}
	},
	
	form2Object: function($form, appendedObj){
		var returnVal = {};
/*
		Object.defineProperty(returnVal, "length", { get: function () {
			var length = 0;
			for(var i in returnVal) length++;
			return length;			
		} });
*/

		$form.serializeArray().forEach(function(obj){
			returnVal[obj.name] = obj.value; 
		});
		if(appendedObj){
			for(k in appendedObj) returnVal[k] = appendedObj[k]; 
		}
		if($form.data('formdata')){
			var jsonExtra = $form.data('formdata');
			
			for(k in jsonExtra) returnVal[k] = jsonExtra[k]; 
		}
		var length = 0;
		for(var i in returnVal) length++;
		returnVal.length = length;
		return returnVal;		
	},
	
	ends_with: function(string, ending){
		var realending = string.slice(ending.length * -1);
		return ending == realending;
	},
	
	isset: function(variablename, obj){
		var findin = obj || window;
		return typeof findin[variablename] !== "undefined";
	},
	
	istrue: function(variablename, obj){
		var findin = obj || window;		
		return !(!g3n1us_helpers.isset(variablename) || !findin[variablename]);
	},
	
	array_unique: function(arr){
		var u = {}, a = [];
		for(var i = 0, l = arr.length; i < l; ++i){
		  if(u.hasOwnProperty(arr[i])) {
		     continue;
		  }
		  a.push(arr[i]);
		  u[arr[i]] = 1;
		}
		return a;
	},
	
	mime: function(filename){
		var path = filename.toLowerCase();
		var mime = "text/html";
		if(g3n1us_helpers.ends_with(path, ".css")) mime = "text/css";
		else if(g3n1us_helpers.ends_with(path, ".less")) mime = "text/css";
		else if(g3n1us_helpers.ends_with(path, ".sass")) mime = "text/css";
		else if(g3n1us_helpers.ends_with(path, ".scss")) mime = "text/css";
		else if(g3n1us_helpers.ends_with(path, ".mp4")) mime = "video/mp4";
		else if(g3n1us_helpers.ends_with(path, ".mov")) mime = "video/quicktime";
		else if(g3n1us_helpers.ends_with(path, ".js")) mime = "application/javascript";
		else if(g3n1us_helpers.ends_with(path, ".pdf")) mime = "application/pdf";
		else if(g3n1us_helpers.ends_with(path, ".svg")) mime = "image/svg+xml";
		else if(g3n1us_helpers.ends_with(path, ".jpg")) mime = "image/jpeg";
		else if(g3n1us_helpers.ends_with(path, ".jpeg")) mime = "image/jpeg";
		else if(g3n1us_helpers.ends_with(path, ".png")) mime = "image/png";
		else if(g3n1us_helpers.ends_with(path, ".gif")) mime = "image/gif";
		else if(g3n1us_helpers.ends_with(path, ".ico")) mime = "image/vnd.microsoft.icon";
		else if(g3n1us_helpers.ends_with(path, ".json")) mime = "application/json";
		else if(g3n1us_helpers.ends_with(path, ".ttf")) mime = "application/x-font-truetype";
		else if(g3n1us_helpers.ends_with(path, ".woff")) mime = "application/font-woff";
		else if(g3n1us_helpers.ends_with(path, ".woff2")) mime = "application/font-woff2";
		else if(g3n1us_helpers.ends_with(path, ".otf")) mime = "application/x-font-opentype";
		else if(g3n1us_helpers.ends_with(path, ".eot")) mime = "application/vnd.ms-fontobject";
		else if(g3n1us_helpers.ends_with(path, ".md")) mime = "text/markdown; charset=UTF-8";
		else if(g3n1us_helpers.ends_with(path, ".swf")) mime = "application/x-shockwave-flash";
		else if(g3n1us_helpers.ends_with(path, ".php")) mime = "text/html";
		else if(g3n1us_helpers.ends_with(path, ".hbs")) mime = "text/x-handlebars-template";
		else if(g3n1us_helpers.ends_with(path, ".json")) mime = "application/json";
		return mime;
	},
	
	is_image: function(filename){
		return g3n1us_helpers.str_contains(g3n1us_helpers.mime(filename), 'image');
	},
	is_pdf: function(filename){
		return g3n1us_helpers.str_contains(g3n1us_helpers.mime(filename), 'pdf');
	},
	
	is_url: function(t){
		var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
		var regex = new RegExp(expression);
		return t.match(regex);	
	},	
	
	is_video: function(filename){
		return g3n1us_helpers.str_contains(g3n1us_helpers.mime(filename), 'video');
	},
	
	parse_url: function(url){
		var parser = document.createElement('a');
		parser.href = url;
		return {
			protocol: parser.protocol,
			hostname: parser.hostname,
			port:     parser.port,   
			pathname: parser.pathname,
			search:   parser.search,
			hash:     parser.hash, 
			host:     parser.host,   	
		}
	},
	

}

if(typeof window !== "undefined")
	for(var i in g3n1us_helpers){
		if(i !== '_this') window[i] = g3n1us_helpers[i];
	}
	
window.g3n1us_application_windows = window.g3n1us_application_windows || {};
		
function popupwindow(url, title, w, h) {
	if(!title) var title = "Window";
	if(!w) var w = 800;
	if(!h) var h = 600;
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
	console.log(window.g3n1us_application_windows[url]);
	if(typeof window.g3n1us_application_windows[url] !== "undefined" 
	&& typeof window.g3n1us_application_windows[url].focus == "function"
	&& !window.g3n1us_application_windows[url].closed){
			window.g3n1us_application_windows[url].focus();
	}
	else
		window.g3n1us_application_windows[url] = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
		
	return window.g3n1us_application_windows[url];
}	


$(window).on('beforeunload', function(e){
	for(var i in window.g3n1us_application_windows)
	window.g3n1us_application_windows[i].close();

});
	


/*
 * object.watch polyfill
 *
 * 2012-04-03
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

// object.watch
if (!Object.prototype.g3n1us_watch) {
	Object.defineProperty(Object.prototype, "g3n1us_watch", {
		  enumerable: false
		, configurable: true
		, writable: false
		, value: function (prop, handler) {
			var
			  oldval = this[prop]
			, newval = oldval
			, getter = function () {
				return newval;
			}
			, setter = function (val) {
				oldval = newval;
				return newval = handler.call(this, prop, oldval, val);
			}
			;
			
			if (delete this[prop]) { // can't watch constants
				Object.defineProperty(this, prop, {
					  get: getter
					, set: setter
					, enumerable: true
					, configurable: true
				});
			}
		}
	});
}


// object.unwatch
if (!Object.prototype.g3n1us_unwatch) {
	Object.defineProperty(Object.prototype, "g3n1us_unwatch", {
		  enumerable: false
		, configurable: true
		, writable: false
		, value: function (prop) {
			var val = this[prop];
			delete this[prop]; // remove accessors
			this[prop] = val;
		}
	});
}


function previewFile(el) {
	console.log(el);
	var preview = $($(el).data('image_target'))[0];
	var file    = el.files[0];
	var reader  = new FileReader();
	
	reader.addEventListener("load", function () {
		preview.src = reader.result;
	}, false);
	
	if (file) {
		reader.readAsDataURL(file);
	}
}	


if(typeof module !== "undefined")
	module.exports = g3n1us_helpers;
	