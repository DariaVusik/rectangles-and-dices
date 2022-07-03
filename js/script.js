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
    let gameState = new GameState(WIDTH_CELL_COUNT, HEIGHT_CELL_COUNT);

    canvas.addEventListener('mousemove', onMouseMove, false);
    function onMouseMove(event) {
        if (gameState.currentState === ROLLING_STATE) return;
        let currentRectangle = gameBoard.getRectange(event.layerX, event.layerY, gameState.currentRectangleDims[0], gameState.currentRectangleDims[1]);
        let isAllowedRectangle = gameState.isAllowedRectangle(currentRectangle);
        gameBoard.drawCurrentBoard(gameState.playersRectangles, currentRectangle, isAllowedRectangle);
    }

    canvas.addEventListener('contextmenu', function (event) {
        if (gameState.currentState === ROLLING_STATE) return;
        gameState.rotateRectangleDims();
        let currentRectangle = gameBoard.getRectange(event.layerX, event.layerY, gameState.currentRectangleDims[0], gameState.currentRectangleDims[1]);
        let isAllowedRectangle = gameState.isAllowedRectangle(currentRectangle);
        gameBoard.drawCurrentBoard(gameState.playersRectangles, currentRectangle, isAllowedRectangle);

        event.preventDefault();
    });

    canvas.addEventListener('click', onMouseClick, false);
    function onMouseClick(event) {
        let currentRectangle = gameBoard.getRectange(event.layerX, event.layerY, gameState.currentRectangleDims[0], gameState.currentRectangleDims[1]);

        if (gameState.currentState === PLACEMENT_STATE && gameState.isAllowedRectangle(currentRectangle)) {
            gameState.addRectangle(currentRectangle);
            diceButton.disabled = false;
        }
        gameBoard.drawCurrentBoard(gameState.playersRectangles);
    }

    let diceButton = document.getElementById('diceButton');

    diceButton.addEventListener("click", onButtonClick);
    function onButtonClick(event) {
        diceButton.disabled = true;
        gameState.setRectangleDims(roll());
    }
})();