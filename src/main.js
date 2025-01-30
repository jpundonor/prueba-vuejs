import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import Vuikit from "vuikit";
import VuikitIcons from "@vuikit/icons";

import "@vuikit/theme";
import "@vuikit/icons";


const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

app.use(Vuikit);
app.use(VuikitIcons);

app.mount("#app");
