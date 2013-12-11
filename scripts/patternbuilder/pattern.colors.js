/**
 * Handles palette randomization.
 *
 * @return {object}
 */
var ColorRandomizer = (function() {

    var palette = [],
        delivered = [],
        lastColor = false;

    function randomizer() {
        return Math.floor(Math.random() * palette.length);
    }

    function updateDelivered(color) {
        if (!(color in delivered)) {
            delivered[color] = 0;
        }

        lastColor = color;
        delivered[color]++;
    }

    /**
     * Public methods
     */
    return {

        /**
         * Initialize the palette of colors to randomize from.
         */
        initialize: function(colors)
        {
            palette = colors;
        },

        /**
         * Get a random color from the configured palette.
         *
         * @return {string}
         */
        getColor: function()
        {
            var color = false;

            while((color = palette[randomizer()]) === lastColor) ;

            updateDelivered(color);

            return color;
        },

        getMatrix: function() {
            console.log(delivered);
        }
    };

})();
