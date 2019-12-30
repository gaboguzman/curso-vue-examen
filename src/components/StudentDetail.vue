<template>
  <div class="col-sm-4" v-if="student">
    <div class="row">
      <div class="col bg-light">
        <label>Detalle del estudiante</label>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label>Nombre:</label>&nbsp;
        <label>{{ student.name }}</label>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label>Apellido:</label>&nbsp;
        <label>{{ student.lastName }}</label>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label>E-mail:</label>&nbsp;
        <label>{{ student.email }}</label>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label>Usuario:</label>&nbsp;
        <label>{{ student.username }}</label>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button class="btn btn-primary" @click="goBack()">Regresar</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: function() {
    return {
      student: null
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  mounted: function() {
    axios
      .get(
        "http://localhost:3000/students?username=" + this.$route.params.username
      )
      .then(response => {
        this.student = response.data[0];
      });
  }
};
</script>
<style lang="scss" scoped>
.col label:first-child {
  font-weight: bold;
}
</style>
