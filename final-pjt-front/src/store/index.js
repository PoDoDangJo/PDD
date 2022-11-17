import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import router from '../router'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'
const TMDB_URL = "https://image.tmdb.org/t/p/w500";

export default new Vuex.Store({
  state: {
    movies: [],
    modalStatus: { isActive: false, movie: null },
    token: null,
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    },
    backImages(state) {
      const movies = state.movies.filter((movie) => {
        if (movie.popularity >= 100) {
          return movie
        }
      })
      return movies
    }
  },
  mutations: {
    GET_MOVIES(state, movies) {
      state.movies = movies
    },
    MODAL_TOGGLE(state, modalStatus) {
      state.modalStatus = modalStatus
    },
    SAVE_TOKEN(state, token) {
      state.token = token
      // sign up && log in 시 홈으로
      router.push({ name: 'HomeView' })
    },
    LOG_OUT(state) {
      state.token = null
      localStorage.removeItem('token')

      location.reload
    }
  },
  actions: {
    getMovies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/`,
        // headers: {
        //   // 인증 여부를 확인하기 위한 Token을 담아서 요청
        //   Authorization: `Token ${ context.state.token }`
        // }
      })
      .then((response) => {
        // 이미지를 불러오기 위한 URL 추가 작업
        const movies = response.data.map((movie) => {
          movie.backdrop_path = TMDB_URL + movie.backdrop_path
          movie.poster_path = TMDB_URL + movie.poster_path
          return movie
        })
        context.commit('GET_MOVIES', movies)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    openModal(context, id) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movie/${id}`
      })
      .then((response) => {
        const isActive = !this.state.modalStatus.isActive
        let movie = response.data
        
        movie.backdrop_path = TMDB_URL + movie.backdrop_path
        movie.poster_path = TMDB_URL + movie.poster_path

        const modalStatus = { isActive: isActive, movie: movie }
        context.commit('MODAL_TOGGLE', modalStatus)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    closeModal(context) {
      const isActive = !this.state.modalStatus.isActive
      const modalStatus = { isActive: isActive, movie: null }

      context.commit('MODAL_TOGGLE', modalStatus)
    },
    signUp(context, payload) {
      // const username = payload.username
      // const password1 = payload.password1
      // const password2 = payload.password2
      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username: payload.username,
          password1: payload.password1,
          password2: payload.password2,
        }
      })
      .then((response) => {
        context.commit('SAVE_TOKEN', response.data.key)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    logIn(context, payload) {
      const username = payload.username
      const password = payload.password
      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username, password
        }
      })
      .then((response) => {
        console.log(response)
        context.commit('SAVE_TOKEN', response.data.key)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    logOut(context) {
      context.commit('LOG_OUT')
    }
  },
  modules: {
  },
  plugins: [
    createPersistedState(),
  ],
})
