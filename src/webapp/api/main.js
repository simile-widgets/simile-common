// Example development configuration for loading SimileAjax
requirejs.config({
    "baseUrl": "http://localhost/~ryanlee/dev/simile-ajax/scripts/",
    "urlArgs": "bust=" + (new Date()).getTime(),
    "paths": {
        "lib": "../lib"
    },
    "shim": {
        "lib/jquery": {
            "exports": "jQuery"
        },
        "lib/json2": {
            "exports": "JSON"
        }
    }
});

requirejs(
    ["require", "../simile-ajax-api"],
    function(require, SimileAjax) {
        if (typeof window.JSON === "undefined" || window.JSON === null) {
            window.JSON = require("lib/json2");
        }
        SimileAjax.load();
        // part of the point of SimileAjax is being available everywhere
        window.SimileAjax = SimileAjax;
    }
);
