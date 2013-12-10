/**
 * Initialize Patter builder plugin.
 */
;(function ($, window, document, undefined) {

    var defaults = {
        frameSize       : false,
        frameColor      : false,
        canvasContent   : false
    };

    /**
     * Constructor.
     *
     * @param {dom}     element     Drawing board
     * @param {object}  options     Plugin options
     */
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this.init();
    }

    /**
     * Bootstart
     */
   Plugin.prototype.init = function () {
        var canvasPattern = false;

        if (this.options.canvasContent === false) {
            canvasPattern = this.buildPattern();
        } else {
            canvasPattern = this.parsePattern(this.options.canvasContent);
        }

        if (this.options.frameSize && this.options.frameColor) {
            this.drawFrame(this.options.frameSize, this.options.frameColor);
        }

        this.drawCanvas(canvasPattern);
    }

    /**
     * Style the surrounding frame
     */
    Plugin.prototype.drawFrame = function (width, color) {
        var parent = $(this.element).parent(),
            border = this.options.frameSize * 2;

        $(this.element).css({
            'border-width'  : this.options.frameSize,
            'border-color'  : this.options.frameColor,
            'border-style'  : 'solid',
            'width'         : parent.width() - border,
            'height'        : parent.height() - border,
        });
    }

    /**
     * Randomly generate the pattern.
     *
     * @return {object}     Object depicting the pattern to display.
     */
    Plugin.prototype.buildPattern = function () {
        //
    }

    /**
     * Create Display the actual elements in the canvas.
     *
     * @param  {object}     content
     */
    Plugin.prototype.drawCanvas = function (content) {

    }

    /**
     * Attach to jQuery plugin namespace.
     *
     * @param  {object}     options     Initialization options
     */
    $.fn.patternBuilder = function(options) {
        return this.each(function () {
            new Plugin(this, options);
        });
    }

})(jQuery, window, document);
