requirejs.config({
    "baseUrl": "http://api.simile-widgets.org/ajax/3.0.0/",
    "shim": {
        "./lib/jquery": {
            "exports": "jQuery"
        },
        "./lib/json2": {
            "exports": "JSON"
        }
    }
});
