var _                   = require('lodash');
var tinycolor           = require('tinycolor2');
var mediaQueryValidator = require('valid-media-queries');





/**
 * @class core.SmartCSS
 * An utility class which can be used to save CSS styles
 * and get their id. Use an instance per module.
 * @param {Object} options
 * @param {Boolean} [options.prefixStyleName=true]
 *        Prefixes all style ids with the style name.
 *        For example if you you set this to true the class names
 *        generated will have the prefix the style name and then
 *        the id.
 */
var SmartCSS = function(options){
    options = _.extend({
        prefixStyleName : true,
    }, SmartCSS.getDefaultOptions, options);

    this.__prefixStyleName = options.prefixStyleName;

    /**
     * The key is the styleName and the value is an object like this:
     * `{className: 'String', style: {color: 'red'}}`
     * @type {Object}
     * @private
     */
    this.__classes = {};
}




SmartCSS.__data = {
    styles : {},
    id     : 0,
};





/**
 * Sets the global default options. You should really don't change
 * this.
 * @static
 */
SmartCSS.setDefaultOptions = function(options){
    SmartCSS.__defaultOptions = options;
}



/**
 * Returns the global default options.
 * @static
 */
SmartCSS.getDefaultOptions = function(){
    return SmartCSS.__defaultOptions;
}



/**
 * After you add the styles call this function to apply the styles.
 */
SmartCSS.injectStyles = function(){
    RCSS.injectAll();
}



SmartCSS.deleteStyles = function(){
    SmartCSS.__data.styles = {};
}



/**
 * After you add the styles call this function to get the styles as string.
 */
SmartCSS.getStylesString = function(){
    return RCSS.getStylesString();
}

SmartCSS.getStylesString = function(){
    var registry = SmartCSS.__data.styles;
    var str = '';
    for (var key in registry) {
        if (!registry.hasOwnProperty(key)) {
            continue;
        }
        str += rulesToString(
            registry[key].className,
            registry[key].style
        );
    }
    return str;
}

var rulesToString = function rulesToString(className, styleObj) {
    var markup             = '';
    var pseudos            = '';
    var mediaQueries = '';

    for (var key in styleObj) {
        if (!styleObj.hasOwnProperty(key)) {
            continue;
        }
        // Skipping the special pseudo-selectors and media queries.
        if (key[0] === ':') {
            pseudos += '.' + className + key + '{' +
                _rulesToStringHeadless(styleObj[key]) + '}';
        } else if (key.substring(0, 6) === '@media') {
            if (!mediaQueryValidator(key)) {
                console.log('%s is not a valid media query.', key);
                continue;
            }
            mediaQueries += key + '{' + rulesToString(className, styleObj[key]) + '}';
        } else {
            markup += ruleToString(key, styleObj[key]);
        }
    }

    if (markup !== '') {
        markup = '.' + className + '{' + markup + '}';
    }

    return markup + pseudos + mediaQueries;
}

function _rulesToStringHeadless(styleObj) {
    var markup = '';

    for (var key in styleObj) {
        if (!styleObj.hasOwnProperty(key)) {
            continue;
        }

        if (key[0] === ':' || key.substring(0, 6) === '@media') {
            continue;
        }
        markup += ruleToString(key, styleObj[key]);
    }
    return markup;
}
function ruleToString(propName, value) {
    var cssPropName = hyphenateProp(propName);
    if(value instanceof tinycolor) value = value.toHslString();
    return cssPropName + ':' + escapeValueForProp(value, cssPropName) + ';';
}
var _uppercasePattern = /([A-Z])/g;
var msPattern = /^ms-/;
function hyphenateProp(string) {
    // MozTransition -> -moz-transition
    // msTransition -> -ms-transition. Notice the lower case m
    // http://modernizr.com/docs/#prefixed
    // thanks a lot IE
    return string.replace(_uppercasePattern, '-$1')
        .toLowerCase()
        .replace(msPattern, '-ms-');
}
function escapeValueForProp(value, prop) {
    // 'content' is a special property that must be quoted
    if (prop === 'content') {
        return '"' + value + '"';
    }

    return escape(value);
}


SmartCSS.registerClass = function(styleObj, options){
    options = _.extend({
        prefix  : void 0,
        postfix : void 0,
        styleId : void 0
    }, options);
    var styleId;
    if(options.styleId === void 0){
        styleId = SmartCSS.__data.id;
        // Add a "c" if no prefix supplied.
        if(options.prefix !== void 0){
            styleId = options.prefix + styleId;
        }else{
            // Add a character because a style can't start with a number.
            styleId = 'c' + styleId;
        }
        if(options.postfix !== void 0){
            styleId = styleId + options.postfix;
        }
        SmartCSS.__data.id++;
    }else{
        styleId = options.styleId;
    }
    var styleDef = {
        className : styleId,
        style     : styleObj
    }
    SmartCSS.__data.styles[styleId] = styleDef;
    return styleDef;
}





_.extend(SmartCSS.prototype, {



    /**
     * Gets the style id of a style name.
     * @param  {String} styleName
     * @return {String} The class id. This is the real class that is attached to the DOM.
     */
    getClass: function(styleName){
        // Warn if class is missing and return '' by default.
        if(this.__classes[styleName] === void 0){
            console.warn('Class "' + styleName + '" not set.');
            return '';
        }
        return this.__classes[styleName].className;
    },



    /**
     * Returns multiple classes.
     * Example:
     *
     *     css.getClasses({
     *         a: true,
     *         b: false,
     *         c: true,
     *     });
     *     // Will return a string with the class for `a` and `b` only.
     * @param {Object} styleNames Example {returnThisClass: true, dontReturnThisClass: false}
     * @param {Boolean} [asArray=true] If true returns an array, if not returns a string.
     * @return {String} The classes' ids. These are the real classes that are attached to the DOM.
     */
    getClasses: function(styleNames, asArray){
        var classesAsArray = [];
        _.forEach(styleNames, function(include, styleName){
            if(include){
                classesAsArray.push(this.getClass(styleName));
            }
        }.bind(this))
        if(asArray){
            return classesAsArray;
        }else{
            return classesAsArray.join(' ');
        }
    },



    /**
     * Returns an object where the key is the friendly class name
     * and the value is an object with 2 keys: className and style.
     * @return {Object}
     */
    getClassesAsMap: function(){
        return _.clone(this.__classes);
    },



    /**
     * Defines a style.
     * @param {String} name The style name, then you can get the style id with `getClass` or `getClasses`.
     * @param {Object} def The style definition `{color: 'red'}` as javascript object.
     * @param {Object} options
     * @param {String} options.prefix
     * @param {String} options.postfix
     * @param {String} options.styleId
     */
    setClass: function(styleName, def, options){
        options = options || {};
        if(options.styleId === void 0){
            if(this.__prefixStyleName){
                var addPrefix = styleName + '-';
                if(options.prefix === void 0){
                    options.prefix = '';
                }
                options.prefix = addPrefix + options.prefix;
            }
        }
        this.__classes[styleName] = SmartCSS.registerClass(def, options);
        return this.__classes[styleName];
    }


})





module.exports = SmartCSS;
