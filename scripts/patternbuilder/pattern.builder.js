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
        maxPieces       : 3,
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

        if (this.options.frameSize && this.options.frameColor) {
            this.drawFrame(
                this.options.background,
                this.options.frameSize,
                this.options.frameColor
            );
        }

        ColorRandomizer.initialize(this.options.colorPalette);

        if (this.options.canvasContent !== false) {
            canvasPattern = this.parsePattern(this.options.canvasContent);
        } else {
            canvasPattern = this.buildPattern();
        }

        this.drawCanvas(canvasPattern);
    };

    /**
     * Setup the canvas context
     */
    Plugin.prototype.setupCanvas = function()
    {
        this.canvas = new fabric.StaticCanvas(this.element);

        this.area = {
            x: this.options.frameSize,
            y: this.options.frameSize,
            w: this.$element.width() - this.options.frameSize * 2,
            h: this.$element.height() - this.options.frameSize * 2
        };
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
        var pattern = [];

        var columns = this.area.w / this.options.columnWidth;

        for (column = 0; column < columns; column++) {
            pattern.push(this.buildColumn(column));
        }

        return pattern;
    };

    Plugin.prototype.buildColumn = function(index) {
        var pieces = Math.floor(Math.random() * this.options.maxPieces) + 1;



    };

    /**
     * Create Display the actual elements in the canvas.
     *
     * @param  {object}     pattern
     */
    Plugin.prototype.drawCanvas = function(pattern)
    {
console.log(pattern);
return;

        // this.columns = drawWidth / this.options.columnWidth;

        // for (i = 0; i < this.columns; i++) {
        //     this.drawColumn(
        //         area, i, this.options.columnWidth, drawHeight
        //     );
        // }
    };

    Plugin.prototype.drawColumn = function()
    {
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
