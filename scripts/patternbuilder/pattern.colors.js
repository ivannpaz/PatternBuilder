/**
 * Handles palette randomization.
 *
 * @return {object}
 */
var ColorRandomizer = (function() {

    /**
     * @private
     */
    var palette = [],
        delivered = [],
        lastColor = false;

    /**
     * Get a random number from 0 to max items in palette.
     *
     * @return {int}
     */
    function randomizer() {
        return Math.floor(Math.random() * palette.length);
    }

    /**
     * Keep track of each color delivered to the requestor incrementing its
     * per-color counter and last color drafted.
     *
     * @param  {string}     color
     */
    function updateDelivered(color) {
        if (!(color in delivered)) {
            delivered[color] = 0;
        }

        lastColor = color;
        delivered[color]++;
    }

    /**
     * @public
     */
    return {

        /**
         * Initialize the palette of colors to randomize from.
         */
        initialize: function(colors) {
            palette = colors;
        },

        /**
         * Get a random color from the configured palette, without repeating the
         * previous one.
         *
         * @return {string}
         */
        getColor: function() {
            var color = false;

            do {
                color = palette[randomizer()];
            } while(color === lastColor) ;

            updateDelivered(color);

            return color;
        },

        getStats: function() {
            console.log(delivered);
        }
    };

})();
