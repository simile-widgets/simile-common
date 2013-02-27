define(["lib/jquery"], function($) {
    var SimileAjax = {
        loaded:                 false,
        loadingScriptsCount:    0,
        error:                  null,
        params:                 { bundle:"true" },
        version:                "2.2.1",
        jQuery:                 $,
        urlPrefix:              null
    };

    return SimileAjax;
});
