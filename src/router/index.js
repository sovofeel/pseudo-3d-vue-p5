import Vue from "vue";
import VueRouter from "vue-router";
import Game from "../views/Game.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Game",
    component: Game
  }
];

const router = new VueRouter({
  routes
});

export default router;
