;(function () {
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

    let tempWidth = 3;
    let tempHeight = 5;

    let rectangles = [];

    function getRectange(mouse_x, mouse_y, widthCells, heightCells) {
        let x = Math.min(Math.floor(mouse_x / cellSize), widthCellCount - widthCells);
        let y = Math.min(Math.floor(mouse_y / cellSize), heightCellCount - heightCells);
        return {'x': x, 'y': y, 'width': widthCells, 'height': heightCells};
    }

    function drawRectangle(rectangle, color) {
        // TODO move to getRectangle
        const {x, y, width, height} = rectangle;
        context.strokeStyle = color;
        context.strokeRect(
            x * cellSize + strokeWidth, y * cellSize + strokeWidth,
            cellSize * width - strokeWidth, cellSize * height - strokeWidth);
    }

    function drawCurrentBoard() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0);
        for (const rectangle of rectangles) {
            drawRectangle(rectangle, 'Red');
        }
    }

    canvas.addEventListener('mousemove', onMouseMove, false);
    function onMouseMove(event) {   
        context.globalCompositeOperation = "destination-over";
        drawCurrentBoard();
        let current_rectangle = getRectange(event.clientX, event.clientY, tempWidth, tempHeight);
        drawRectangle(current_rectangle, "Red");
    }

    canvas.addEventListener('click', onMouseClick, false);
    function onMouseClick(event) {
        let current_rectangle = getRectange(event.clientX, event.clientY, tempWidth, tempHeight);
        rectangles.push(current_rectangle);
        drawCurrentBoard();
    }

    canvas.addEventListener('contextmenu', function(event) {
        [tempWidth, tempHeight] = [tempHeight, tempWidth];
        event.preventDefault();
        drawCurrentBoard();
        let current_rectangle = getRectange(event.clientX, event.clientY, tempWidth, tempHeight);
        drawRectangle(current_rectangle, "Red");
    });
})();