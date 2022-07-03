'use strict';

class GameBoard {
    constructor(canvas, context, boardWidthCells, boardHeightCells, cellSizePx, strokeWidthPx, player_colors,
            allowedRectangleColor, disallowedRectangleColor
        ) {
        this.canvas = canvas;
        this.context = context;
        this.maxWidth = boardWidthCells;
        this.maxHeight = boardHeightCells;
        this.cellSizePx = cellSizePx;
        this.strokeWidthPx = strokeWidthPx;
        this.playerColors = player_colors;
        this.allowedRectangleColor = allowedRectangleColor;
        this.disallowedRectangleColor = disallowedRectangleColor;

        canvas.width = this.maxWidth * this.cellSizePx + this.strokeWidthPx;
        canvas.height = this.maxHeight * this.cellSizePx + this.strokeWidthPx;

        let data = `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"> \
        <defs> \
            <pattern id="grid" width="${this.cellSizePx}" height="${this.cellSizePx}" patternUnits="userSpaceOnUse"> \
                <path d="M ${this.cellSizePx} 0 L 0 0 0 ${this.cellSizePx}" fill="none" stroke="gray" stroke-width="${this.strokeWidthPx}" /> \
            </pattern> \
        </defs> \
        <rect width="100%" height="100%" fill="url(#grid)" /> \
        </svg>`;

        let DOMURL = window.URL || window.webkitURL || window;

        this.image = new Image();
        let svg = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
        let url = DOMURL.createObjectURL(svg);

        this.image.onload = function () {
            this.context.drawImage(this.image, 0, 0);
            DOMURL.revokeObjectURL(url);
        }.bind(this)
        this.image.src = url;

        this.rectangles = [];
    }

    getRectange(xPx, yPx, widthCells, heightCells) {
        let x = Math.min(Math.floor(xPx / this.cellSizePx), this.maxWidth - widthCells);
        let y = Math.min(Math.floor(yPx / this.cellSizePx), this.maxHeight - heightCells);
        return { 'x': x, 'y': y, 'width': widthCells, 'height': heightCells };
    }

    drawRectangle(rectangle, color) {
        const { x, y, width, height } = rectangle;
        this.context.strokeStyle = color;
        this.context.strokeRect(
            x * this.cellSizePx + this.strokeWidthPx, y * this.cellSizePx + this.strokeWidthPx,
            width * this.cellSizePx - this.strokeWidthPx, height * this.cellSizePx - this.strokeWidthPx);
    }

    drawCurrentBoard(playerRectangles, mouseRectangle = null, isAllowedRectangle = false) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(this.image, 0, 0);

        let rectanglesWithColor = playerRectangles.map(function(e, i) {
            return [e, this.playerColors[i]];
        }.bind(this));

        for (const [rectangles, color] of rectanglesWithColor) {
            for (const rectangle of rectangles) {
                this.drawRectangle(rectangle, color);
            }
        }

        // draw mouse position if any
        if (mouseRectangle !== null) {
            let color = isAllowedRectangle? this.allowedRectangleColor: this.disallowedRectangleColor;
            this.drawRectangle(mouseRectangle, color);
        }
    }
}