<script>
import VueP5 from "vue-p5";
import { mapGetters } from "vuex";

import Map from "@/game/Map";
import Player from "@/game/Player";
import Ray from "@/game/Ray";

import { normalizeAngle } from "@/helpers/index";

export default {
  name: "Game",
  components: {
    VueP5
  },
  data: () => {
    return {
      map: {},
      player: {},
      rays: [],
      numRays: 0
    };
  },
  computed: {
    ...mapGetters([
      "canvasWidth",
      "canvasHeight",
      "grid",
      "mapNumRows",
      "mapNumCols",
      "tileSize",
      "scaleFactor",
      "FOVAngle",
      "wallStripWidth"
    ])
  },
  methods: {
    render3DProjectedWalls(sketch) {
      for (let i = 0; i < this.numRays; i++) {
        let ray = this.rays[i];
        let rayDistance =
          ray.distance * Math.cos(ray.rayAngle - this.player.rotationAngle);

        let wallStripHeight =
          ((this.tileSize / rayDistance) * (this.canvasWidth / 2)) /
          Math.tan(this.FOVAngle / 2);

        let color = ray.wasHitVertical ? 255 : 180;
        sketch.fill(`rgba(${color},${color},${color}, 1)`);
        sketch.noStroke();

        sketch.rect(
          i * this.wallStripWidth,
          this.canvasHeight / 2 - wallStripHeight / 2,
          this.wallStripWidth,
          wallStripHeight
        );
      }
    },
    castAllRays() {
      this.rays = [];
      let rayAngle = this.player.rotationAngle - this.FOVAngle / 2;
      for (let i = 0; i < this.numRays; i++) {
        let ray = new Ray({
          rayAngle: normalizeAngle(rayAngle),
          tileSize: this.tileSize,
          canvasWidth: this.canvasWidth,
          canvasHeight: this.canvasHeight,
          scaleFactor: this.scaleFactor
        });
        ray.cast(this.player, this.map);
        this.rays.push(ray);

        rayAngle += this.FOVAngle / this.numRays;
      }
    },
    setup(sketch) {
      sketch.resizeCanvas(this.canvasWidth, this.canvasHeight);
      this.map = new Map({
        grid: this.grid,
        canvasWidth: this.canvasWidth,
        canvasHeight: this.canvasHeight,
        mapNumRows: this.mapNumRows,
        mapNumCols: this.mapNumCols,
        tileSize: this.tileSize,
        scaleFactor: this.scaleFactor
      });

      this.player = new Player({
        canvasWidth: this.canvasWidth,
        canvasHeight: this.canvasHeight,
        scaleFactor: this.scaleFactor
      });
    },
    update(sketch) {
      sketch.clear("#212121");
      this.player.update(this.map);
      this.castAllRays();
    },
    draw(sketch) {
      this.numRays = this.canvasWidth / this.wallStripWidth;
      this.update(sketch);
      this.render3DProjectedWalls(sketch);
      this.map.render(sketch);

      for (let ray of this.rays) {
        ray.render(sketch, this.player);
      }

      this.player.render(sketch);
    },
    keypressed({ keyCode }) {
      switch (keyCode) {
        case 16: {
          this.player.moveSpeed *= 2.5;
          break;
        }
        case 87: {
          this.player.walkDirection = +1;
          break;
        }
        case 83: {
          this.player.walkDirection = -1;
          break;
        }
        case 68: {
          this.player.turnDirection = +1;
          break;
        }
        case 65: {
          this.player.turnDirection = -1;
          break;
        }
        default: {
          break;
        }
      }
    },
    keyreleased({ keyCode }) {
      switch (keyCode) {
        case 16: {
          this.player.moveSpeed /= 2.5;
          break;
        }
        case 87: {
          this.player.walkDirection = 0;
          break;
        }
        case 83: {
          this.player.walkDirection = 0;
          break;
        }
        case 68: {
          this.player.turnDirection = 0;
          break;
        }
        case 65: {
          this.player.turnDirection = 0;
          break;
        }
        default: {
          break;
        }
      }
    }
  }
};
</script>

<template>
  <div class="game">
    <vue-p5 v-on="{ setup, draw, keypressed, keyreleased, update }" />
  </div>
</template>
