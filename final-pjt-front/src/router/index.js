import Vue from "vue";
import VueRouter from "vue-router";

import HomeView from "@/views/HomeView";
import CommunityView from "@/views/CommunityView";
import SearchView from "@/views/SearchView";
import NotFound404View from "@/views/NotFound404View";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/community",
    name: "CommunityView",
    component: CommunityView,
  },
  {
    path: "/search",
    name: "SearchView",
    component: SearchView,
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFound404View,
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
