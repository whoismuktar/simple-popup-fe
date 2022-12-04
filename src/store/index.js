import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

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
        value:
          "All the text and elements in this popup should be editable and dragable",
      },
      {
        type: "text",
        title: "Text",
        icon: "type",
        value: "",
      },
      {
        type: "input",
        title: "Email",
        icon: "envelope-at",
        value: "",
      },
      {
        type: "cta",
        title: "CTA",
        icon: "menu-button-wide-fill",
        value: "signup now",
      },
    ],
    bgColor: "#e1795f",
    toast: {
      active: false,
      message: "",
    },
  },
  getters: {},
  mutations: {
    updatePopUpData(state, data) {
      state.elOrders = data
    },
    updatePopUpDataUnit(state, unit) {
      const idx = state.elOrders.findIndex((el) => el.type == unit.type);
      state.elOrders[idx].value = unit.value;
    },
    updateBgColor(state, color) {
      state.bgColor = color;
    },
  },
  actions: {
      //eslint-disable-next-line
    async getPopupSettings({commit}) {
      return axios
        .get("/popup-settings")
        .then((response) => {
          const settings = response.data.settings || {};

          //eslint-disable-next-line
          const { data, bgColor } = settings;

          if (Object.keys(settings).length) {
            if (data) {
              commit("updatePopUpData", data);
            }
            if (bgColor) {
              commit("updateBgColor", bgColor);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
      //eslint-disable-next-line
    async savePopupSettings({ commit, state }) {
      const settings = {
        data: state.elOrders,
        bgColor: state.bgColor,
      };

      return axios
        .post("/popup-settings", settings)
        .then((response) => {
          commit("updatePopUpData", response.data.settings.data);
          commit("updateBgColor", response.data.settings.bgColor);
          state.toast.active = true;
          state.toast.message = "Popup save successfuly!";
          state.toast.color = "#4BB543";

          return setTimeout(() => {
            state.toast.active = false;
            state.toast.message = "";
          }, 3000);
        })
        .catch((err) => {
          console.log(err, err.response);
          return err.response;
        });
    },
    savePopUpData({ commit }, data) {
      commit("updatePopUpData", data);
    },
    savePopUpDataUnit({ commit }, unit) {
      commit("updatePopUpDataUnit", unit);
    },
    saveBgColor({ commit }, color) {
      commit("updateBgColor", color);
    },
  },
  modules: {},
});
