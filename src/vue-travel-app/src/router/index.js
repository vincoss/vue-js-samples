import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store.js";

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
    component: Home,
    props: true
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    props: true
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
    path: "/destination/:slug",
    name: "DestinationDetails",
    component: () =>
      import(
        /* webpackChunkName: "DestinationDetails" */ "../views/DestinationDetails.vue"
      ),
    props: true,
    children: [
      {
        path: ":experienceSlug",
        name: "experienceDetails",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "ExperienceDetails" */ "../views/ExperienceDetails.vue"
          )
      }
    ],
    beforeEnter: (to, from, next) => {
      const exists = store.destinations.find(
        destination => destination.slug === to.params.slug
      );
      if (exists) {
        next();
      } else {
        next({ name: "notFound" });
      }
    }
  },
  {
    path: "/user",
    name: "user",
    component: () =>
      import(/* webpackChunkName: "User" */ "../views/User.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/Login.vue")
  },
  {
    path: "/invoices",
    name: "invoices",
    component: () =>
      import(/* webpackChunkName: "Invoices" */ "../views/Invoices"),
    meta: {
      requiresAuth: true
    }
  },
  {
    /* Catch all */
    path: "/404",
    alias: "*",
    name: "notFound",
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "../views/NotFound.vue")
  }
];

const router = new VueRouter({
  linkExactActiveClass: "default-active-link",
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      const position = {};
      if (to.hash) {
        position.selector = to.hash;
        if (to.hash === "#experience") {
          position.offset = { y: 140 };
        }
        if (document.querySelector(to.hash)) {
          return position;
        }

        return false;
      }
    }
  },
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.user) {
      next({
        name: "login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
