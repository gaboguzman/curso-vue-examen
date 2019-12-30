import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: false
  },
  getters: {},
  mutations: {
    authenticateOn(state) {
      state.authenticated = true;
    },
    authenticateOff(state) {
      state.authenticated = false;
    }
  },
  actions: {
    updateAuthenticationStatus(context, loggedIn) {
      console.log("loggedIn en action: " + loggedIn);
      if (loggedIn === true) {
        context.commit("authenticateOn");
      } else {
        context.commit("authenticateOff");
      }
    }
  },
  modules: {}
});
