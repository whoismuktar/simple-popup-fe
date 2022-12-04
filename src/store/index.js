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
        type: "icon",
        position: "translate(0px, 0px)",
        value: "star-fill",
        bound: "",
      },
      {
        type: "text",
        position: "translate(0px, 0px)",
        bound: "",
        value:
          "All the text and elements in this popup should be editable and dragable",
      },
      {
        type: "input",
        position: "translate(0px, 0px)",
        bound: "",
        value: "",
      },
      {
        type: "cta",
        position: "translate(0px, 0px)",
        bound: "",
        value: "signup now",
      },
    ],
    elOrder: [
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
    elAssets: [
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
      state.elOrders.push(unit)
    },
    deletePopUpUnit(state, idx) {
      state.elOrders.splice(idx, 1)
      console.log(state.elOrders.length);
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
              // commit("updatePopUpData", data);
            }
            if (bgColor) {
              // commit("updateBgColor", bgColor);
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
    removePopUpUnit({ commit }, idx) {
      commit("deletePopUpUnit", idx);
    },
    saveBgColor({ commit }, color) {
      commit("updateBgColor", color);
    },
  },
  modules: {},
});
