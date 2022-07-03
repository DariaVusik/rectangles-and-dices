; (function () {
    // Load grid
    'use strict';

    const CELL_SIZE = 20;
    const STROKE_WIDTH = 1;

    const WIDTH_CELL_COUNT = 18;
    const HEIGHT_CELL_COUNT = 27;

    const ALLOWED_RECTANGLE_COLOR = 'Green';
    const NOT_ALLOWED_RECTANGLE_COLOR = 'Red';

    const PLAYER_COLORS = ['Red', 'Blue']

    let canvas = document.getElementById('gameboard');
    let context = canvas.getContext('2d');

    let gameBoard = new GameBoard(
        canvas, context,
        WIDTH_CELL_COUNT, HEIGHT_CELL_COUNT, CELL_SIZE, STROKE_WIDTH,
        PLAYER_COLORS, ALLOWED_RECTANGLE_COLOR, NOT_ALLOWED_RECTANGLE_COLOR
    );
    let gameState = new GameState();

    // temp game manager

    let tempWidth = 3;
    let tempHeight = 5;

    // add initial rectangles
    gameState.setCurrentPlayer(0);
    gameState.addRectangle({ 'x': 0, 'y': 0, 'width': tempWidth, 'height': tempHeight }, true);
    gameState.switchPlayer();
    gameState.addRectangle({ 'x': WIDTH_CELL_COUNT - tempWidth, 'y': HEIGHT_CELL_COUNT - tempHeight, 'width': tempWidth, 'height': tempHeight }, true);
    gameState.switchPlayer();

    canvas.addEventListener('mousemove', onMouseMove, false);
    function onMouseMove(event) {
        let currentRectangle = gameBoard.getRectange(event.layerX, event.layerY, tempWidth, tempHeight);
        let isAllowedRectangle = gameState.isAllowedRectangle(currentRectangle);
        gameBoard.drawCurrentBoard(gameState.playersRectangles, currentRectangle, isAllowedRectangle);
    }

    canvas.addEventListener('contextmenu', function (event) {
        [tempWidth, tempHeight] = [tempHeight, tempWidth];

        let currentRectangle = gameBoard.getRectange(event.layerX, event.layerY, tempWidth, tempHeight);
        let isAllowedRectangle = gameState.isAllowedRectangle(currentRectangle);
        gameBoard.drawCurrentBoard(gameState.playersRectangles, currentRectangle, isAllowedRectangle);

        event.preventDefault();
    });

    canvas.addEventListener('click', onMouseClick, false);
    function onMouseClick(event) {
        let currentRectangle = gameBoard.getRectange(event.layerX, event.layerY, tempWidth, tempHeight);

        if (gameState.isAllowedRectangle(currentRectangle)) {
            gameState.addRectangle(currentRectangle);
            gameState.switchPlayer();
        }
        gameBoard.drawCurrentBoard(gameState.playersRectangles);
    }
})();