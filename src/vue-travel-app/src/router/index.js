import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
/*
import Hawaii from "../views/Hawaii.vue";
import Jamaica from "../views/Jamaica.vue";
import Panama from "../views/Panama.vue";
*/

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  /*
  {
    path: "/brazil",
    name: "brazil",
    component: () =>
      import("../views/Brazil.vue")
  },
  {
    path: "/hawaii",
    name: "hawaii",
    component: Hawaii
  },
  {
    path: "/jamaica",
    name: "jamaica",
    component: Jamaica
  },
  {
    path: "/panama",
    name: "panama",
    component: Panama
  },
  */
  {
    path: "/details/:id",
    name: "DestinationDetails",
    component: () =>
      import(/* webpackChunkName: "DestinationDetails" */ "../views/DestinationDetails.vue")
  }
];

const router = new VueRouter({
  linkExactActiveClass: "default-active-link",
  routes
});

export default router;
