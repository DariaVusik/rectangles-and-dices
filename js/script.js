;(function () {
    // Load grid
    'use strict';

    const CELL_SIZE = 20;
    const STROKE_WIDTH = 1;

    const WIDTH_CELL_COUNT = 18;
    const HEIGHT_CELL_COUNT = 27;

    const ALLOWED_RECTANGLE_COLOR = 'Green';
    const NOT_ALLOWED_RECTANGLE_COLOR = 'Red';

    let canvas = document.getElementById('gameboard');
    let context = canvas.getContext('2d');

    let gameBoard = new GameBoard(canvas, context, WIDTH_CELL_COUNT, HEIGHT_CELL_COUNT, CELL_SIZE, STROKE_WIDTH);

    // temp game manager

    let tempWidth = 3;
    let tempHeight = 5;
    
    // add initial rectangle
    gameBoard.addRectangle({'x': 0, 'y': 0, 'width': tempWidth, 'height': tempHeight});

    canvas.addEventListener('mousemove', onMouseMove, false);
    function onMouseMove(event) {   
        gameBoard.drawCurrentBoard();
        let current_rectangle = gameBoard.getRectange(event.clientX, event.clientY, tempWidth, tempHeight);
        let color = gameBoard.isAllowedRectangle(current_rectangle)? ALLOWED_RECTANGLE_COLOR: NOT_ALLOWED_RECTANGLE_COLOR;

        gameBoard.drawRectangle(current_rectangle, color);
    }

    canvas.addEventListener('click', onMouseClick, false);
    function onMouseClick(event) {
        let current_rectangle = gameBoard.getRectange(event.clientX, event.clientY, tempWidth, tempHeight);

        if (gameBoard.isAllowedRectangle(current_rectangle)) {
            gameBoard.addRectangle(current_rectangle);
            gameBoard.isAllowedRectangle(current_rectangle);
        }
    }

    canvas.addEventListener('contextmenu', function(event) {
        [tempWidth, tempHeight] = [tempHeight, tempWidth];
        
        gameBoard.drawCurrentBoard();
        let current_rectangle = gameBoard.getRectange(event.clientX, event.clientY, tempWidth, tempHeight);
        let color = gameBoard.isAllowedRectangle(current_rectangle)? ALLOWED_RECTANGLE_COLOR: NOT_ALLOWED_RECTANGLE_COLOR;
        gameBoard.drawRectangle(current_rectangle, color);

        event.preventDefault();
    });
})();