import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import Hui from 'h_ui''

Vue.config.productionTip = false;

// Vue.use(Hui)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
