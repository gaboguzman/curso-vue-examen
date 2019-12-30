<template>
  <div id="app">
    <div id="nav" class="row alert alert-success" v-show="isAuthenticated">
      <div class="col text-left" v-show="isAuthenticated">
        <label class="font-weight-bold">
          Bienvenido {{ displayedLoggedUser }}
        </label>
      </div>
      <div class="col text-right">
        <router-link
          v-show="isAuthenticated"
          to="/login"
          v-on:click.native="logout()"
          replace
        >
          Cerrar sesión
        </router-link>
      </div>
    </div>
    <router-view @isAuthenticated="isAuthenticated" />
  </div>
</template>
<script>
export default {
  data: function() {
    return {};
  },
  computed: {
    isAuthenticated() {
      console.log("this.$store.getters.isAuthenticated: " + this.$store.getters.isAuthenticated);
      return this.$store.getters.isAuthenticated;
    },
    loggedUser() {
      return this.$store.state.loggedUser;
    },
    displayedLoggedUser() {
      return this.loggedUser.name + " " + this.loggedUser.lastName;
    }
  },
  mounted() {
    console.log("isAuthenticated: " + this.isAuthenticated);
    if (!this.isAuthenticated) {
      console.log("Redirect to login");
      this.$router.replace({ name: "login" });
    }
  },
  methods: {
    setIsAuthenticated(status) {
      this.$store.dispatch("updateAuthenticationStatus", status);
    },
    logout() {
      this.$store.dispatch("updateAuthenticationStatus", false);
    }
  }
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;
  }
}
</style>
