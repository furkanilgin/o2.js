/*global o2 */

/**
 * @module collectionhelper
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A utility <strong>class</strong> to modify collections.</p>
 */
( function(framework, window, UNDEFINED) {
   
   /*
    * Aliases.
    */
    var me = framework;

    /*
     * Module configuration.
     */
    var config = {
        constants : {
            
            /*
             * 
             */
            ecmaScriptType : {
                ARRAY : 'Array'
            }
            
        }
    };

    /*
     *
     */
    function is(obj, type) {

        var objectNameStartIndex = 8;
        var trimLastBraceIndex = -1;
        var klass = Object.prototype.toString.call(obj).slice(objectNameStartIndex, trimLastBraceIndex);

        return obj !== UNDEFINED && obj !== null && klass === type;

    }

    /*
     *
     */
    function isArray(obj) {

        return is(obj, config.constants.ecmaScriptType.ARRAY);

    }

    /**
     * @class {static} CollectionHelper
     *
     * <p>A <strong>class</strong> to modify collections.</p>
     */
    me.CollectionHelper = {

        /**
         * @function {static} CollectionHelper.merge
         *
         * <p>Merges two objects.</p>
         *
         * @param {Object} toObj - the <code>Object</code> to copy values to.
         * @param {Object} fromObj - the <code>Object</code> to copy values from.
         * @param {Boolean} isRecursive - (Optional, defaults to
         * <code>false</code>) true
         * if the merge is nested into child objects as well.
         * @return a <strong>reference</strong> to the modified
         * <code>toObj</code>.
         */
        merge : function(toObj, fromObj, isRecursive) {

            var shouldRecurse = !!isRecursive;

            var value = null;

            var merge = me.CollectionHelper.merge;

            for(var key in fromObj) {
                if(fromObj.hasOwnProperty(key)) {
                    value = fromObj[key];

                    if(shouldRecurse && typeof value == 'object') {
                        if( typeof toObj[key] != 'object') {
                            toObj[key] = {};
                        }

                        merge(toObj[key], fromObj[key], shouldRecurse);

                        continue;
                    }

                    toObj[key] = fromObj[key];
                }
            }

            return toObj;

        },

        /**
         * @function {static} CollectionHelper.indexOf
         *
         * <p>Gets the index of the element in the given <code>Array</code>.</p>
         *
         * @param {Array} ar - the <code>Array</code> to search.
         * @param {Object} elm - the <code>Object</code> to match.
         * @return the index of the element if found, <code>-1</code> otherwise.
         */
        indexOf : function(ar, elm) {

            if(Array.prototype.indexOf) {
                me.CollectionHelper.indexOf = function(ar, elm) {

                    if(!ar) {

                        return -1;
                    }

                    if(!isArray(ar)) {

                        return -1;
                    }

                    return ar.indexOf(elm);

                };

                return me.CollectionHelper.indexOf(ar, elm);
            }

            me.CollectionHelper.indexOf = function(ar, elm) {

                if(!ar) {

                    return -1;
                }

                if(!isArray(ar)) {

                    return -1;
                }

                for(var i = 0, len = ar.length; i < len; i++) {
                    if(elm == ar[i]) {

                        return i;
                    }
                }

                return -1;

            };

            return me.CollectionHelper.indexOf(ar, elm);

        },

        /**
         * @function {static} CollectionHelper.contains
         *
         * <p>An <strong>alias</strong> to <code>CollectionHelper.indexOf(ar,
         * elm)
         * &gt;
         * -1</code>.</p>
         *
         * @param {Array} ar - the <code>Array</code> to search.
         * @param {Object} elm - the <code>Object</code> to match.
         * @return <code>true</code> if the <code>Array</code> contains the item,
         * <code>false</code> otherwise.
         */
        contains : function(ar, elm) {

            return me.CollectionHelper.indexOf(ar, elm) > -1;

        },

        /**
         * @function {static} CollectionHelper.copy
         *
         * <p>Creates a clone of the given <code>Object</code>, and returns it;
         * leaving
         * the original intact.</p>
         *
         * @param {Object} ar - the object to clone.
         * @param {Boolean} isDeepCopy - (Optional; defaults to
         * <code>false</code>) - if
         * <code>true</code> and the object contains other <code>Object</code>s,
         * these
         * <code>Object</code>s will be cloned as well; non-primitive values will
         * not be
         * copied otherwise.
         * @return the copied <code>Object</code>.
         */
        copy : function(ar, isDeepCopy) {

            var shouldDeepCopy = !!isDeepCopy;

            var theCopy = isArray(ar) ? [] : {};

            var value = null;

            for(var key in ar) {
                if(ar.hasOwnProperty(key)) {
                    value = ar[key];

                    if(shouldDeepCopy && ( typeof value == 'object')) {
                        theCopy[key] = me.CollectionHelper.copy(value, shouldDeepCopy);

                        continue;
                    }

                    theCopy[key] = value;
                }
            }

            return theCopy;

        },

        /**
         * @function {static} CollectionHelper.clear
         *
         * <p>Removes all the elements of the <code>Object</code>.</p>
         *
         * @param {Object} ar - the <code>Object</code> to clear.
         * @return a <strong>reference</strong> to the object itself.
         */
        clear : function(ar) {

            if(!ar) {

                return null;
            }

            if(isArray(ar)) {
                ar.length = 0;

                return ar;
            }

            for(var key in ar) {
                if(ar.hasOwnProperty(key)) {
       
                    //
                    delete ar[key];
                }
            }

            return ar;

        },

        removeElementByValue : function(collection, name, value) {

            var item = null;

            if(isArray(collection)) {
                for(var i = 0, len = collection.length; i < len; i++) {
                    item = collection[i];

                    if(item[name] != value) {

                        continue;
                    }

                    collection.splice(i, 1);
                    i--;
                    len = collection.length;
                }

                return;
            }

            for(var key in collection) {
                if(collection.hasOwnProperty(key)) {
                    item = collection[key];

                    if(item[name] != value) {

                        continue;
                    }
                    
                    //
                    delete collection[key];
                }
            }

        },

        /**
         * @function CollectionHelper.getFirst
         *
         * <p>Gets the first element of the array.</p>
         *
         * @param {Object} ar - the <code>Object</code> to inspect.
         * @return the first element if exists, <code>null</code> otherwise.
         */
        getFirst : function(ar) {

            if(!ar) {

                return null;
            }

            if(!isArray(ar)) {

                return null;
            }

            return ar[0];

        },

        /**
         * @function CollectionHelper.getLast
         *
         * <p>Gets the last element of the array.</p>
         *
         * @param {Object} ar - the <code>Object</code> to inspect.
         * @return the last element if exists, <code>null</code> otherwise.
         */
        getLast : function(ar) {

            if(!ar) {

                return null;
            }

            if(!isArray(ar)) {

                return null;
            }

            return ar[ar.length - 1];

        },

        /**
         * @function {static} CollectionHelper.compact
         *
         * <p>Remove <code>null</code>, and <code>undefined</code> members from
         * the
         * <code>Object</code>.
         * This function alters the actual <code>Object</code>.</p>
         *
         * @param {Object} ar - the <code>Object</code> to clean.
         * @param {Boolean} isDeepClean - (Optional; defaults to
         * <code>false</code>) - if
         * <code>true</code> and the object contains other <code>Object</code>s,
         * these
         * <code>Object</code>s will be cleaned as well; non-primitive values
         * will not be
         * cleaned otherwise.
         * @return a reference to the <code>Object</code> itself.
         */
        compact : function(ar, isDeepClean) {

            //
            isDeepClean = !!isDeepClean;

            if(!ar) {

                return null;
            }

            var value = null;
            var compact = me.CollectionHelper.compact;

            if(isArray(ar)) {
                for(var i = 0, len = ar.length; i < len; i++) {
                    value = ar[i];

                    if(value === null || value === UNDEFINED) {
                        ar.splice(i, 1);
                        i = i - 1;
                        len = ar.length;

                        continue;
                    }

                    if(isArray(value) && isDeepClean) {
                        compact(value, isDeepClean);

                        continue;
                    }
                }

                return ar;
            }

            for(var key in ar) {
                if(ar.hasOwnProperty(key)) {
                    value = ar[key];

                    if(value === null || value === UNDEFINED) {
       
                        //
                        delete ar[key];
                    }

                    if( typeof value == 'object' && isDeepClean) {
                        compact(value);

                        continue;
                    }
                }
            }

            return ar;

        }

    };

}(o2, this));
