// Include this file if developing locally.  Leave out of compression, etc.
requirejs.config({
    "baseUrl": "/ajax/api/",
    "shim": {
        "./lib/jquery": {
            "exports": "jQuery"
        },
        "./lib/json2": {
            "exports": "JSON"
        }
    }
});
