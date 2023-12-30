import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import MfmRenderer from "../../src/library.ts";

createApp(App).use(MfmRenderer, {}).mount("#app");
