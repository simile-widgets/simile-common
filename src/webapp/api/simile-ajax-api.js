/*==================================================
 *  Simile Ajax API
 *==================================================
 */

/*==================================================
 *  REMEMBER to update the Version!  Now found in scripts/base.js
 *==================================================
 */

define([
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
], function(SimileAjax, Platform, Debug, XmlHttp, DOM, Graphics, DateTime, StringUtils, HTML, Set, SortedArray, EventIndex, NativeDateUnit, ListenerQueue, SAHistory, WindowManager) { 
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
