<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <img src="../assets/404.jpg" />
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  mounted() {
    console.log("page not found");
  }
};
</script>
