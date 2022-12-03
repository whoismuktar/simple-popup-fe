import Vue from "vue"
import Vuex from "vuex"
import axios from "axios";

Vue.use(Vuex)

process.env.NODE_ENV === "development"
  ? (axios.defaults.baseURL = "http://localhost:3001/")
  : (axios.defaults.baseURL = "https://simple-popup.onrender.com/");


export default new Vuex.Store({
  state: {
    elOrders: [
      {
        type: "icons",
        title: "Stars",
        icon: "star-fill",
      },
      {
        type: "text",
        title: "Text",
        icon: "type",
      },
      {
        type: "input",
        title: "Email",
        icon: "envelope-at",
      },
      {
        type: "cta",
        title: "CTA",
        icon: "menu-button-wide-fill",
      },
    ],
    bgColor: "#e1795f"
  },
  getters: {
  },
  mutations: {
    updatePopUpData(state, data) {
      state.elOrders = data
    },
    updateBgColor(state, color) {
      state.bgColor = color
    },
  },
  actions: {
    async getPopupSettings({ commit }) {
      return axios.get("/popup-settings")
      .then((response) => {  
        const settings = response.data || {}

        const {data, bgColor} = settings

        if (Object.keys(settings).length) {
          if (data) {
            commit('updatePopUpData', data)
          }
          if (bgColor) {
            commit('updateBgColor', bgColor)
          }
        }

      })
      .catch((err) => {
        return err.response;
      });
    },
    async savePopupSettings({ commit, state }) {
      const settings = {
        data: state.elOrders,
        bgColor: state.bgColor,
      }

      return axios.post("/popup-settings", settings)
      .then((response) => {
        commit('updatePopUpData', response.data)
      })
      .catch((err) => {
        return err.response;
      });
    },
    savePopUpData({commit}, data) {
      commit("updatePopUpData", data)
      console.log("data updated");
    },
    saveBgColor({commit}, color) {
      commit("updateBgColor", color)
    },
  },
  modules: {
  }
})
