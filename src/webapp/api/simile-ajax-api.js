/**
 * This file is for bootstrapping SIMILE projects that were originally
 * designed to be loaded using the <script src="[name]-api.js"> paradigm.
 * It is preferable now to instead use AMD-aware loading, for example,
 * using RequireJS:
 *  <script src="[name]/lib/require.js" data-main="main"></script>
 * especially if custom code is being used.  Bundling is now the only
 * option for delivery; files cannot be loaded separately.
 */

(function() {
    var findScript, includeScript, setup, init;
    init = {
        "fileName": "simile-ajax-api.js",
        "bundle": "simile-ajax-bundle.js",
        "prefix": undefined
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

    includeScript = function(doc, url) {
        var head, script;
        script = doc.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", url);
        head = doc.documentElement.getElementsByTagName("head")[0];
        head.appendChild(script);
    };

    setup = function(config) {
        var prefix, u, params, defaults, types, loader;
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
            config.prefix = prefix;
            includeScript(document, prefix + config.bundle);
        }
    };

    setup(init);
}());
