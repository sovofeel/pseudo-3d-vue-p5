import { distanceBetweenPoints, scaling } from "@/helpers/index";

export default class Ray {
  constructor({ rayAngle, tileSize, canvasWidth, canvasHeight, scaleFactor }) {
    this.rayAngle = rayAngle;
    this.wallHitX = 0;
    this.tileSize = tileSize;
    this.wallHitY = 0;
    this.distance = 0;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.scaleFactor = scaleFactor;

    this.isRayFacingDown = this.rayAngle > 0 && this.rayAngle < Math.PI;
    this.isRayFacingUp = !this.isRayFacingDown;

    this.isRayFacingRight =
      this.rayAngle < 0.5 * Math.PI || this.rayAngle > 1.5 * Math.PI;
    this.isRayFacingLeft = !this.isRayFacingRight;
  }

  cast(player, grid) {
    let xIntercept, yIntercept, xStep, yStep;
    let foundHorizontalHit = false;
    let horizontalWallHitX = 0;
    let horizontalWallHitY = 0;

    yIntercept = Math.floor(player.y / this.tileSize) * this.tileSize;
    yIntercept += this.isRayFacingDown ? this.tileSize : 0;
    xIntercept = player.x + (yIntercept - player.y) / Math.tan(this.rayAngle);

    yStep = this.tileSize;
    yStep *= this.isRayFacingUp ? -1 : 1;

    xStep = this.tileSize / Math.tan(this.rayAngle);
    xStep *= this.isRayFacingLeft && xStep > 0 ? -1 : 1;
    xStep *= this.isRayFacingRight && xStep < 0 ? -1 : 1;

    let nextHorizontalTouchX = xIntercept;
    let nextHorizontalTouchY = yIntercept;

    while (
      nextHorizontalTouchX >= 0 &&
      nextHorizontalTouchX <= this.canvasWidth &&
      nextHorizontalTouchY >= 0 &&
      nextHorizontalTouchY <= this.canvasHeight
    ) {
      if (
        grid.wallCollison(
          nextHorizontalTouchX,
          nextHorizontalTouchY - (this.isRayFacingUp ? 1 : 0)
        )
      ) {
        foundHorizontalHit = true;
        horizontalWallHitX = nextHorizontalTouchX;
        horizontalWallHitY = nextHorizontalTouchY;

        break;
      } else {
        nextHorizontalTouchX += xStep;
        nextHorizontalTouchY += yStep;
      }
    }

    let foundVerticalHit = false;
    let verticalWallHitX = 0;
    let verticalWallHitY = 0;

    xIntercept = Math.floor(player.x / this.tileSize) * this.tileSize;
    xIntercept += this.isRayFacingRight ? this.tileSize : 0;

    yIntercept = player.y + (xIntercept - player.x) * Math.tan(this.rayAngle);

    xStep = this.tileSize;
    xStep *= this.isRayFacingLeft ? -1 : 1;

    yStep = this.tileSize * Math.tan(this.rayAngle);
    yStep *= this.isRayFacingUp && yStep > 0 ? -1 : 1;
    yStep *= this.isRayFacingDown && yStep < 0 ? -1 : 1;

    let nextVerticalTouchX = xIntercept;
    let nextVerticalTouchY = yIntercept;

    while (
      nextVerticalTouchX >= 0 &&
      nextVerticalTouchX <= this.canvasWidth &&
      nextVerticalTouchY >= 0 &&
      nextVerticalTouchY <= this.canvasHeight
    ) {
      if (
        grid.wallCollison(
          nextVerticalTouchX - (this.isRayFacingLeft ? 1 : 0),
          nextVerticalTouchY
        )
      ) {
        foundVerticalHit = true;
        verticalWallHitX = nextVerticalTouchX;
        verticalWallHitY = nextVerticalTouchY;

        break;
      } else {
        nextVerticalTouchX += xStep;
        nextVerticalTouchY += yStep;
      }
    }

    let horizontalHitDistance = foundHorizontalHit
      ? distanceBetweenPoints(
          player.x,
          player.y,
          horizontalWallHitX,
          horizontalWallHitY
        )
      : Number.MAX_VALUE;

    let verticalHitDistance = foundVerticalHit
      ? distanceBetweenPoints(
          player.x,
          player.y,
          verticalWallHitX,
          verticalWallHitY
        )
      : Number.MAX_VALUE;

    this.wallHitX =
      horizontalHitDistance < verticalHitDistance
        ? horizontalWallHitX
        : verticalWallHitX;
    this.wallHitY =
      horizontalHitDistance < verticalHitDistance
        ? horizontalWallHitY
        : verticalWallHitY;
    this.distance =
      horizontalHitDistance < verticalHitDistance
        ? horizontalHitDistance
        : verticalHitDistance;
    this.wasHitVertical = verticalHitDistance < horizontalHitDistance;
  }

  render(sketch, player) {
    sketch.noStroke();
    sketch.stroke("rgba(255,0,0,0.3)");
    sketch.line(
      scaling(this.scaleFactor, player.x),
      scaling(this.scaleFactor, player.y),
      scaling(this.scaleFactor, this.wallHitX),
      scaling(this.scaleFactor, this.wallHitY)
    );
  }
}
