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
              <ValidationProvider v-slot="{ errors }" rules="required">
                <input
                  id="username"
                  type="text"
                  name="username"
                  v-model="input.username"
                  placeholder="Username"
                  class="form-control"
                />
                <label class="validate-label">{{ errors[0] }}</label>
              </ValidationProvider>
            </div>
          </div>
          <div id="login" class="form-group row">
            <label for="password" class="col-sm-6 col-form-label">
              Contraseña:
            </label>
            <div class="col-sm-8">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <input
                  id="password"
                  type="password"
                  name="password"
                  v-model="input.password"
                  placeholder="Password"
                  class="form-control"
                />
                <label class="validate-label">{{ errors[0] }}</label>
              </ValidationProvider>
            </div>
          </div>
          <div class="row form-group login-error-label">
            <div class="col">
              <label class="validate-label" v-show="loginError">
                Usuario o contraseña incorrectos.
              </label>
            </div>
          </div>
          <div id="login" class="form-group row">
            <div class="col-sm-10">
              <button
                class="btn btn-primary"
                v-on:click="login"
                :disabled="!input.username.length || !input.password.length"
              >
                Iniciar sesión
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
    if (["", null, undefined].indexOf(value) === -1) {
      return true;
    }
    return "Campo obligatorio";
  },
  computesRequired: true
});

export default {
  name: "Login",
  data() {
    return {
      loginError: false,
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
      if (this.input.username != "" && this.input.password != "") {
        axios
          .get("http://localhost:3000/students?username=" + this.input.username)
          .then(response => {
            if (response.data.length) {
              if (this.input.password == response.data[0].password) {
                this.$store.dispatch("updateAuthenticationStatus", true);
                this.$store.dispatch("updateLoggedUser", response.data[0]);
                this.$router.push({ name: "students" });
              } else {
                this.loginError = true;
                console.log("The username and / or password is incorrect");
              }
            } else {
              this.loginError = true;
              console.log("The username and / or password is incorrect");
            }
          })
          .catch(function(error) {
            console.log(error);
            console.log("The username and / or password is incorrect");
            this.loginError = true;
          });
      } else {
        console.log("A username and password must be present");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.validate-label {
  color: red;
  margin-bottom: 0%;
}

.form-group {
  margin-bottom: 0%;
}

.login-error-label {
  margin-bottom: 0.5rem;
}
</style>
