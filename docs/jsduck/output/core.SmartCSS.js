Ext.data.JsonP.core_SmartCSS({"tagname":"class","name":"core.SmartCSS","autodetected":{},"files":[{"filename":"SmartCSS.js","href":"SmartCSS.html#core-SmartCSS"}],"params":[{"tagname":"params","type":"Object","name":"options","doc":"\n","properties":[{"tagname":"params","type":"Boolean","name":"prefixStyleName","default":"true","optional":true,"doc":"<p>Prefixes all style ids with the style name.\n       For example if you you set this to true the class names\n       generated will have the prefix the style name and then\n       the id.</p>\n","html_type":"Boolean"}],"html_type":"Object"}],"members":[{"name":"","tagname":"property","owner":"core.SmartCSS","id":"property-","meta":{}},{"name":"__classes","tagname":"property","owner":"core.SmartCSS","id":"property-__classes","meta":{"private":true}},{"name":"","tagname":"property","owner":"core.SmartCSS","id":"static-property-","meta":{"static":true}},{"name":"getClass","tagname":"method","owner":"core.SmartCSS","id":"method-getClass","meta":{}},{"name":"getClasses","tagname":"method","owner":"core.SmartCSS","id":"method-getClasses","meta":{}},{"name":"getClassesAsMap","tagname":"method","owner":"core.SmartCSS","id":"method-getClassesAsMap","meta":{}},{"name":"setClass","tagname":"method","owner":"core.SmartCSS","id":"method-setClass","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-core.SmartCSS","short_doc":"An utility class which can be used to save CSS styles\nand get their id. ...","component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/SmartCSS.html#core-SmartCSS' target='_blank'>SmartCSS.js</a></div></pre><div class='doc-contents'><p>An utility class which can be used to save CSS styles\nand get their id. Use an instance per module.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>options</span> : Object<div class='sub-desc'>\n<ul><li><span class='pre'>prefixStyleName</span> : Boolean (optional)<div class='sub-desc'><p>Prefixes all style ids with the style name.\n       For example if you you set this to true the class names\n       generated will have the prefix the style name and then\n       the id.</p>\n<p>Defaults to: <code>true</code></p></div></li></ul></div></li></ul></div><div class='members'><div class='members-section'><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Instance properties</h3><div id='property-' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='core.SmartCSS'>core.SmartCSS</span><br/><a href='source/SmartCSS.html#core-SmartCSS-property-' target='_blank' class='view-source'>view source</a></div><a href='#!/api/core.SmartCSS-property-' class='name expandable'></a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'><p>After you add the styles call this function to apply the styles.</p>\n</div><div class='long'><p>After you add the styles call this function to apply the styles.</p>\n</div></div></div><div id='property-__classes' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='core.SmartCSS'>core.SmartCSS</span><br/><a href='source/SmartCSS.html#core-SmartCSS-property-__classes' target='_blank' class='view-source'>view source</a></div><a href='#!/api/core.SmartCSS-property-__classes' class='name expandable'>__classes</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>The key is the styleName and the value is an object like this:\n{className: 'String', style: {color: 'red'}} ...</div><div class='long'><p>The key is the styleName and the value is an object like this:\n<code>{className: 'String', style: {color: 'red'}}</code></p>\n<p>Defaults to: <code>{}</code></p></div></div></div></div><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Static properties</h3><div id='static-property-' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='core.SmartCSS'>core.SmartCSS</span><br/><a href='source/SmartCSS.html#core-SmartCSS-static-property-' target='_blank' class='view-source'>view source</a></div><a href='#!/api/core.SmartCSS-static-property-' class='name expandable'></a> : Object<span class=\"signature\"><span class='static' >static</span></span></div><div class='description'><div class='short'><p>Returns the global default options.</p>\n</div><div class='long'><p>Returns the global default options.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-getClass' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='core.SmartCSS'>core.SmartCSS</span><br/><a href='source/SmartCSS.html#core-SmartCSS-method-getClass' target='_blank' class='view-source'>view source</a></div><a href='#!/api/core.SmartCSS-method-getClass' class='name expandable'>getClass</a>( <span class='pre'>styleName</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Gets the style id of a style name. ...</div><div class='long'><p>Gets the style id of a style name.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>styleName</span> : String<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>The class id. This is the real class that is attached to the DOM.</p>\n</div></li></ul></div></div></div><div id='method-getClasses' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='core.SmartCSS'>core.SmartCSS</span><br/><a href='source/SmartCSS.html#core-SmartCSS-method-getClasses' target='_blank' class='view-source'>view source</a></div><a href='#!/api/core.SmartCSS-method-getClasses' class='name expandable'>getClasses</a>( <span class='pre'>styleNames, [asArray]</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns multiple classes. ...</div><div class='long'><p>Returns multiple classes.\nExample:</p>\n\n<pre><code>css.getClasses({\n    a: true,\n    b: false,\n    c: true,\n});\n// Will return a string with the class for `a` and `b` only.\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>styleNames</span> : Object<div class='sub-desc'><p>Example {returnThisClass: true, dontReturnThisClass: false}</p>\n</div></li><li><span class='pre'>asArray</span> : Boolean (optional)<div class='sub-desc'><p>If true returns an array, if not returns a string.</p>\n<p>Defaults to: <code>true</code></p></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'><p>The classes' ids. These are the real classes that are attached to the DOM.</p>\n</div></li></ul></div></div></div><div id='method-getClassesAsMap' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='core.SmartCSS'>core.SmartCSS</span><br/><a href='source/SmartCSS.html#core-SmartCSS-method-getClassesAsMap' target='_blank' class='view-source'>view source</a></div><a href='#!/api/core.SmartCSS-method-getClassesAsMap' class='name expandable'>getClassesAsMap</a>( <span class='pre'></span> ) : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Returns an object where the key is the friendly class name\nand the value is an object with 2 keys: className and style. ...</div><div class='long'><p>Returns an object where the key is the friendly class name\nand the value is an object with 2 keys: className and style.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-setClass' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='core.SmartCSS'>core.SmartCSS</span><br/><a href='source/SmartCSS.html#core-SmartCSS-method-setClass' target='_blank' class='view-source'>view source</a></div><a href='#!/api/core.SmartCSS-method-setClass' class='name expandable'>setClass</a>( <span class='pre'>name, def, options</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Defines a style. ...</div><div class='long'><p>Defines a style.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : String<div class='sub-desc'><p>The style name, then you can get the style id with <code>getClass</code> or <code>getClasses</code>.</p>\n</div></li><li><span class='pre'>def</span> : Object<div class='sub-desc'><p>The style definition <code>{color: 'red'}</code> as javascript object.</p>\n</div></li><li><span class='pre'>options</span> : Object<div class='sub-desc'>\n<ul><li><span class='pre'>prefix</span> : String<div class='sub-desc'>\n</div></li><li><span class='pre'>postfix</span> : String<div class='sub-desc'>\n</div></li><li><span class='pre'>styleId</span> : String<div class='sub-desc'>\n</div></li></ul></div></li></ul></div></div></div></div></div></div></div>","meta":{}});