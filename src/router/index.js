import Vue from "vue";
import VueRouter from "vue-router";
import Game from "../views/Game.vue";
import Settings from "../views/Settings.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Game",
    component: Game
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings
  }
];

const router = new VueRouter({
  routes
});

export default router;
