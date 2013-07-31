({
    "baseUrl": "../src/webapp/api/",
    "name": "lib/almond",
    "include": [ "simile-ajax-api" ],
    "wrap": {
        "startFile": "start.frag",
        "endFile": "end.frag"
    },
    "shim": {
        "./lib/json2": {
            "exports": "JSON"
        }
    },
    "out": "../build/simile-ajax-bundle.js"
})