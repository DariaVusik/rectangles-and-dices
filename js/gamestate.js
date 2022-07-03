'use strict';

class GameState {
    constructor(boardWidth, boardHeigh, currentPlayer = 0) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeigh;
        this.playersRectangles = [
            [],
            []
        ];
        this.remainingScores = this.boardWidth * this.boardHeight;
        this.playersScores = [0, 0];
        this.currentPlayerIdx = currentPlayer;
        this.currentState = GameState.ROLLING_STATE;
        this.currentRectangleDims = []; // width and height
    }

    static ROLLING_STATE = 0;
    static PLACEMENT_STATE = 1;
    static FIRST_WIN = 2;
    static SECOND_WIN = 3;
    static DRAW = 4;

    switchPlayer() {
        this.currentPlayerIdx = (this.currentPlayerIdx + 1) % 2;
    }

    addRectangle(rectangle) {
        if (this.isAllowedRectangle(rectangle)) {
            this.playersRectangles[this.currentPlayerIdx].push(rectangle);
            this.currentRectangleDims = [];
            this.currentState = GameState.ROLLING_STATE;
            const rectangleSquare = Rectangles.square(rectangle);
            this.playersScores[this.currentPlayerIdx] += Rectangles.square(rectangle); 
            this.remainingScores -= rectangleSquare;
            this.checkForWinner();
            this.switchPlayer();            
        }
    }

    checkForWinner() {
        const [firstPlayerScore, secondPlayerScore] = this.playersScores;
        const diffScores = firstPlayerScore - secondPlayerScore;

        if (Math.abs(diffScores) > this.remainingScores) {
            if (diffScores == 0) {
                this.currentState = GameState.DRAW;
            }
            if (diffScores > 0) {
                this.currentState = GameState.FIRST_WIN;
            }
            if (diffScores < 0) {
                this.currentState = GameState.SECOND_WIN;
            }
        }
    }

    setRectangleDims(dims) {
        this.currentRectangleDims = dims;
        this.currentState = GameState.PLACEMENT_STATE;
    }

    isAllowedRectangle(rectangle) {
        let currentPlayerRectangles = this.playersRectangles[this.currentPlayerIdx];
        if (currentPlayerRectangles.length === 0) {
            const [allowedX, allowedY] = this.currentPlayerIdx === 0 ? [0, 0] : [this.boardWidth - rectangle.width, this.boardHeight - rectangle.height];
            return rectangle.x == allowedX && rectangle.y == allowedY;
        }

        // check all intersections
        if (this.playersRectangles.some(
            (rectangles) => rectangles.some((other) => Rectangles.intersect(rectangle, other)))) {
            return false;
        }

        return currentPlayerRectangles.some((other) => Rectangles.touches(rectangle, other));
    }

    rotateRectangleDims() {
        this.currentRectangleDims = [this.currentRectangleDims[1], this.currentRectangleDims[0]];
    }
}