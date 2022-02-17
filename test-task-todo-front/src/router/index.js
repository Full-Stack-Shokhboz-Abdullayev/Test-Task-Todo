import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/authorize",
    name: "Auth",
    meta: {
      logoutOnly: true,
    },
    component: () =>
      import(/* webpackChunkName: "authorize" */ "../views/Authorize.vue"),
  },
  {
    path: "/edit/:_id",
    name: "Edit",
    meta: {
      loginOnly: true,
    },
    component: () => import(/* webpackChunkName: "edit" */ "../views/Edit.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  setTimeout(() => {
    if (to.meta?.logoutOnly && !store.state.loggedIn) {
      next();
    } else if (to.meta?.logoutOnly && store.state.loggedIn) {
      next({
        name: "Home",
      });
    } else if (to.meta?.loginOnly && !store.state.loggedIn) {
      next({
        name: "Auth",
      });
    } else {
      next();
    }
  }, 0);
});

export default router;
