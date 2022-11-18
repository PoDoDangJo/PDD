import Vue from 'vue'
import Vuex from 'vuex'

// Use Local Storage
import createPersistedState from 'vuex-persistedstate'

import axios from 'axios'

// import Modules
// import accounts from './modules/accounts'
// import articles from './modules/articles'
// import movies from './modules/movies'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'
const TMDB_URL = "https://image.tmdb.org/t/p/w500";

export default new Vuex.Store({
  state: {
    allMovies: [],
    detailModalStatus: { isActive: false, movie: null },
    loginModalStatus: false,
    signUpModalStatus: false,
    token: null,
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    },
  },
  mutations: {
    GET_MOVIES(state, movies) {
      state.allMovies = movies
    },
    DETAIL_MODAL_TOGGLE(state, detailModalStatus) {
      state.detailModalStatus = detailModalStatus
    },
    OPEN_SIGN_UP_MODAL(state) {
      state.signUpModalStatus = true
      state.loginModalStatus = false
    },
    CLOSE_SIGN_UP_MODAL(state) {
      state.signUpModalStatus = false
    },
    OPEN_LOG_IN_MODAL(state) {
      state.loginModalStatus = true
    },
    CLOSE_LOG_IN_MODAL(state) {
      state.loginModalStatus = false
    },
    SAVE_TOKEN(state, token) {
      state.token = token
      // 로그인 성공시 로그인 모달 닫기
      state.loginModalStatus = false
      // sign up && log in 시 홈으로
      // router.push({ name: 'HomeView' })
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
    openDetailModal(context, id) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movie/${id}`
      })
      .then((response) => {
        const isActive = !this.state.detailModalStatus.isActive
        let movie = response.data
        
        movie.backdrop_path = TMDB_URL + movie.backdrop_path
        movie.poster_path = TMDB_URL + movie.poster_path

        const detailModalStatus = { isActive: isActive, movie: movie }
        context.commit('DETAIL_MODAL_TOGGLE', detailModalStatus)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    closeDetailModal(context) {
      const isActive = !this.state.detailModalStatus.isActive
      const detailModalStatus = { isActive: isActive, movie: null }

      context.commit('DETAIL_MODAL_TOGGLE', detailModalStatus)
    },
    openSignUpModal(context) {
      context.commit('OPEN_SIGN_UP_MODAL')
    },
    signUp(context, payload) {
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
        context.commit('TOKEN_ERROR', )
        console.log(error)
      })
    },
    closeSignUpModal(context) {
      context.commit('CLOSE_SIGN_UP_MODAL')
    },
    openLogInModal(context) {
      context.commit('OPEN_LOG_IN_MODAL')
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
        context.commit('TOKEN_ERROR')
        console.log(error)
      })
    },
    closeLogInModal(context) {
      context.commit('CLOSE_LOG_IN_MODAL')
    },
    logOut(context) {
      context.commit('LOG_OUT')
    }
  },
  modules: { 
    // accounts, articles, movies
  },
  plugins: [
    createPersistedState(),
  ],
})