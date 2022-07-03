'use strict';

class GameState {
    constructor() {
        this.playersRectangles = [
            [],
            []
        ];
        this.currentPlayerIdx = null;
    }

    setCurrentPlayer(playerIdx) {
        this.currentPlayerIdx = playerIdx;
    }

    switchPlayer() {
        this.currentPlayerIdx = (this.currentPlayerIdx + 1) % 2;
    }

    addRectangle(rectangle, first = false) {
        if (this.isAllowedRectangle(rectangle) || first) {
            this.playersRectangles[this.currentPlayerIdx].push(rectangle);
        }
    }

    isAllowedRectangle(rectangle) {
        if (this.playersRectangles.some(
            (rectangles) => rectangles.some((other) => Rectangles.intersect(rectangle, other)))) {
            return false;
        }

        return this.playersRectangles[this.currentPlayerIdx].some((other) => Rectangles.touches(rectangle, other));
    }
}