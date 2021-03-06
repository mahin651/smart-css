var _          = require('lodash');
var tinycolor  = require('tinycolor2');
var StyleClass = require('./StyleClass');
var Slick      = require('slick');
var utils      = require('../utils');





/**
 * @class core.SmartCSS
 * This is the main class you will be using in smart-css.
 * When you do `require('smart-css')` you will get this class. (Remember you need to instance it.)
 *
 *
 * Definitions:
 *
 *  - **Class id:** is the name in smart-css, normally is semantic and needs context; A class
 *                  id only matters if has a SmartCSS instance associated. Alone means nothing.
 *  - **Class name:** is the real css class, normally is ugly and short; Doesn't include the pseudo
 *                    part or the dot prefix.
 *
 * @param {Object} options
 * @param {String|undefined} [options.name=undefined]
 *        Provides a name for this context. If you enable debug you will see this
 *        `options.name` in your generated class names.
 * @param {Boolean} [options.debug=true]
 *        Prefixes all style ids with the style name.
 *        For example if you you set this to true the class names
 *        generated will have the prefix the style name and then
 *        the id.
 */
var SmartCSS = function(options){
    options = _.extend({
        name  : undefined,
        debug : true,
    }, options);

    /**
     * The name of this SmartCSS instance. If #__debug is set to true then it will render this name
     * in the class names.
     * @private
     * @type {String|undefined}
     */
    this.__name = options.name;

    /**
     * If the parameter is set to debug then you will get longer and more descriptive class names.
     * @private
     * @type {Boolean}
     */
    this.__debug = options.debug;

    /**
     * Contains all the SmartCSS instances that are a child to this SmartCSS instance.
     * @private
     * @type {Array}
     */
    this.__childContexts = [];

    /**
     * An array of StyleClass instances.
     * @type {StyleClass[]}
     * @private
     */
    this.__styleClasses = [];

    /**
     * The key is the styleName + @media query and the value is an instance of StyleClass.
     * @type {Object}
     * @private
     */
    this.__styleClassesByUID = [];

    /**
     * The key is classId and maps to a className.
     * @type {Object}
     * @private
     */
    this.__classNameMap = {};

    SmartCSS.__registerContext(this);
}



/**
 * @property {Object} __data Contains static information about SmartCSS classes.
 * @private
 * @type {Object}
 */
SmartCSS.__data = {
    styles   : {},
    contexts : [],
    index    : 0,
};



/**
 * @method __registerContext
 * Register a context.
 * @static
 * @private
 * @param  {core.SmartCSS} context
 */
SmartCSS.__registerContext = function(context){
    SmartCSS.__data.contexts.push(context);
}



// Not yet used. In the future we can use this to make shorter ids.
// var alphabet = "abcdefghijklmnopqrstuvwxyz";
// alphabet = (alphabet + alphabet.toUpperCase()).split('');
/**
 * @method __getNextId
 * Gets a new id. Is a singleton therefore it will always be different.
 * @private
 * @static
 * @return {String}
 */
SmartCSS.__getNextId = function(){
    return SmartCSS.__data.index++;
}



/**
 * @method injectStyles
 * After you add the styles call this function to inject the styles into your DOM.
 * @static
 */
SmartCSS.injectStyles = function(){
    var tag = document.createElement('style');
    tag.innerHTML = SmartCSS.getStylesAsString();
    document.getElementsByTagName('head')[0].appendChild(tag);
}



/**
 * @method deleteStyles
 * Deletes all the cached styles. This will not affect the current applied styles.
 * Only affects future calls to #injectStyles or #getStylesAsString.
 * @static
 */
SmartCSS.deleteStyles = function(){
    SmartCSS.__data.styles = {};
    SmartCSS.__data.contexts = [];
}



/**
 * @method getStylesAsString
 * After you add the styles call this function to get the styles as string.
 * @static
 */
SmartCSS.getStylesAsString = function(){
    var contexts = SmartCSS.__data.contexts;
    var str = [];
    contexts.forEach(function(context){
        str.push(context.getStylesAsString());
    })
    return str.join('');
}





_.extend(SmartCSS.prototype, {



    /**
     * Returns the class name (the one that will be really added to the css).
     * Don't add any pseudo things. For example if you set a class like this:
     *
     *     setClass('myClass:hover', ...);
     *
     * In order to get the className you do:
     *
     *     getClass('myClass');
     *
     * And not
     *
     *     getClass('myClass:hover');
     *
     * @param  {String} styleName
     * @return {String} The class id. This is the real class that is attached to the DOM.
     */
    getClass: function(classId){
        // Warn if class is missing and return '' by default.
        if(this.__classNameMap[classId] === undefined){
            console.warn('Class "' + classId + '" not set.');
            return '';
        }
        return this.__classNameMap[classId];
    },



    /**
     * Returns a copy of #__classNameMap, look at it for more info.
     * The key is the class id and the value is the class name.
     * @return {Object}
     */
    getClassNameMap: function(){
        return _.clone(this.__classNameMap);
    },



    /**
     * @return {Array} An array with all the style classes added.
     */
    getStyleClasses: function(){
        return this.__styleClasses.slice(0);
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
     * Checks whenever the selector object is a valid one
     * for this library.
     * @private
     * @param  {Object} selectorObject
     */
    __validateSelectorObject: function(selectorObject){
        // Should only have one selector. Filters out: ".a, .b";
        if(selectorObject.length > 1){
            throw new Error('Doesn\'t accept multiple definitions at once.');
        }
        // Should only have only 1 class per segment. Filters out: ".a.b";
        _.forEach(selectorObject[0], function(segment){
            if(segment.classList.length > 1) throw new Error('Doesn\'t accept multiple classes at once.')
        })

        // We only care about the first one.
        selectorObject = selectorObject[0];

        // Checks whenever ancestors are defined.
        _.forEach(selectorObject, function(segment, i){
            // The last one obviously is not yet added to the set, therefore
            // no need to test it.
            var last = selectorObject.length - 1 === i;
            if(last) return;
            if(this.getClass(segment.classList[0]) === ''){
                throw new Error('Ancestor not defined.')
            }
        }.bind(this))
    },



    /**
     * Defines a style.
     * @param {String} name The style name, then you can get the style id with `getClass` or `getClasses`.
     * @param {Object} def The style definition `{color: 'red'}` as javascript object.
     * @param {Object} options
     * @param {String} options.className A class name to overwrite the generated one.
     * @param {String} options.media Media query.
     */
    setClass: function(selector, styleDef, options){
        options = options || {};
        var UID = StyleClass.createUID(selector, options.media);
        if(this.__styleClassesByUID[UID]){
            throw new Error('Class id already exists for this selector and media');
        }
        // Converts the selector string to a JavaScript object so its easier to
        // understand what the user defines.
        var selectorObject = Slick.parse(selector);
        this.__validateSelectorObject(selectorObject);
        selectorObject = selectorObject[0];
        var classId = _.last(selectorObject).classList[0];

        options = _.extend({
            className : undefined,
            classId   : classId,
        }, options)

        if(options.className !== undefined && this.getClass(classId) !== ''){
            throw new Error('Can\'t use hardcoded class name because already exists one for the same class id');
        }

        var className = options.className;
        if(options.className === undefined){
            className = '';
            // If a class with the same classId has been defined then reuse
            // its className so :hover and other pseudo things works correctly.
            if(this.__classNameMap[classId]){
                className = this.__classNameMap[classId];
            }else{
                if(this.__debug){
                    className += classId;
                    if(this.__name){
                        className = this.__name + '-' + className
                    }
                }else{
                    className = '_' + className;
                }
                className += SmartCSS.__getNextId();
            }
        }
        if(!utils.isValidClassName(className)){
            throw new Error('Invalid class name');
        }
        options.className = className;

        var styleClass = new StyleClass({
            className      : options.className,
            selectorString : selector,
            selectorObject : selectorObject,
            styleDef       : styleDef,
            media          : options.media,
        })
        this.__classNameMap[classId] = className;
        this.__styleClassesByUID[styleClass.getUID()] = styleClass;
        this.__styleClasses.push(styleClass);
        return this.__styleClasses[selector];
    },



    /**
     * @return {String} All styles added as string.
     */
    getStylesAsString: function(){
        var str = [];
        var classNamesAsMap = this.getClassNameMap();
        this.getStyleClasses().forEach(function(styleClass){
            str.push(utils.renderStyleClass(styleClass, classNamesAsMap));
        });
        this.__childContexts.forEach(function(context){
            str.push(context.getStylesAsString());
        })
        return str.join('');
    },



    /**
     * Adds a new context. This is useful if you don't want to use the
     * singleton.
     * @param {core.SmartCSS} smartCSS
     */
    addChildContext: function(smartCSS){
        if(_.includes(this.__childContexts, smartCSS)) throw new Error('The same child context already exists')
        this.__childContexts.push(smartCSS);
    }



})





module.exports = SmartCSS;
