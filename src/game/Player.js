import { scaling } from "@/helpers";

export default class Player {
  constructor({ canvasWidth, canvasHeight, scaleFactor }) {
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;
    this.scaleFactor = scaleFactor;
    this.radius = 7;
    this.turnDirection = 0;
    this.walkDirection = 0;
    this.rotationAngle = Math.PI / 2;
    this.moveSpeed = 1.5;
    this.rotationSpeed = 4 * (Math.PI / 180);
  }

  update(grid) {
    this.rotationAngle += this.turnDirection * this.rotationSpeed;
    let moveStep = this.walkDirection * this.moveSpeed;
    let playerX = this.x + Math.cos(this.rotationAngle) * moveStep;
    let playerY = this.y + Math.sin(this.rotationAngle) * moveStep;

    if (!grid.wallCollison(playerX, playerY)) {
      this.x = playerX;
      this.y = playerY;
    }
  }

  walkTo(direction) {
    if (direction === "up") {
      this.walkDirection += 1;
    } else if (direction === "down") {
      this.walkDirection -= 1;
    }
  }

  render(sketch) {
    sketch.noStroke();
    sketch.fill("blue");
    sketch.circle(
      scaling(this.scaleFactor, this.x),
      scaling(this.scaleFactor, this.y),
      this.radius
    );
  }
}
