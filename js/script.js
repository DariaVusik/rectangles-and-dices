;(function() {
    'use strict';

    let canvas = document.getElementById('gameboard');
    let context = canvas.getContext('2d');
    const cellSize = 20;
    const strokeWidth = 1;

    const widthCellCount = 18;
    const heightCellCount = 27;
    canvas.width = widthCellCount * cellSize + strokeWidth;
    canvas.height = heightCellCount * cellSize + strokeWidth;

    var data = `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"> \
        <defs> \
            <pattern id="grid" width="${cellSize}" height="${cellSize}" patternUnits="userSpaceOnUse"> \
                <path d="M ${cellSize} 0 L 0 0 0 ${cellSize}" fill="none" stroke="gray" stroke-width="${strokeWidth}" /> \
            </pattern> \
        </defs> \
        <rect width="100%" height="100%" fill="url(#grid)" /> \
    </svg>`;

    var DOMURL = window.URL || window.webkitURL || window;
    
    var image = new Image();
    var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    var url = DOMURL.createObjectURL(svg);
    
    image.onload = function () {
      context.drawImage(image, 0, 0);
      DOMURL.revokeObjectURL(url);
    }
    image.src = url;
})();