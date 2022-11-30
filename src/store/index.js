import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    elOrders: [
      {
        title: "Text",
        icon: "type"
      },
      {
        title: "Email",
        icon: "envelope-at"
      },
      {
        title: "CTA",
        icon: "menu-button-wide-fill"
      },
      {
        title: "Stars",
        icon: "star-fill"
      },
    ]
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
