<template>
  <div id="app">
    <div id="nav">
      <router-link
        v-show="authenticated"
        to="/login"
        v-on:click.native="logout()"
        replace
      >
        Logout
      </router-link>
    </div>
    <router-view @authenticated="authenticated" />
  </div>
</template>
<script>
export default {
  data: function() {
    return {};
  },
  computed: {
    authenticated() {
      return this.$store.state.authenticated;
    }
  },
  mounted() {
    console.log("authenticated en mounted de App.vue: " + this.authenticated);
    if (!this.authenticated) {
      this.$router.replace({ name: "login" });
    }
  },
  methods: {
    setAuthenticated(status) {
      console.log("set authenticated status: " + status);
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
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
