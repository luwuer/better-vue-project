import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// import(/* webpackChunkName: "jquery" */'jquery')
// import _ from 'lodash/join'

import Hui from 'h_ui/dist/h_ui.min.js'

Vue.config.productionTip = false;

Vue.use(Hui)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
