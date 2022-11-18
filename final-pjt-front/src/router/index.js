import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '@/views/HomeView'
import ArticleView from '@/views/ArticleView'
import NotFound404View from "@/views/NotFound404View";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/articles',
    name: 'ArticleView',
    component: ArticleView
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
