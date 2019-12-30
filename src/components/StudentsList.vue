<template>
  <div class="container">
    <div class="row">
      <div class="col bg-light">
        Listado de estudiantes
      </div>
    </div>
    <p />
    <div class="row">
      <div class="col border bg-light">Nro</div>
      <div class="col border bg-light">Nombres</div>
      <div class="col border bg-light">Usuario</div>
      <div class="col border bg-light">Acciones</div>
    </div>
    <div
      v-bind:class="getStudentSpecialClass(student)"
      v-for="student in studentsList"
      :key="student.id"
    >
      <div class="col border">
        {{ student.id }}
      </div>
      <div class="col border">
        {{ student | fullName }}
      </div>
      <div class="col border">
        {{ student.username }}
      </div>
      <div class="col border">
        <router-link
          :to="{
            name: 'studentDetail',
            params: { username: student.username }
          }"
        >
          Ver detalle
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: function() {
    return {
      studentsList: null
    };
  },
  filters: {
    fullName(student) {
      return `${student.name} ${student.lastName}`;
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    loggedUser() {
      return this.$store.state.loggedUser;
    }
  },
  methods: {
    getStudentSpecialClass(student) {
      if (
        student.name === this.loggedUser.name &&
        student.lastName === this.loggedUser.lastName
      ) {
        return "row bg-info text-white";
      } else {
        return "row";
      }
    }
  },
  mounted: function() {
    axios.get("http://localhost:3000/students").then(response => {
      this.studentsList = response.data;
    });
  }
};
</script>
<style lang="scss" scoped>
.bg-info .col a {
  font-weight: bold;
  color: #fff;
}
</style>
