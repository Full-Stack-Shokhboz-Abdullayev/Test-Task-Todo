import Vue from "vue";
import Vuex from "vuex";
import axiosService from "../services/axios.service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    total: 0,
    loggedIn: false,
    user: {
      username: "",
      password: "",
    },
  },
  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    SET_TOTAL(state, total) {
      state.total = total;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_AUTH(state, loggedIn) {
      state.loggedIn = loggedIn;
    },
    UPDATE_TASK(state, task) {
      Vue.set(
        state.tasks,
        state.tasks.findIndex((t) => t._id === task._id),
        task
      );
    },
  },
  actions: {
    async AUTHORIZE(ctx, { username, password }) {
      const { data: user } = await axiosService.post("/auth", {
        username,
        password,
      });

      const userAuthData = window.btoa(user.username + ":" + user.password);
      localStorage.setItem("userAuthData", JSON.stringify(userAuthData));

      ctx.commit("SET_USER", { username, password });
      ctx.commit("SET_AUTH", true);
    },
    async PERSIST_USER(ctx) {
      const { data: user } = await axiosService.get("/auth");

      ctx.commit("SET_USER", {
        username: user.username,
        password: user.password,
      });
      ctx.commit("SET_AUTH", true);
    },
    async LOGOUT({ commit }) {
      localStorage.removeItem("userAuthData");
      commit("SET_USER", {
        username: "",
        password: "",
      });
      commit("SET_AUTH", false);
    },
    async GET_TASKS({ commit }, sorts) {
      const nullSafe = Object.keys(sorts)
        .filter((key) => sorts[key] !== null)
        .map((key) => key + "=" + sorts[key]);

      const url = "/tasks?" + nullSafe.join("&");
      const {
        data: { tasks, total },
      } = await axiosService.get(url);
      commit("SET_TASKS", tasks);
      commit("SET_TOTAL", total);
    },

    async ADD_TASK(ctx, task) {
      await axiosService.post("/tasks", task);
    },
    async UPDATE_TASK(ctx, task) {
      const { data: updatedTask } = await axiosService.patch(
        "/tasks/" + task._id,
        task.values
      );
      ctx.commit("UPDATE_TASK", updatedTask);
    },
  },
  modules: {},
});
