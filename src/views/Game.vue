<script>
import VueP5 from "vue-p5";
import { mapGetters } from "vuex";

import Map from "@/game/Map";

export default {
  name: "Game",
  components: {
    VueP5
  },
  data: () => {
    return {
      map: {}
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
      "scaleFactor"
    ])
  },
  methods: {
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

      // console.log(this.map);
    },
    update(sketch) {
      sketch.clear("#212121");
    },
    draw(sketch) {
      this.map.render(sketch);
    },
    keypressed() {},
    keyreleased() {}
  }
};
</script>

<template>
  <div class="game">
    <vue-p5 v-on="{ setup, draw, keypressed, keyreleased, update }" />
  </div>
</template>
