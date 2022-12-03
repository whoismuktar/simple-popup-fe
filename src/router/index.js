import Vue from "vue"
import VueRouter from "vue-router"
import HomeView from "../views/HomeView"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "activePopup",
    component: () => import("../components/PopUps/RenderPopup")
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
