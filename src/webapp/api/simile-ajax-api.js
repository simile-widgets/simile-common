/*==================================================
 *  Simile Ajax API
 *==================================================
 */

/*==================================================
 *  REMEMBER to update the Version!
 *==================================================
 */

define([
    "base",
    "platform",
    "debug",
    "xmlhttp",
    "dom",
    "bubble",
    "date-time",
    "string",
    "html",
    "set",
    "sorted-array",
    "event-index",
    "units",
    "ajax",
    "history",
    "window-manager"
], function(SimileAjax, Platform, Debug, XmlHttp, DOM, Graphics, DateTime, StringUtilities, HTML, Set, SortedArray, EventIndex, NativeDateUnit, ListenerQueue, SAHistory, WindowManager) { 
    SimileAjax.Platform = Platform;
    SimileAjax.Debug = Debug;
    SimileAjax.XmlHttp = XmlHttp;
    SimileAjax.DOM = DOM;
    SimileAjax.Graphics = Graphics;
    SimileAjax.DateTime = DateTime;
    SimileAjax.HTML = HTML;
    SimileAjax.Set = Set;
    SimileAjax.SortedArray = SortedArray;
    SimileAjax.EventIndex = EventIndex;
    SimileAjax.NativeDateUnit = NativeDateUnit;
    SimileAjax.ListenerQueue = ListenerQueue;
    SimileAjax.History = SAHistory;
    SimileAjax.WindowManager = WindowManager;

    var getHead = function(doc) {
        return doc.getElementsByTagName("head")[0];
    };
    
    SimileAjax.findScript = function(doc, substring) {
	var scripts=doc.documentElement.getElementsByTagName("script");
	for (s=0; s<scripts.length;s++) {
            var url = scripts[s].src;
            var i = url.indexOf(substring);
            if (i >= 0) {
                return url;
            }
	}

        var heads = doc.documentElement.getElementsByTagName("head");
        for (var h = 0; h < heads.length; h++) {
            var node = heads[h].firstChild;
            while (node != null) {
                if (node.nodeType == 1 && node.tagName.toLowerCase() == "script") {
                    var url = node.src;
                    var i = url.indexOf(substring);
                    if (i >= 0) {
                        return url;
                    }
                }
                node = node.nextSibling;
            }
        }
        return null;
    };

    /**
     * @deprecated
     */
    SimileAjax.includeJavascriptFile = function(doc, url, onerror, charset, callback) {
        SimileAjax.Debug.warn("Loading scripts is no longer a feature of SimileAjax. Use RequireJS instead.");
        return;

        onerror = onerror || "";
        if (doc.body == null) {
            try {
                var q = "'" + onerror.replace( /'/g, '&apos' ) + "'"; // "
                doc.write("<script src='" + url + "' onerror="+ q +
                          (charset ? " charset='"+ charset +"'" : "") +
                          " type='text/javascript'>"+ onerror + "</script>");
                return;
            } catch (e) {
                // fall through
            }
        }

	var calledBack = false;
	var callbackOnce = function() {
	    if (callback && !calledBack) {
		calledBack=true;
		callback();
	    }
	}
        var script = doc.createElement("script");
        if (onerror) {
            try { script.innerHTML = onerror; } catch(e) {};
            script.onerror = function () {onerror(); callbackOnce()};
        }
	else {
	    script.onerror = callbackOnce;
	}
        if (charset) {
            script.setAttribute("charset", charset);
        }
        script.type = "text/javascript";
        script.language = "JavaScript";
        script.src = url;
	if (callback) 
	    script.onload = script.onreadystatechange = function() {
		if (!this.readyState || this.readyState == "loaded" || 
		    this.readyState == "complete") 
		    callbackOnce();
	    }       
        return getHead(doc).appendChild(script);
    };

    /**
     * @deprecated Use RequireJS loading mechanisms instead.
     */
    var includeJavascriptList = function(doc, urlPrefix, filenames, included, index, callback) {
        if (!included[index]) { // avoid duplicate callback
            included[index] = true;
            if (index<filenames.length) { 
		var nextCall=function(){
		    includeJavascriptList(doc, urlPrefix, filenames, 
					  included, index+1, callback);
		}
                SimileAjax.
		includeJavascriptFile(doc, 
				      urlPrefix + filenames[index], null, null, 
				      nextCall);
	    }
            else if (callback != null) callback();
        }
    };
    
    /**
     * @deprecated Use RequireJS loading mechanisms instead.
     */
    SimileAjax.includeJavascriptFiles = function(doc, urlPrefix, filenames) {
        SimileAjax.Debug.warn("Loading scripts is no longer a feature of SimileAjax. Use RequireJS instead.");
        return;

	if (doc.body == null) {
            for (var i = 0; i < filenames.length; i++) {
                SimileAjax.includeJavascriptFile(doc, urlPrefix + filenames[i]);
            }
            SimileAjax.loadingScriptsCount += filenames.length;
            SimileAjax.includeJavascriptFile(doc, SimileAjax.urlPrefix + "scripts/signal.js?" + filenames.length);
        }
        else {
            var included = new Array();
            for (var i = 0; i < filenames.length; i++) 
		included[i] = false; 

            if (typeof window.SimileAjax_onLoad == "string") 
		f = eval(window.SimileAjax_onLoad);
            else if (typeof window.SimileAjax_onLoad == "function") 
		f = window.SimileAjax_onLoad;

            window.SimileAjax_onLoad = null;
            includeJavascriptList(doc, urlPrefix, filenames, included, 0, f);
        }
    };

    SimileAjax.includeCssFile = function(doc, url) {
        if (doc.body == null) {
            try {
                doc.write("<link rel='stylesheet' href='" + url + "' type='text/css'/>");
                return;
            } catch (e) {
                // fall through
            }
        }
        
        var link = doc.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", url);
        getHead(doc).appendChild(link);
    };
    SimileAjax.includeCssFiles = function(doc, urlPrefix, filenames) {
        for (var i = 0; i < filenames.length; i++) {
            SimileAjax.includeCssFile(doc, urlPrefix + filenames[i]);
        }
    };
    
    // @@@unnecessary, what to do with it?
    /**
     * Append into urls each string in suffixes after prefixing it with urlPrefix.
     * @param {Array} urls
     * @param {String} urlPrefix
     * @param {Array} suffixes
     */
    SimileAjax.prefixURLs = function(urls, urlPrefix, suffixes) {
        for (var i = 0; i < suffixes.length; i++) {
            urls.push(urlPrefix + suffixes[i]);
        }
    };

    /**
     * Parse out the query parameters from a URL
     * @param {String} url    the url to parse, or location.href if undefined
     * @param {Object} to     optional object to extend with the parameters
     * @param {Object} types  optional object mapping keys to value types
     *        (String, Number, Boolean or Array, String by default)
     * @return a key/value Object whose keys are the query parameter names
     * @type Object
     */
    SimileAjax.parseURLParameters = function(url, to, types) {
        to = to || {};
        types = types || {};
        
        if (typeof url == "undefined") {
            url = location.href;
        }
        var q = url.indexOf("?");
        if (q < 0) {
            return to;
        }
        url = (url+"#").slice(q+1, url.indexOf("#")); // toss the URL fragment
        
        var params = url.split("&"), param, parsed = {};
        var decode = window.decodeURIComponent || unescape;
        for (var i = 0; param = params[i]; i++) {
            var eq = param.indexOf("=");
            var name = decode(param.slice(0,eq));
            var old = parsed[name];
            var replacement = decode(param.slice(eq+1));
            
            if (typeof old == "undefined") {
                old = [];
            } else if (!(old instanceof Array)) {
                old = [old];
            }
            parsed[name] = old.concat(replacement);
        }
        for (var i in parsed) {
            if (!parsed.hasOwnProperty(i)) continue;
            var type = types[i] || String;
            var data = parsed[i];
            if (!(data instanceof Array)) {
                data = [data];
            }
            if (type === Boolean && data[0] == "false") {
                to[i] = false; // because Boolean("false") === true
            } else {
                to[i] = type.apply(this, data);
            }
        }
        return to;
    };
    
    SimileAjax.load = function() {
           var cssFiles = [
                "graphics.css"
            ];

            if (typeof SimileAjax_urlPrefix == "string") {
                SimileAjax.urlPrefix = SimileAjax_urlPrefix;
            } else {
                var url = SimileAjax.findScript(document, "simile-ajax-api.js");
                if (url == null) {
                    SimileAjax.error = new Error("Failed to derive URL prefix for Simile Ajax API code files");
                    return;
                }

                SimileAjax.urlPrefix = url.substr(0, url.indexOf("simile-ajax-api.js"));
            }

            SimileAjax.includeCssFiles(document, SimileAjax.urlPrefix + "styles/", cssFiles);
            
            SimileAjax.loaded = true;

        SimileAjax.History.initialize();
        SimileAjax.WindowManager.initialize();
    };

    return SimileAjax;
});
