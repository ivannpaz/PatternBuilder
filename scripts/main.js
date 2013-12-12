/**
 * Build everything here
 * @return void
 */
$(document).ready(function(){
    $('#artboard > canvas').patternBuilder({
        frameSize       : 40,
        frameColor      : '#24282F',
        background      : '#FFFFFF',
        columnWidth     : 40,
        maxPieces       : 4,
        colorPalette    : [
            '#C6382A', '#B9CE31',
            '#3F6F01', '#FFD876',
            '#F49924'
        ]
    });
});
