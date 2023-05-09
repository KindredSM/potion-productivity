import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import { createPinia } from "pinia";
import { usePagesStore } from "./store/pageStore";
import { auth, onAuthStateChanged } from "./firebase";

const pinia = createPinia();

const app = createApp(App).use(pinia).use(router).use(autoAnimatePlugin);

app.mount("#app");
