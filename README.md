SimileAjax
==========

SimileAjax is a [SIMILE](http://simile-widgets.org/) Javascript library used by [Timeline](https://github.com/zepheira/timeline/) and other frameworks.  It is relatively obsolete and has been written out of [Exhibit](https://github.com/zepheira/exhibit3/) entirely.  You should probably choose jQuery or other similar tools to meet your needs, this primarily exists as a compatibility shim until it can be replaced.
  
Mailing List and Forum
----------------------

Join the community by joining the [Google Group SIMILE Widgets](http://groups.google.com/group/simile-widgets/).
  
Licensing
---------

SimileAjax is open source software and is licensed under the modified BSD license located in the LICENSE.txt file located in the same directory as this README.

Latest Release - 3.0.0
----------------------

Released March 8, 2013.

 * Forked source to https://github.com/zepheira/simile-ajax/
 * Upgraded to jQuery 1.8.2. 
 * Swtiched from self-contained loading to RequireJS 2.1.2.  Do not use SimileAjax to load files, those methods are now deprecated and will do nothing.
 * Removed modification of native String class, use StringUtils instead.
 * Removed all files related to loading and original compression.
 * Minor bug fixes.
 * See https://github.com/zepheira/simile-ajax/compare/2.2.3...3.0.0 for all commits.

Credits
-------

This software was created by the SIMILE project and originally written by the SIMILE development team (in alphabetical order):

 * [David Huynh](http://davidhuynh.net)

Thanks for your interest.
