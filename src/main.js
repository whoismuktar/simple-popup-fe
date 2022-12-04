import Vue from "vue"
import App from "./App.vue"
import store from "./store"
import "bootstrap-icons/font/bootstrap-icons.css";
import router from "./router"
import { DraggablePlugin } from '@braks/revue-draggable';


Vue.config.productionTip = false
Vue.use(DraggablePlugin)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app")
