; (function () {
    // Load grid
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
    var svg = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    var url = DOMURL.createObjectURL(svg);

    image.onload = function () {
        context.drawImage(image, 0, 0);
        DOMURL.revokeObjectURL(url);
    }
    image.src = url;

    // temp put cell code
    let cellWidth = 3;
    let cellHeight = 2;
    class Rectangle {
        constructor({ width_in_cells, height_in_cells }) {

            this.width_in_cells = width_in_cells;
            this.height_in_cells = height_in_cells;
        }

        draw(x, y, color) {
            let top_x = x - (cellWidth - cellWidth % 2) * cellSize / 2;
            let top_y = y - (cellHeight - cellHeight % 2) * cellSize / 2;
            context.strokeStyle = color;
            if (top_x < 0) {
                top_x = 0;
            }
            if (top_y < 0) {
                top_y = 0;
            }
            if (top_x + cellWidth * cellSize > canvas.width) {
                top_x = (widthCellCount - cellWidth) * cellSize;
            }
            if (top_y + cellHeight * cellSize > canvas.height) {
                top_y = (heightCellCount - cellHeight) * cellSize;
            }
            context.strokeRect(top_x, top_y, cellSize * cellWidth, cellSize * cellHeight);
        }
    }

    let current_figurine = new Rectangle(2, 2);

    canvas.addEventListener('mousemove', ev_mousemove, false);
    function ev_mousemove(event) {
        let x = Math.floor(event.clientX / cellSize);
        let y = Math.floor(event.clientY / cellSize);
        context.globalCompositeOperation = "destination-over";
        context.clearRect(0, 0, canvas.width, canvas.height); //somehow keep background 
        //image.src = url;
        // TODO can we avoid re-draw?
        context.drawImage(image, 0, 0);
        current_figurine.draw(x * cellSize, y * cellSize, "Red");
    }
})();