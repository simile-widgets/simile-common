define(["../lib/jquery"], function($) {
    var SimileAjax = {
        loaded:                 false,
        loadingScriptsCount:    0,
        error:                  null,
        params:                 { bundle: "true" },
        version:                "2.2.1",
        jQuery:                 $,
        urlPrefix:              null
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
    
    return SimileAjax;
});
