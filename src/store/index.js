import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1],
      [1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    tileSize: 56,
    mapNumRows: 16,
    mapNumCols: 15,
    FOVAngle: 60,
    wallStripWidth: 5,
    scaleFactor: 0.15
  },
  getters: {
    grid: state => state.grid,
    tileSize: state => state.tileSize,
    mapNumRows: state => state.mapNumRows,
    mapNumCols: state => state.mapNumCols,
    FOVAngle: state => state.FOVAngle * (Math.PI / 180),
    FOVAngleDeg: state => state.FOVAngle,
    wallStripWidth: state => state.wallStripWidth,
    scaleFactor: state => state.scaleFactor,
    numRays: state => state.numRays,
    canvasWidth: state => state.mapNumRows * state.tileSize,
    canvasHeight: state => state.mapNumCols * state.tileSize
  },
  mutations: {
    SET_FOV_ANGLE(state, angle) {
      state.FOVAngle = angle;
    },
    SET_TILE_SIZE(state, size) {
      state.tileSize = size;
    },
    SET_WALL_STRIP_WIDTH(state, width) {
      state.wallStripWidth = width;
    }
  },
  actions: {},
  modules: {}
});
