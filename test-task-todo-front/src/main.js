import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  List,
  Card,
  Pagination,
  Select,
  Menu,
  Form,
  Button,
  Input,
} from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "./assets/main.css";

Vue.use(List);
Vue.use(Pagination);
Vue.use(Select);
Vue.use(Menu);
Vue.use(Card);
Vue.use(Form);
Vue.use(Button);
Vue.use(Input);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
