/**
 * Initialize Patter builder plugin.
 */
;(function ($, window, document, undefined) {

    var pluginDefaults = {
        background      : '#FFFFFF',
        frameSize       : false,
        frameColor      : false,
        columnWidth     : 5,        //If false, it will be calculated with columns
        columns         : false,    //Only used if columnWidth is false
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
        this.options = $.extend({}, pluginDefaults, options);
        this.init();
    }

    /**
     * Bootstart
     */
   Plugin.prototype.init = function () {
        var canvasPattern = false;

        this.setupCanvas();

        if (this.options.canvasContent === false) {
            canvasPattern = this.buildPattern();
        } else {
            canvasPattern = this.parsePattern(this.options.canvasContent);
        }

        if (this.options.frameSize && this.options.frameColor) {
            this.drawFrame(this.options.frameSize, this.options.frameColor);
        }

        this.drawCanvas(canvasPattern);
    };

    /**
     * Setup the canvas context
     */
    Plugin.prototype.setupCanvas = function () {
        this.canvas = this.element.getContext('2d');
        this.canvas.translate(0.5, 0.5);
    };

    /**
     * Style the surrounding frame
     */
    Plugin.prototype.drawFrame = function (width, color) {
        var parent = $(this.element).parent(),
            boxWidth = parent.width() - 1,
            boxHeight = parent.height() - 1;

        this.canvas.fillStyle = this.options.background;
        this.canvas.fillRect(0, 0, boxWidth, boxHeight);
        this.canvas.strokeStyle = this.options.frameColor;
        this.canvas.lineWidth = width;
        this.canvas.strokeRect(0, 0, boxWidth, boxHeight);
    };

    /**
     * Randomly generate the pattern.
     *
     * @return {object}     Object depicting the pattern to display.
     */
    Plugin.prototype.buildPattern = function () {
        var pattern = {};


    };

    /**
     * Create Display the actual elements in the canvas.
     *
     * @param  {object}     pattern
     */
    Plugin.prototype.drawCanvas = function (pattern) {

    };

    /**
     * Attach to jQuery plugin namespace.
     *
     * @param  {object}     options     Initialization options
     */
    $.fn.patternBuilder = function(options) {
        return this.each(function () {
            new Plugin(this, options);
        });
    };

})(jQuery, window, document);
