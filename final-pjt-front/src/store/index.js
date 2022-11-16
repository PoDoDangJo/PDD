import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'
const TMDB_URL = "https://image.tmdb.org/t/p/w500";

export default new Vuex.Store({
  state: {
    movies: [],
    movie: null,
  },
  getters: {
  },
  mutations: {
    GET_MOVIES(state, movies) {
      state.movies = movies
    },
    GET_MOVIE_DETAIL(state, movie) {
      state.movie = movie
    }
  },
  actions: {
    getMovies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/`,
      })
      .then((response) => {
        // console.log(response, context)
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
    getMovieDetail(context, id) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movie/${id}`
      })
      .then((response) => {
        let movie = response.data
        
        movie.backdrop_path = TMDB_URL + movie.backdrop_path
        movie.poster_path = TMDB_URL + movie.poster_path

        context.commit('GET_MOVIE_DETAIL', movie)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  modules: {
  }
})
