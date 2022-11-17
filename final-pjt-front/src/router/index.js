import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '@/views/HomeView'

import LoginView from '@/views/accounts/LoginView'
import SignUpView from '@/views/accounts/SignUpView'
import ProfileView from '@/views/accounts/ProfileView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },
  {
    path: '/profile',
    name: 'ProfileView',
    component: ProfileView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
