/*==================================================
 *  Simile Ajax API
 *==================================================
 */

/*==================================================
 *  REMEMBER to update the Version!  Now found in scripts/base.js
 *==================================================
 */

define([
    "./lib/domReady",
    "./scripts/base",
    "./scripts/platform",
    "./scripts/debug",
    "./scripts/xmlhttp",
    "./scripts/dom",
    "./scripts/bubble",
    "./scripts/date-time",
    "./scripts/string",
    "./scripts/html",
    "./scripts/set",
    "./scripts/sorted-array",
    "./scripts/event-index",
    "./scripts/units",
    "./scripts/ajax",
    "./scripts/history",
    "./scripts/window-manager"
], function(domReady, SimileAjax, Platform, Debug, XmlHttp, DOM, Graphics, DateTime, StringUtils, HTML, Set, SortedArray, EventIndex, NativeDateUnit, ListenerQueue, SAHistory, WindowManager) { 
    SimileAjax.Platform = Platform;
    SimileAjax.Debug = Debug;
    SimileAjax.XmlHttp = XmlHttp;
    SimileAjax.DOM = DOM;
    SimileAjax.Graphics = Graphics;
    SimileAjax.DateTime = DateTime;
    SimileAjax.StringUtils = StringUtils;
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

    /**
     * @deprecated Use RequireJS loading mechanisms instead.
     */
    SimileAjax.includeJavascriptFile = function(doc, url, onerror, charset, callback) {
        SimileAjax.Debug.warn("Loading scripts is no longer a feature of SimileAjax. Use RequireJS instead.");
        return;
    };

    /**
     * @deprecated Use RequireJS loading mechanisms instead.
     */
    SimileAjax.includeJavascriptFiles = function(doc, urlPrefix, filenames) {
        SimileAjax.Debug.warn("Loading scripts is no longer a feature of SimileAjax. Use RequireJS instead.");
        return;
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

    SimileAjax.load = function() {
        var cssFiles = [
            "main.css"
        ];
        var bundledCssFile = "simile-ajax-bundle.css";

        if (typeof SimileAjax_urlPrefix == "string") {
            SimileAjax.urlPrefix = SimileAjax_urlPrefix;
        } else {
            var targets = ["simile-ajax-api.js", "simile-ajax-require-bundle.js"];
            for (var i = 0; i < targets.length; i++) {
                var target = targets[i];
                var url = SimileAjax.findScript(document, target);
                if (url != null) {
                    SimileAjax.urlPrefix = url.substr(0, url.indexOf(target));
                    break;
                }
            }

            if (url == null) {
                SimileAjax.error = new Error("Failed to derive URL prefix for Simile Ajax API code files");
                return;
            }

            params = SimileAjax.parseURLParameters(url, SimileAjax.params, SimileAjax.paramTypes);
        }

        if (params.bundle) {
            SimileAjax.includeCssFile(document, SimileAjax.urlPrefix + "styles/" + bundledCssFile);
        } else {
            SimileAjax.includeCssFiles(document, SimileAjax.urlPrefix + "styles/", cssFiles);
        }
        
        SimileAjax.loaded = true;

        SimileAjax.History.initialize();
        SimileAjax.WindowManager.initialize();
    };
    domReady(SimileAjax.load);

    return SimileAjax;
});
