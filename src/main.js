import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "bootstrap-icons/font/bootstrap-icons.css";
import router from "./router";
import { DraggablePlugin } from "@braks/revue-draggable";

Vue.config.productionTip = false;
Vue.use(DraggablePlugin);

// Environment dependent mounting
let tag = "";
process.env.NODE_ENV === "development" ? tag = "#app" : tag = "#emPop";

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount(tag);
