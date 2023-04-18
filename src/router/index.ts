import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Page from "../views/Page.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
    props: true,
  },
  {
    path: "/page/:id",
    name: "Page",
    component: Page,
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
