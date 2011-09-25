/*global o2 */

/**
 * @module domhelper.scroll
 * @requires domhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A window/div scroll helper.</p>
 */
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
     */
    var me = framework.DomHelper;

    /**
     * @function {static} DomHelper.scrollWindowToBottom
     *
     * <p>Scrolls window to bottom.</p>
     */
    me.scrollWindowToBottom = function() {

        if(document.documentElement) {
            me.scrollWindowToBottom = function() {

                document.body.scrollTop = document.body.scrollHeight;
                document.documentElement.scrollTop = document.documentElement.scrollHeight;

            };


            me.scrollWindowToBottom();

            return;
        }

        me.scrollWindowToBottom = function() {

            document.body.scrollTop = document.body.scrollHeight;

        };


        me.scrollWindowToBottom();
    };

    /**
     * @function {static} DomHelper.scrollWindowToTop
     *
     * <p>Scrolls window to top.</p>
     */
    me.scrollWindowToTop = function() {

        if(document.documentElement) {
            me.scrollWindowToTop = function() {

                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;

            };


            me.scrollWindowToTop();

            return;

        }

        me.scrollWindowToTop = function() {

            document.body.scrollTop = 0;

        };


        me.scrollWindowToTop();
    };

    /**
     * @function {static} DomHelper.scrollObjectToTop
     *
     * <p>Scrolls an element to top.</p>
     *
     * @param {DomNode} obj - the element to scroll.
     */
    me.scrollObjectToTop = function(obj) {

        obj.scrollTop = 0;

    };

    /**
     * @function {static} DomHelper.scrollObjectToBottom
     *
     * <p>Scrolls an element to bottom.</p>
     *
     * @param {DomNode} obj - the element to scroll.
     */
    me.scrollObjectToBottom = function(obj) {

        obj.scrollTop = obj.scrollHeight;

    };

    /**
     * @function {static} DomHelper.scrollWindowToObject
     *
     * <p>Scrolls the window to the object's offset position..</p>
     *
     * @param {DomNode} obj - the element to scroll to.
     */
    me.scrollWindowToObject = function(obj) {

        var offset = me.getOffset(obj);
        window.scrollTo(offset.left, offset.top);

    };

    /**
     * @function {static} DomHelper.getWindowScrollOffset
     *
     * <p>Gets the <strong>window</strong>'s scroll offset.</p>
     *
     * @return the the <strong>window</strong>'s scroll offset in the form
     * <code>{left: l, top: t}</code>.
     */
    me.getWindowScrollOffset = function() {

        if(document.documentElement) {
            if(document.body && document.body.scrollLeft !== UNDEFINED) {
                me.getWindowScrollOffset = function() {

                    var left = Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
                    var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

                    return {
                        left : left,
                        top : top
                    };

                };

                return me.getWindowScrollOffset();
            }

            me.getWindowScrollOffset = function() {

                var left = document.documentElement.scrollLeft;
                var top = document.documentElement.scrollTop;

                return {
                    left : left,
                    top : top
                };

            };

            return me.getWindowScrollOffset();
        }

        // IE quirksmode
        me.getWindowScrollOffset = function() {

            var left = document.body.scrollLeft;
            var top = document.body.scrollTop;

            return {
                left : left,
                top : top
            };

        };

        return me.getWindowScrollOffset();

    };

}(o2, this));
