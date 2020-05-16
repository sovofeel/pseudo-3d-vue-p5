<script>
import VueP5 from "vue-p5";
import { mapGetters } from "vuex";
export default {
  name: "Game",
  components: {
    VueP5
  },
  computed: {
    ...mapGetters(["canvasWidth", "canvasHeight"])
  },
  methods: {
    setup(sketch) {
      sketch.resizeCanvas(this.canvasWidth, this.canvasHeight);
    },
    update(sketch) {
      sketch.clear("#212121");
    },
    draw() {},
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
