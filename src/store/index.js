import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: "my-app",
  storage: window.localStorage
});

export default new Vuex.Store({
  state: {
    authenticated: false,
    loggedUser: {}
  },
  getters: {
    isAuthenticated(state) {
      return state.authenticated;
    }
  },
  mutations: {
    authenticateOn(state) {
      state.authenticated = true;
    },
    authenticateOff(state) {
      state.authenticated = false;
      state.loggedUser = {};
    },
    updateLoggedUser(state, loggedUser) {
      state.loggedUser = loggedUser;
    }
  },
  actions: {
    updateAuthenticationStatus(context, loggedIn) {
      if (loggedIn === true) {
        context.commit("authenticateOn");
      } else {
        context.commit("authenticateOff");
      }
    },
    updateLoggedUser(context, loggedUser) {
      context.commit("updateLoggedUser", loggedUser);
    }
  },
  modules: {},
  plugins: [vuexPersist.plugin]
});
