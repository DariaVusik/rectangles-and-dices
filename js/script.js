;(function () {
    // Load grid
    'use strict';

    const CELL_SIZE = 20;
    const STROKE_WIDTH = 1;

    const WIDTH_CELL_COUNT = 18;
    const HEIGHT_CELL_COUNT = 27;

    let canvas = document.getElementById('gameboard');
    let context = canvas.getContext('2d');

    let gameBoard = new GameBoard(canvas, context, WIDTH_CELL_COUNT, HEIGHT_CELL_COUNT, CELL_SIZE, STROKE_WIDTH);

    // temp game manager

    let tempWidth = 3;
    let tempHeight = 5;

    canvas.addEventListener('mousemove', onMouseMove, false);
    function onMouseMove(event) {   
        gameBoard.drawCurrentBoard();
        let current_rectangle = gameBoard.getRectange(event.clientX, event.clientY, tempWidth, tempHeight);
        gameBoard.drawRectangle(current_rectangle, "Red");
    }

    canvas.addEventListener('click', onMouseClick, false);
    function onMouseClick(event) {
        let current_rectangle = gameBoard.getRectange(event.clientX, event.clientY, tempWidth, tempHeight);
        gameBoard.addRectangle(current_rectangle);
        gameBoard.drawCurrentBoard();
    }

    canvas.addEventListener('contextmenu', function(event) {
        [tempWidth, tempHeight] = [tempHeight, tempWidth];
        event.preventDefault();
        gameBoard.drawCurrentBoard();
        let current_rectangle = getRectange(event.clientX, event.clientY, tempWidth, tempHeight);
        gameBoard.drawRectangle(current_rectangle, "Red");
    });
})();