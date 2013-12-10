/**
 * Initialize Pattern builder plugin.
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
     * Launch it
     */
   Plugin.prototype.init = function() {
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
    Plugin.prototype.setupCanvas = function() {
        this.canvas = this.element.getContext('2d');
        this.canvas.translate(0.5, 0.5);
    };

    /**
     * Style the surrounding frame
     */
    Plugin.prototype.drawFrame = function(width, color) {
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
    Plugin.prototype.buildPattern = function() {
        var pattern = {};


    };

    /**
     * Create Display the actual elements in the canvas.
     *
     * @param  {object}     pattern
     */
    Plugin.prototype.drawCanvas = function(pattern) {

        /**
         * Testing in progress...
         */
        var parent = $(this.element).parent(),
            boxWidth = parent.width() - 1,
            boxHeight = parent.height() - 1,
            drawWidth = boxWidth - this.options.frameSize * 2,
            drawHeight = boxHeight - this.options.frameSize * 2;

        var area = {
            x       : this.options.frameSize,
            y       : this.options.frameSize,
            width: drawWidth + this.options.frameSize,
            height: drawHeight + this.options.frameSize
        };

        this.columns = drawWidth / this.options.columnWidth;

        for (i = 0; i < this.columns; i++) {
            this.drawColumn(area, i, this.options.columnWidth, drawHeight);
        }
    };

    Plugin.prototype.drawColumn = function(area, offsetX, width, height) {

        var color = this.getRandomColor();
        this.canvas.fillStyle = color;
        this.canvas.fillRect(
            area.x + offsetX * width,
            area.y,
            width,
            height
        );
    };

    Plugin.prototype.getRandomColor = function() {
        var r = Math.floor(Math.random() * 255) + 1,
            g = Math.floor(Math.random() * 255) + 1,
            b = Math.floor(Math.random() * 255) + 1;

        return this.decimalToHex(r) + this.decimalToHex(g) +this.decimalToHex(b);
    };

    Plugin.prototype.decimalToHex = function(d, padding) {
        var hex = Number(d).toString(16);
        padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

        while (hex.length < padding) {
            hex = "0" + hex;
        }

        return hex;
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
