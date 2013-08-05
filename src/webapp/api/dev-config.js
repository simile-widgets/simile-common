/**
 *
 * This is an example for what you should include in your own SimileAjax
 * development, it pulls in files individually for debugging purposes.
 * Assumes you've mounted /ajax on a server.
 *
 * Surround your own code with this fragment, subtituting the path
 * accordingly.
 *
 * require(["path/to/this/file-without-js-ending"], function() {
 *     require(["simile-ajax"], function(SimileAjax) {
 *         window.SimileAjax = SimileAjax;
 *         // Your SimileAjax-using code here.
 *     });
 * });
 *
 */

requirejs.config({
    "baseUrl": "/ajax/api/",
    "config": {
        "simile-ajax": {
            "bundle": false,
            "prefix": "/ajax/api/"
        }
    }
});
