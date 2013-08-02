({
    "baseUrl": "../src/webapp/api/",
    "name": "lib/almond",
    "include": [ "simile-ajax" ],
    "wrap": {
        "startFile": "start.frag",
        "endFile": "end.frag"
    },
    "shim": {
        "lib/json2": {
            "exports": "JSON"
        }
    },
    "deps": ["lib/json2"],
    "out": "../build/simile-ajax-api.js"
})