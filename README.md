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

 * [jQuery](http://jquery.com/) is covered by [The MIT License](http://jquery.org/license/).
 * [JSON2](http://www.json.org/) is covered by [The JSON License](http://www.json.org/license.html).
 * [RequireJS](http://requirejs.org/) and its i18n plugin are covered by the [modified BSD license](https://github.com/jrburke/requirejs/blob/master/LICENSE).
 * [almond](https://github.com/jrburke/almond) is covered by the [modified BSD license](https://github.com/jrburke/almond/blob/master/LICENSE).

This code contains libraries found in `lib/` and `optimize/` that support development that are covered by their own licenses.

 * [Jetty](http://jetty.codehaus.org/) is covered by the [Apache 2.0 License](http://jetty.codehaus.org/jetty/license.html)
 * [r.js](http://requirejs.org/docs/optimization.html) is covered by the [modified BSD license](https://github.com/jrburke/r.js/blob/master/LICENSE).

Bundling
--------

You will need `ant` and `node` in order to build the SimileAjax bundles.  Use `ant bundle-all` to build both the RequireJS-dependent and non-RequireJS dependent bundles.  Use the non-RequireJS output, found in `build/simile-ajax-bundle.js`, for compatibility with older code that isn't AMD-aware.  Use the RequireJS output, `build/simile-ajax-require-bundle.js`, for code that is AMD-aware.

Latest Release - 3.0.0
----------------------

Released March 8, 2013.

 * Forked source to https://github.com/zepheira/simile-ajax/
 * Upgraded to jQuery 1.8.2. 
 * Swtiched from self-contained loading to RequireJS 2.1.2.  Do not use SimileAjax to load files, those methods are now deprecated and will do nothing.
 * Removed modification of native String class, use StringUtils instead.
 * Removed all files related to loading and original bundling / compression.
 * Bundling and compression are not currently available in this release.
 * Parameters cannot be provided through RequireJS as they were before, no parameters will be respected or used in this release.
 * Minor bug fixes.
 * See https://github.com/zepheira/simile-ajax/compare/2.2.3...3.0.0 for all commits.

Credits
-------

This software was created by the SIMILE project and originally written by the SIMILE development team (in alphabetical order):

 * [David Huynh](http://davidhuynh.net)

Thanks for your interest.
