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
    actualizeUI();

    canvas.addEventListener('mousemove', onMouseMove, false);
    function onMouseMove(event) {
        if (gameState.currentState === GameState.ROLLING_STATE) return;
        let currentRectangle = gameBoard.getRectange(event.layerX, event.layerY, gameState.currentRectangleDims[0], gameState.currentRectangleDims[1]);
        let isAllowedRectangle = gameState.isAllowedRectangle(currentRectangle);
        gameBoard.drawCurrentBoard(gameState.playersRectangles, currentRectangle, isAllowedRectangle);
    }

    canvas.addEventListener('contextmenu', function (event) {
        if (gameState.currentState === GameState.ROLLING_STATE) return;
        gameState.rotateRectangleDims();
        let currentRectangle = gameBoard.getRectange(event.layerX, event.layerY, gameState.currentRectangleDims[0], gameState.currentRectangleDims[1]);
        let isAllowedRectangle = gameState.isAllowedRectangle(currentRectangle);
        gameBoard.drawCurrentBoard(gameState.playersRectangles, currentRectangle, isAllowedRectangle);

        event.preventDefault();
    });

    function actualizeUI() {
        const [firstPlayerScore, secondPlayerScore] = gameState.playersScores;
        document.getElementById('firstPlayerScore').textContent = firstPlayerScore;
        document.getElementById('secondPlayerScore').textContent = secondPlayerScore;

        let gameFinished = false;
        let gameStateString = null;
        switch (gameState.currentState) {
            case GameState.ROLLING_STATE:
              gameStateString = `Player #${gameState.currentPlayerIdx + 1}: roll dice`;
              break;
            case GameState.PLACEMENT_STATE:
              gameStateString = `Player #${gameState.currentPlayerIdx + 1}: place shape`;
              break;
            case GameState.FIRST_WIN:
              gameStateString = 'Player #1 Wins!'
              gameFinished = true;
              break;
            case GameState.SECOND_WIN:
              gameStateString = 'Player #2 Wins!'
              gameFinished = true;
              break;
            case GameState.DRAW:
              gameStateString = 'Fair!'
              gameFinished = true;
              break;
          }

          if (gameFinished) {
            diceButton.disabled = true;
          }

          document.getElementById('gameState').textContent = gameStateString;
    }

    canvas.addEventListener('click', onMouseClick, false);
    function onMouseClick(event) {
        let currentRectangle = gameBoard.getRectange(event.layerX, event.layerY, gameState.currentRectangleDims[0], gameState.currentRectangleDims[1]);

        if (gameState.currentState === GameState.PLACEMENT_STATE && gameState.isAllowedRectangle(currentRectangle)) {
            gameState.addRectangle(currentRectangle);
            diceButton.disabled = false;
            actualizeUI();
        }
        gameBoard.drawCurrentBoard(gameState.playersRectangles);
    }

    let diceButton = document.getElementById('diceButton');

    diceButton.addEventListener("click", onButtonClick);
    function onButtonClick(event) {
        diceButton.disabled = true;
        roll( function(dims) {
            gameState.setRectangleDims(dims);
            actualizeUI();
            if (!gameState.hasMove()) {
                const message = `Player ${gameState.currentPlayerIdx + 1} skips turn`;
                alert(message);
                gameState.switchPlayer();
                gameState.currentState = GameState.ROLLING_STATE;
                diceButton.disabled = false;
                actualizeUI();
            }
        });
    }
})();
