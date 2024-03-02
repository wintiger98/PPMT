import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import router from "./router";
import store from "./store.js";
import mitt from "mitt";
import axios from "axios";
import { globalCookiesConfig } from "vue3-cookies";
import { vfmPlugin } from "vue-final-modal";

globalCookiesConfig({
  expireTimes: "30d",
  path: "/",
  domain: "",
  secure: true,
  sameSite: "None",
});

let emitter = mitt();
let app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.config.globalProperties.$axios = axios;
app.use(store);
app.use(router);
app.use(
  vfmPlugin({
    key: "$vfm",
    componentName: "VueFinalModal",
    dynamicContainerName: "ModalsContainer",
  })
);
app.mount("#app");
