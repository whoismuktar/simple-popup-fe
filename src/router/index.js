import Vue from "vue"
import VueRouter from "vue-router"
import HomeView from "../views/HomeView"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/popups/",
    name: "activePopup",
    component: () => import("../components/PopUps/RenderPopup")
  },
  {
    path: "*",
    name: "about",
    component: () => "<template><span>404</span></template>"
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
