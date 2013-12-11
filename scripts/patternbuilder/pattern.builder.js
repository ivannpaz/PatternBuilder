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
        canvasContent   : false,
        colorPalette    : []
    };

    /**
     * Constructor.
     *
     * @param {dom}     element     Drawing board
     * @param {object}  options     Plugin options
     */
    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = $.extend({}, pluginDefaults, options);
        this.init();
    }

    /**
     * Launch it
     */
   Plugin.prototype.init = function() {
        var canvasPattern = false;

        this.setupCanvas();

        ColorRandomizer.initialize(this.options.colorPalette);

        if (this.options.canvasContent === false) {
            canvasPattern = this.buildPattern();
        } else {
            canvasPattern = this.parsePattern(this.options.canvasContent);
        }

        if (this.options.frameSize && this.options.frameColor) {
            this.drawFrame(
                this.options.background,
                this.options.frameSize,
                this.options.frameColor
            );
        }

        this.drawCanvas(canvasPattern);
    };

    /**
     * Setup the canvas context
     */
    Plugin.prototype.setupCanvas = function()
    {
        this.canvas = new fabric.StaticCanvas(this.element);
    };

    /**
     * Style the surrounding frame
     */
    Plugin.prototype.drawFrame = function(background, frameSize, frameColor)
    {
        var rect = new fabric.Rect({
          left: 0,
          top: 0,
          fill: background,
          width: this.$element.width() - frameSize,
          height: this.$element.height() - frameSize,
          strokeWidth: frameSize,
          stroke: frameColor
        });

        this.canvas.add(rect);
    };

    /**
     * Randomly generate the pattern.
     *
     * @return {object}     Object depicting the pattern to display.
     */
    Plugin.prototype.buildPattern = function() {
        var pattern = {};


        return pattern;
    };

    /**
     * Create Display the actual elements in the canvas.
     *
     * @param  {object}     pattern
     */
    Plugin.prototype.drawCanvas = function(pattern)
    {
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
            this.drawColumn(
                area, i, this.options.columnWidth, drawHeight
            );
        }
    };

    Plugin.prototype.drawColumn = function(area, offsetX, width, height)
    {
        console.log(height);
        this.canvas.add(
            new fabric.Rect({
                left: area.x + offsetX * width,
                top: area.y,
                fill: ColorRandomizer.getColor(),
                width: width,
                height: height
            })
        );
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
