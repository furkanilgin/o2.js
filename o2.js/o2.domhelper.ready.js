/*global o2 */

/**
 * @module domhelper.ready
 * @requires domhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A helper to fire events when the <code>DOM</code> content is loaded.</p>
 */
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
     */
    var me = framework.DomHelper;
    var nill = me.nill;

    /*
     * Module configuration.
     */
    var config = {
        constants : {

            /*
             *
             */
            regExp : {
                REG_DOM_LOADED : /^loade|c/
            }

        }
    };

    /*
     *
     */
    function isDomContentReady() {

        return (config.constants.regExp.REG_DOM_LOADED).test(window.document.readyState);

    }

    /*
     * State.
     */
    var state = {
        isApplicationReady : isDomContentReady(),
        readyQueue : []
    };

    /*
     *
     */
    function flushReadyQueue() {

        state.isApplicationReady = true;

        var queue = state.readyQueue;

        while(queue.length > 0) {
            queue.pop()();
        }

    }

    /*
     * DOM Content ready check for MSIE.
     * http://javascript.nwbox.com/IEContentLoaded/
     */
    var checkScrollLeft = function() {

        try {
            
            window.document.documentElement.doScroll('left');
            
        } catch(e) {
            
            setTimeout(checkScrollLeft, 50);
            
            return;
        
        }

        flushReadyQueue();
        
        //
        checkScrollLeft = nill;

    };

    var onMozDomContentLoaded = function(evt) {

        window.document.removeEventListener('DOMContentLoaded', onMozDomContentLoaded, false);
        
        //
        flushReadyQueue();

        //
        onMozDomContentLoaded = nill;

    };

    var onMozWindowLoad = function(evt) {

        window.document.removeEventListener('load', onMozWindowLoad, false);
        
        //
        flushReadyQueue();

        //
        onMozWindowLoad = nill;

    };

    var onIEDomContentLoaded = function(evt) {

        if(!isDomContentReady()) {

            return;
        }
        
        //
        window.document.detachEvent('onreadystatechange', onIEDomContentLoaded);
        
        //
        flushReadyQueue();
        
        //
        onIEDomContentLoaded = nill;

    };

    var onIEWindowLoaded = function(evt) {

        window.detachEvent('onload', onIEWindowLoaded);
        
        //
        flushReadyQueue();
        
        //
        onIEDomContentLoaded = nill;

    };

    var bindReadyListeners = function() {

        var doc = window.document;

        // Mozilla, Opera, webkit
        if(doc.addEventListener) {
        
            //Listen to native on dom conten loaded event.
            doc.addEventListener('DOMContentLoaded', onMozDomContentLoaded, false);

            //Worst-case fallback
            window.addEventListener('load', onMozWindowLoad, false);

            //Do not process further calls.
            bindReadyListeners = nill;

            return;
        }

        // MSIE
        if(doc.attachEvent) {
        
            // Listen to ready state change.
            doc.attachEvent('onreadystatechange', onIEDomContentLoaded);

            // Worst-case fallback
            window.attachEvent('onload', onIEWindowLoaded);

            // If the document is not an IFRAME then ready state has no use,
            var isIframe = window.self != window.top;

            // so apply an alternative trick.
            if(!isIframe) {
                checkScrollLeft();
            }

            // Do not process further calls.
            bindReadyListeners = nill;

            return;
        }

    };

    /**
     * @function {static} DomHelper.ready
     *
     * <p>Fires when the <code>HTML DOM</code> is ready.</p>
     *
     * @param {Function} delegate - the callback that's called when the DOM is
     * ready.
     */
    me.ready = function(delegate) {

        // if DOM is ready, execute the delegate immediately.
        if(state.isApplicationReady) {
            delegate();

            return;
        }

        // Otherwise, check for the DOM's ready state.
        bindReadyListeners();

        // this queue will be processed "only once" after DOM is ready.
        state.readyQueue.push(delegate);

    };

}(o2, this));
