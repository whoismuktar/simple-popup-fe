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
    elAssets: [
      {
        type: "icon",
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
    footNote: "No credit card required. No Surprises",
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
    },
    updateBgColor(state, color) {
      state.bgColor = color;
    },
    updatefootNote(state, footNote) {
      state.footNote = footNote;
    },
    updateUnitPosition(state, data) {
      const {position, idx} = data
      state.elOrders[idx].position = position
    },
  },
  actions: {
    async getPopupSettings({commit}) {
      return axios
        .get("/popup-settings")
        .then((response) => {
          const settings = response.data.settings || {};

          const { data, bgColor, footNote } = settings;

          console.log(footNote);

          if (Object.keys(settings).length) {
            if (Object.keys(data).length) {
              commit("updatePopUpData", data);
            }
            if (bgColor) {
              commit("updateBgColor", bgColor );
            }
            if (footNote) {
              commit("updatefootNote", footNote );
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
          commit("updatefootNote", response.data.settings.footNote);

          state.toast.active = true;
          state.toast.message = "Popup save successfuly!";
          state.toast.color = "#4BB543";

          return setTimeout(() => {
            state.toast.active = false;
            state.toast.message = "";
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
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
    saveFootNote({ commit }, footNote) {
      commit("updatefootNote", footNote);
    },
    saveUnitPosition({ commit }, data) {
      commit("updateUnitPosition", data);
    },
  },
  modules: {},
});
