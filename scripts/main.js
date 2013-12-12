/**
 * Build everything here
 * @return void
 */
$(document).ready(function(){
    $('#artboard > canvas').patternBuilder({
        frameSize       : 40,
        frameColor      : '#24282F',
        background      : '#FFFFFF',
        columnWidth     : 5,
        maxPieces       : 3,
        colorPalette    : [
            '#69370B', '#F2B66C',
            '#E06011', '#FCA71E',
            '#004400'
        ]
    });
});
