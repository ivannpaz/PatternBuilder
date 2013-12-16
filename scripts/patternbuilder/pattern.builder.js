/**
 * Initialize Pattern builder plugin.
 */
;(function ($, window, document, undefined) {

    var pluginName = 'patternBuilder',
        pluginDefaults = {
            background      : '#FFFFFF',
            frameSize       : false,
            frameColor      : false,
            columnWidth     : 5,        //If false, it will be calculated with columns
            columns         : false,    //Only used if columnWidth is false
            maxBlocks       : 3,
            minBlockSize    : 30,
            canvasContent   : false,
            colorPalette    : []
        };

    /**
     * Constructor.
     *
     * @param {dom}     element     Drawing board
     * @param {object}  options     Plugin options
     */
    function Plugin(element, options)
    {
        this.element = element;
        this.$element = $(element);
        this.options = $.extend({}, pluginDefaults, options);
        this.init();
    }

    /**
     * Launch it
     */
   Plugin.prototype.init = function()
   {
        this.setupCanvas();

        ColorRandomizer.initialize(this.options.colorPalette);

        if (this.options.frameSize && this.options.frameColor) {
            this.drawFrame(
                this.options.background,
                this.options.frameSize,
                this.options.frameColor
            );
        }

        var canvasPattern = false;

        if (this.options.canvasContent !== false) {
            canvasPattern = this.parsePattern(this.options.canvasContent);
        } else {
            canvasPattern = this.buildPattern();
        }

        this.drawCanvas(canvasPattern);

        $(this.$element).data('canvas-content', JSON.stringify(canvasPattern));
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
     * Parse a json encoded pattern
     *
     * @return {object}     Object depicting the pattern to display.
     */
    Plugin.prototype.parsePattern = function(hash)
    {
        return this.options.canvasContent;
    };

    /**
     * Randomly generate the pattern.
     *
     * @return {object}     Object depicting the pattern to display.
     */
    Plugin.prototype.buildPattern = function()
    {
        var pattern = [];

        var columns = this.area.w / this.options.columnWidth;

        for (column = 0; column < columns; column++) {
            pattern.push(this.buildColumn(column));
        }

        return pattern;
    };

    /**
     * Generate a random integer with lower and upper bounds.
     *
     * @param  {integer} min
     * @param  {integer} max
     *
     * @return {integer}
     */
    function random(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Build a column with random blocks inside.
     *
     * @return {array}
     */
    Plugin.prototype.buildColumn = function()
    {
        var pieces = Math.floor(Math.random() * this.options.maxBlocks) + 1,
            blocks = [];

        if (pieces === 1) {
            blocks.push(this.buildBlock(100));
            return blocks;
        }

        var columnSize = 100,
            randomSize;

        for(var i = 1; i < pieces; i++) {
            randomSize = random(this.options.minBlockSize, columnSize);
            blocks.push(this.buildBlock(randomSize));
            columnSize -= randomSize;
        }

        blocks.push(this.buildBlock(columnSize));

        return blocks;
    };

    /**
     * Build an inner block with a given height% and random color.
     *
     * @param  {int}    blockSize
     * @return {object}
     */
    Plugin.prototype.buildBlock = function(blockSize)
    {
        var height = (this.area.h * blockSize) / 100;
        return {
            height  : height,
            color   : ColorRandomizer.getColor()
        };
    };

    /**
     * Display each column and blocks onto the canvas.
     *
     * @param  {object}     pattern
     */
    Plugin.prototype.drawCanvas = function(pattern)
    {
        for (var i = 0; i < pattern.length; i++) {
            this.drawColumn(
                i,
                pattern[i],
                this.area
            );
        }
    };

    /**
     * Draw a column composed by 1 or more blocks onto the cannvas.
     *
     * @param  {integer}  columnIndex
     * @param  {array}    column
     * @param  {object}   area
     */
    Plugin.prototype.drawColumn = function(columnIndex, column, area)
    {
        var heightOffset = 0;
        for (var i = 0; i < column.length; i++) {
            this.canvas.add(
                new fabric.Rect({
                    left: area.x + columnIndex * this.options.columnWidth,
                    top: area.y + heightOffset,
                    fill: column[i].color,
                    width: this.options.columnWidth,
                    height: column[i].height
                })
            );

            heightOffset += column[i].height;
        }
    };

    /**
     * Attach to jQuery plugin namespace.
     *
     * @param  {object}     options     Initialization options
     */
    $.fn[pluginName] = function(options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName);
                new Plugin(this, options);
            }
        });
    };

})(jQuery, window, document);
