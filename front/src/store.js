import { createStore } from "vuex";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

const store = createStore({
  state() {
    return {
      host: "http://127.0.0.1:8000",
      isLogin: false,
      email: "",
      viewType: 1,
      isModal: false,
    };
  },
  mutations: {
    setIsLogin(state, value) {
      state.isLogin = value;
    },
    setEmail(state, value) {
      state.email = value;
    },
    setViewType(state, value) {
      state.viewType = value;
    },
    setIsModal(state, value) {
      state.isModal = value;
    },
  },
  actions: {
    login({ commit }, payload) {
      commit("setIsLogin", true);
      commit("setEmail", payload.email);
      cookies.set("token", payload.accessToken);
    },
    loadUser({ commit }, email) {
      commit("setIsLogin", true);
      commit("setEmail", email);
    },
    logout({ commit }) {
      commit("setIsLogin", false);
      commit("setEmail", "");
      cookies.remove("token");
    },
    changeViewType({ commit }, viewType) {
      commit("setViewType", viewType);
    },
    openModal({ commit }) {
      commit("setIsModal", true);
    },
    closeModal({ commit }) {
      commit("setIsModal", false);
    },
  },
});

export default store;
