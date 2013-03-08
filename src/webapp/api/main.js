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
