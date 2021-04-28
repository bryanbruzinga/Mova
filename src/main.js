import Vue from "vue";
import App from "./App.vue";
import store from "@/store/store.js";
import router from "./router";
import Loading from "@/components/Loading";

Vue.config.productionTip = false;

Vue.component("Loading", Loading);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
