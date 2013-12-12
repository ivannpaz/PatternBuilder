/**
 * Build everything here
 * @return void
 */
$(document).ready(function() {
    var colorPalettes = [
        ['#69370B', '#F2B66C', '#E06011', '#FCA71E', '#004400'],
        ['#EEEECA', '#88A890', '#5E7480', '#5A4B76', '#3F3755'],
        ['#F7A600', '#B6BE2A', '#398FB6', '#E96F3B', '#6B6759'],
        ['#D0DF82', '#ECD026', '#FD4F4E', '#A11931', '#2A1B14']
    ];

    var randomPaletteIndex = Math.floor(Math.random() * colorPalettes.length);

    $('#artboard > canvas').patternBuilder({
        frameSize       : 40,
        frameColor      : '#24282F',
        background      : '#FFFFFF',
        columnWidth     : Math.floor(Math.random() * 40) + 5,
        maxPieces       : 3,
        colorPalette    : colorPalettes[randomPaletteIndex]
    });
});
