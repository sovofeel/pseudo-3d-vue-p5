import { scaling } from "@/helpers";

export default class Map {
  constructor({
    grid,
    canvasWidth,
    canvasHeight,
    mapNumRows,
    mapNumCols,
    tileSize,
    scaleFactor
  }) {
    this.grid = grid;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.mapNumRows = mapNumRows;
    this.mapNumCols = mapNumCols;
    this.tileSize = tileSize;
    this.scaleFactor = scaleFactor;
  }

  wallCollison(x, y) {
    // Проверяем что игрок в пределах карты
    if (x < 0 || x >= this.canvasWidth || y < 0 || y >= this.canvasHeight) {
      return true;
    }
    let mapGridIndexX = Math.floor(x / this.tileSize);
    let mapGridIndexY = Math.floor(y / this.tileSize);
    return this.grid[mapGridIndexY][mapGridIndexX] !== 0;
  }

  render(sketch) {
    for (let i = 0; i < this.mapNumRows; i++) {
      // Ряды позиция по вертикали
      for (let j = 0; j < this.mapNumCols; j++) {
        // Колонки позиция по горизонтали
        let tileX = j * this.tileSize;
        let tileY = i * this.tileSize;
        let tileColor = this.grid[i][j] == 1 ? "#222" : "#fff";
        sketch.stroke("#222");
        sketch.fill(tileColor);
        sketch.rect(
          scaling(this.scaleFactor, tileX),
          scaling(this.scaleFactor, tileY),
          scaling(this.scaleFactor, this.tileSize),
          scaling(this.scaleFactor, this.tileSize)
        );
      }
    }
  }
}
