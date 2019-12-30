<template>
  <div class="row">
    <div class="col-sm-12 d-flex justify-content-center">
      <div class="card">
        <div class="card-body">
          <div id="login" class="form-group row">
            <label for="username" class="col-sm-6 col-form-label">
              Usuario:
            </label>
            <div class="col-sm-8">
              <ValidationProvider v-slot="v" rules="required">
                <input
                  id="username"
                  type="text"
                  name="username"
                  v-model="input.username"
                  placeholder="Username"
                  class="form-control"
                />
                <span>{{ v.errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div id="login" class="form-group row">
            <label for="password" class="col-sm-6 col-form-label">
              Contraseña:
            </label>
            <div class="col-sm-8">
              <input
                id="password"
                type="password"
                name="password"
                v-model="input.password"
                placeholder="Password"
                class="form-control"
              />
            </div>
          </div>
          <div id="login" class="form-group row">
            <div class="col-sm-10">
              <button class="btn btn-primary" v-on:click="login">
                Ingresar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { ValidationProvider } from "vee-validate";
import { extend } from "vee-validate";

extend("required", {
  validate(value) {
    return {
      required: true,
      valid: ["", null, undefined].indexOf(value) === -1
    };
  },
  computesRequired: true
});

export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "",
        password: ""
      }
    };
  },
  components: {
    ValidationProvider
  },
  methods: {
    login() {
      this.$validator.validateAll();
      if (this.input.username != "" && this.input.password != "") {
        axios
          .get("http://localhost:3000/students?username=" + this.input.username)
          .then(response => {
            if (response.data.length) {
              if (this.input.password == response.data[0].password) {
                this.$store.dispatch("updateAuthenticationStatus", true);
                this.$router.replace({ name: "students" });
              } else {
                console.log("The username and / or password is incorrect");
              }
            } else {
              console.log("The username and / or password is incorrect");
            }
          })
          .catch(function(error) {
            console.log(error);
            console.log("The username and / or password is incorrect");
          });
      } else {
        console.log("A username and password must be present");
      }
    }
  }
};
</script>
