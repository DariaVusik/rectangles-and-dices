'use strict';
const ROLLING_STATE = 0;
const PLACEMENT_STATE = 1;


class GameState {
    constructor(boardWidth, boardHeigh, currentPlayer = 0) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeigh;
        this.playersRectangles = [
            [],
            []
        ];
        this.currentPlayerIdx = currentPlayer;
        this.currentState = ROLLING_STATE;
        this.currentRectangleDims = []; // width and height
    }

    switchPlayer() {
        this.currentPlayerIdx = (this.currentPlayerIdx + 1) % 2;
    }

    addRectangle(rectangle) {
        if (this.isAllowedRectangle(rectangle)) {
            this.playersRectangles[this.currentPlayerIdx].push(rectangle);
            this.currentRectangleDims = [];
            this.currentState = ROLLING_STATE;
            this.switchPlayer();
        }
    }

    setRectangleDims(dims) {
        this.currentRectangleDims = dims;
        this.currentState = PLACEMENT_STATE;
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