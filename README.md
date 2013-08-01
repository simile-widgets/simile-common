SimileAjax
==========

SimileAjax is a [SIMILE](http://simile-widgets.org/) Javascript library used by [Timeline](https://github.com/zepheira/timeline/) and other frameworks.  It is relatively obsolete and has been written out of [Exhibit](https://github.com/zepheira/exhibit3/) entirely.  You should probably choose jQuery or other similar tools to meet your needs, this primarily exists as a compatibility shim until it can be replaced.

Mailing List and Forum
----------------------

Join the community by joining the [Google Group SIMILE Widgets](http://groups.google.com/group/simile-widgets/).
  
Licensing
---------

SimileAjax is open source software and is licensed under the modified BSD license located in the LICENSE.txt file located in the same directory as this README.

This code contains libraries found in `src/webapp/api/lib/` that are covered by their own licenses.

 * [JSON2](http://www.json.org/) is covered by [The JSON License](http://www.json.org/license.html).
 * [RequireJS](http://requirejs.org/) is covered by the [modified BSD license](https://github.com/jrburke/requirejs/blob/master/LICENSE).
 * [almond](https://github.com/jrburke/almond) is covered by the [modified BSD license](https://github.com/jrburke/almond/blob/master/LICENSE).

This code contains libraries found in `lib/` and `optimize/` that support development that are covered by their own licenses.

 * [Jetty](http://jetty.codehaus.org/) is covered by the [Apache 2.0 License](http://jetty.codehaus.org/jetty/license.html)
 * [r.js](http://requirejs.org/docs/optimization.html) is covered by the [modified BSD license](https://github.com/jrburke/r.js/blob/master/LICENSE).

Bundling
--------

You will need `ant` and `node` in order to build the SimileAjax bundles.  Use `ant bundle-all` to build both the RequireJS-dependent and non-RequireJS dependent bundles.  Use the non-RequireJS output, found in `build/simile-ajax-bundle.js`, for compatibility with older code that isn't AMD-aware.  Use the RequireJS output, `build/simile-ajax-require-bundle.js`, for code that is AMD-aware.

Latest Release - 3.0.0
----------------------

Released August 1, 2013.

 * Forked source to https://github.com/zepheira/simile-ajax/
 * Swtiched from self-contained loading to RequireJS 2.1.2.  Do not use SimileAjax to load scrip files, those methods are now deprecated and will do nothing.
 * Removed jQuery, it was only included here to use SimileAjax as a namespace.  Use RequireJS to load it into a context instead.
 * Removed modification of native String class, use StringUtils instead.
 * Removed all files related to loading and original bundling / compression.
 * Added a ?require=(true|false) parameter option to elect whether to assume RequireJS or an AMD-aware library is present.  False implies bundling as there is no way to load separate files well without RequireJS.
 * Added a ?includeRequire=(true|false) parameter option to load RequireJS or assume someone else has - but checks if `require` is defined and loads it anyways when not found. includeRequire=true&require=false is a nonsense combination.
 * Minor bug fixes.
 * See https://github.com/zepheira/simile-ajax/compare/2.2.3...3.0.0 for all commits.

Credits
-------

This software was created by the SIMILE project and originally written by the SIMILE development team (in alphabetical order):

 * [David Huynh](http://davidhuynh.net)

Thanks for your interest.
