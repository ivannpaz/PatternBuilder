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

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    Plugin.prototype.buildColumn = function(index) {
        var pieces = Math.floor(Math.random() * this.options.maxPieces) + 1,
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

    Plugin.prototype.buildBlock = function(blockSize, color) {
        var height = (this.area.h * blockSize) / 100;
        return {
            height    : height,
            color   : ColorRandomizer.getColor()
        };
    };

    /**
     * Create Display the actual elements in the canvas.
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
    $.fn.patternBuilder = function(options) {
        return this.each(function () {
            new Plugin(this, options);
        });
    };

})(jQuery, window, document);
