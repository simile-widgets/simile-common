/**
 * This file is for bootstrapping SIMILE projects that were originally
 * designed to be loaded using the <script src="[name]-api.js"> paradigm.
 * It is preferable now to instead use AMD-aware loading, for example,
 * using RequireJS:
 *  <script src="[name]/lib/require.js" data-main="main"></script>
 * especially if custom code is being used.  But the old paradigm is
 * prevalent enough to merit considerations.
 */

(function() {
    var findScript, parseURLParameters, includeScript, setup, init;
    init = {
        "fileName": "simile-ajax-api.js",
        "require": "lib/require.js",
        "main": "main",
        "bundle": "simile-ajax-bundle.js",
        "rbundle": "simile-ajax-require-bundle"
    };

    findScript = function(doc, substring) {
        var scripts, s, url, i, heads, h, node;
	    scripts = doc.documentElement.getElementsByTagName("script");
	    for (s = 0; s < scripts.length; s++) {
            url = scripts[s].src;
            i = url.indexOf(substring);
            if (i >= 0) {
                return url;
            }
	    }
        return null;
    };

    parseURLParameters = function(url, to, types) {
        var q, params, param, parsed, decode, i, eq, name, old, replacement, type, data;
        to = to || {};
        types = types || {};
        
        if (typeof url == "undefined") {
            url = location.href;
        }
        q = url.indexOf("?");
        if (q < 0) {
            return to;
        }
        url = (url+"#").slice(q+1, url.indexOf("#")); // toss the URL fragment
        
        params = url.split("&");
        parsed = {};
        decode = window.decodeURIComponent || unescape;
        for (i = 0; i < params.length; i++) {
            param = params[i];
            eq = param.indexOf("=");
            name = decode(param.slice(0, eq));
            old = parsed[name];
            replacement = decode(param.slice(eq + 1));
            
            if (typeof old === "undefined") {
                old = [];
            } else if (!(old instanceof Array)) {
                old = [old];
            }
            parsed[name] = old.concat(replacement);
        }

        for (i in parsed) {
            if (!parsed.hasOwnProperty(i)) continue;
            type = types[i] || String;
            data = parsed[i];
            if (!(data instanceof Array)) {
                data = [data];
            }
            if (type === Boolean && data[0] === "false") {
                to[i] = false; // because Boolean("false") === true
            } else {
                to[i] = type.apply(this, data);
            }
        }
        return to;
    };

    includeScript = function(doc, url, onerror, charset, onload) {
        var head, script;
        onerror = onerror || "";
        script = doc.createElement("script");
        if (onload) {
            script.onload = onload;
        }
        if (onerror) {
            try {
                script.innerHTML = onerror;
            } catch (e) {
            }
            script.onerror = onerror;
        }
        if (charset) {
            script.setAttribute("charset", charset);
        }
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", url);
        head = doc.documentElement.getElementsByTagName("head")[0];
        head.appendChild(script);
    };

    setup = function(config) {
        var prefix, u, params, defaults, types;
        if (typeof SimileAjax_urlPrefix === "string") {
            prefix = SimileAjax_urlPrefix;
        } else {
            u = findScript(document, config.fileName);
            if (u !== null) {
                prefix = u.substr(0, u.indexOf(config.fileName));
            }
        }

        if (typeof prefix === "undefined") {
            throw new Error("Failed to derive URL prefix for " + config.fileName);
            return;
        } else {
            defaults = {
                "require": false,
                "bundle": true
            };
            types = {
                "require": Boolean,
                "bundle": Boolean
            };
            params = parseURLParameters(u, defaults, types);
            if (params.require) {
                if (params.bundle) {
                    includeScript(
                        document,
                        prefix + config.require,
                        null,
                        null,
                        function() {
                            require.config({
                                "baseUrl": prefix
                            });
                            require([config.rbundle,
                                     config.main], function(A, SimileAjax) {
                                window.SimileAjax = SimileAjax;
                            });
                        }
                    );
                } else {
                    includeScript(
                        document,
                        prefix + config.require,
                        null,
                        null,
                        function() {
                            require.config({
                                "baseUrl": prefix
                            });
                            require([config.main], function(SimileAjax) {
                                window.SimileAjax = SimileAjax;
                            });
                        }
                    );
                }
            } else {
                // Always bundle if not using RequireJS; there is no way to
                // load all the individual files properly without RequireJS.
                includeScript(document, prefix + config.bundle);
            }
        }
    };

    setup(init);
}());
