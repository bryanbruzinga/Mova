import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import PaisSelecionado from "../views/PaisSelecionado.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/:pais",
      name: "paisSelecionado",
      component: PaisSelecionado,
    },
  ],
});

export default router;
