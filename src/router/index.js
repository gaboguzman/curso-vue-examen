import Vue from "vue";
import VueRouter from "vue-router";
import StudentsList from "../components/StudentsList.vue";
import StudentDetail from "../components/StudentDetail.vue";
import PageNotFound from "../components/PageNotFound.vue";
import Login from "../components/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: {
      name: "students"
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/students",
    name: "students",
    component: StudentsList
  },
  {
    path: "/students/detail/:username",
    name: "studentDetail",
    component: StudentDetail
  },
  {
    path: "*",
    component: PageNotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
