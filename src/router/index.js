import Vue from "vue"
import VueRouter from "vue-router"
import HomeView from "../views/HomeView"
import Popup from "../components/PopUps/RenderPopup"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "activePopup",
    component: Popup
  },
  {
    path: "/editor",
    name: "editor",
    component: HomeView
  },
  {
    path: "*",
    name: "404",
    component: () => HomeView
  },
]

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
