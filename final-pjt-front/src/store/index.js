import Vue from "vue";
import Vuex from "vuex";

// import drf from "@/api/drf";

// Use Local Storage
import createPersistedState from "vuex-persistedstate";
import router from "../router/index";

import axios from "axios";

// import Modules
// import accounts from './modules/accounts'
// import articles from './modules/articles'
// import movies from './modules/movies'

Vue.use(Vuex);

const API_URL = "http://127.0.0.1:8000";
const TMDB_URL = "https://image.tmdb.org/t/p/w500";

export default new Vuex.Store({
  state: {
    allMovies: [],
    popularityMovies: [],
    allReviews: [],
    isModal: null,
    movieDetailModalStatus: { isActive: false, movie: null },
    reviewDetailModalStatus: { isActive: false, review: null },
    createReviewModalStatus: false,
    loginModalStatus: false,
    signUpModalStatus: false,
    profileModalStatus: false,
    token: null,
    isCommunity: null,
    username: null,
    userInfo: null
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false;
    },
    Movie_Last_1(state) {
      return state.allMovies.slice(0, 5);
    },
    Movie_Last_2(state) {
      return state.allMovies.slice(5, 10);
    },
    isCommunity(state) {
      return state.isCommunity ? true : false;
    },
    reviews(state) {
      return state.allReviews;
    },
  },
  mutations: {
    GET_MOVIES(state, movies) {
      state.allMovies = movies;
    },
    GET_POPULERITY_MOVIES(state, movies) {
      state.popularityMovies = movies;
    },
    GET_USER_PROFILE(state, userInfo) {
      state.userInfo = userInfo
      console.log(userInfo)
    },
    DETAIL_MODAL_TOGGLE(state, movieDetailModalStatus) {
      state.isModal = !state.isModal;
      state.movieDetailModalStatus = movieDetailModalStatus;
    },
    REVIEW_MODAL_TOGGLE(state, reviewDetailModalStatus) {
      state.isModal = !state.isModal;
      state.reviewDetailModalStatus = reviewDetailModalStatus;
    },
    OPEN_CREATE_REVIEW_MODAL(state) {
      state.isModal = true;
      state.createReviewModalStatus = true;
    },
    GET_REVIEWS(state, reviews) {
      state.allReviews = reviews;
    },
    CREATE_REVIEWS(state, review) {
      state.allReviews.push(review);
      state.createReviewModalStatus = false;
      state.isModal = false;
    },
    CLOSE_CREATE_REVIEW_MODAL(state) {
      state.isModal = false;
      state.createReviewModalStatus = false;
    },
    UPDATE_REVIEW(state, reviewItem) {
      state.allReviews = state.allReviews.reverse().map((review) => {
        if (review.id == reviewItem.id) {
          review = reviewItem
        }
        return review
      })
    },
    DELETE_REVIEW(state, review_id) {

      console.log(state.allReviews)
      console.log(review_id)

      state.isModal = false;
      state.reviewDetailModalStatus = { isActive: false, review: null };
    },
    OPEN_SIGN_UP_MODAL(state) {
      state.isModal = true;
      state.signUpModalStatus = true;
      state.loginModalStatus = false;
    },
    CLOSE_SIGN_UP_MODAL(state) {
      state.isModal = false;
      state.signUpModalStatus = false;
    },
    OPEN_LOG_IN_MODAL(state) {
      state.isModal = true;
      state.loginModalStatus = true;
    },
    CLOSE_LOG_IN_MODAL(state) {
      state.isModal = false;
      state.loginModalStatus = false;
    },
    SAVE_TOKEN(state, userdata) {
      state.username = userdata.username;

      state.isModal = false;
      state.token = userdata.token;

      // 로그인 성공시 로그인 및 회원가입 모달 닫기
      state.loginModalStatus = false;
      state.signUpModalStatus = false;
      // sign up && log in 시 홈으로
      // router.push({ name: 'HomeView' })
    },
    LOG_OUT(state) {
      state.token = null;
      localStorage.removeItem("token");

      location.reload;
    },
    OPEN_PROFILE_MODAL(state) {
      state.isModal = true;
      state.profileModalStatus = true;
    },
    CLOSE_PROFILE_MODAL(state) {
      state.isModal = false;
      state.profileModalStatus = false;
    },
    IN_TO_HOME(state) {
      state.isCommunity = false;
    },
    IN_TO_COMMUNITY(state) {
      state.isCommunity = true;
    },
  },
  actions: {
    getMovies(context) {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/`,
        // headers: {
        //   // 인증 여부를 확인하기 위한 Token을 담아서 요청
        //   Authorization: `Token ${ context.state.token }`
        // }
      })
        .then((response) => {
          // 이미지를 불러오기 위한 URL 추가 작업
          const movies = response.data.map((movie) => {
            movie.backdrop_path = TMDB_URL + movie.backdrop_path;
            movie.poster_path = TMDB_URL + movie.poster_path;
            return movie;
          });
          context.commit("GET_MOVIES", movies);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPopularityMovies(context) {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/movies/popularity/`,
        // headers: {
        //   // 인증 여부를 확인하기 위한 Token을 담아서 요청
        //   Authorization: `Token ${ context.state.token }`
        // }
      })
        .then((response) => {
          // 이미지를 불러오기 위한 URL 추가 작업
          const movies = response.data.map((movie) => {
            movie.backdrop_path = TMDB_URL + movie.backdrop_path;
            movie.poster_path = TMDB_URL + movie.poster_path;
            return movie;
          });
          context.commit("GET_POPULERITY_MOVIES", movies);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getReviews(context) {
      axios({
        method: "get",
        url: `${API_URL}/api/v2/reviews/`,
      })
        .then((response) => {
          const reviews = response.data.map((review) => {
            // review.created_at = review.created_at.slice(2, 10)
            return review;
          });
          context.commit("GET_REVIEWS", reviews);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUserProfile(context) {
      axios({
        method: 'get',
        url: `${API_URL}/accounts/profile/${context.state.username}/`,
        headers: {
          Authorization: `Token ${ context.state.token }`
        },
      })
      .then((response) => {
        context.commit('GET_USER_PROFILE', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    openDetailModal(context, id) {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/movies/${id}`,
      })
        .then((response) => {
          const isActive = !this.state.movieDetailModalStatus.isActive;
          let movie = response.data;

          movie.backdrop_path = TMDB_URL + movie.backdrop_path;
          movie.poster_path = TMDB_URL + movie.poster_path;

          const movieDetailModalStatus = { isActive: isActive, movie: movie };
          context.commit("DETAIL_MODAL_TOGGLE", movieDetailModalStatus);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closeDetailModal(context) {
      const isActive = !this.state.movieDetailModalStatus.isActive;
      const movieDetailModalStatus = { isActive: isActive, movie: null };
      context.commit("DETAIL_MODAL_TOGGLE", movieDetailModalStatus);
    },
    openReviewModal(context, id) {
      axios({
        method: "get",
        url: `${API_URL}/api/v2/reviews/${id}`,
      })
        .then((response) => {
          const isActive = !this.state.reviewDetailModalStatus.isActive;
          const review = response.data;

          const reviewDetailModalStatus = {
            isActive: isActive,
            review: review,
          };
          context.commit("REVIEW_MODAL_TOGGLE", reviewDetailModalStatus);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closeReviewModal(context) {
      const isActive = !this.state.reviewDetailModalStatus.isActive;
      const reviewDetailModalStatus = { isActive: isActive, review: null };

      context.commit("REVIEW_MODAL_TOGGLE", reviewDetailModalStatus);
    },
    openCreateReviewModal(context) {
      context.commit("OPEN_CREATE_REVIEW_MODAL");
    },
    closeCreateReviewModal(context) {
      context.commit("CLOSE_CREATE_REVIEW_MODAL");
    },
    createReview(context, payload) {
      axios({
        method: "post",
        url: `${API_URL}/api/v2/reviews/`,
        headers: {
          // 인증 여부를 확인하기 위한 Token을 담아서 요청
          Authorization: `Token ${context.state.token}`,
        },
        data: {
          title: payload.title,
          content: payload.content,
          spoiler: payload.spoiler,
        },
      })
        .then((response) => {
          // response.data.username = context.state.username;
          const review = response.data
          console.log(review)
          context.commit("CREATE_REVIEWS", review);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateReview(context, review) {
      context.commit('UPDATE_REVIEW', review)
    },
    deleteReview(context, review_id) {
      context.commit('DELETE_REVIEW', review_id)
    },
    openSignUpModal(context) {
      context.commit("OPEN_SIGN_UP_MODAL");
    },
    signUp(context, payload) {
      const username = payload.username;
      const password1 = payload.password1;
      const password2 = payload.password2;
      axios({
        method: "post",
        url: `${API_URL}/accounts/signup/`,
        data: {
          username: username,
          password1: password1,
          password2: password2,
        },
      })
        .then((response) => {
          const token = response.data.key;
          const userdata = {
            username: username,
            token: token,
          };
          context.commit("SAVE_TOKEN", userdata);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closeSignUpModal(context) {
      context.commit("CLOSE_SIGN_UP_MODAL");
    },
    openLogInModal(context) {
      context.commit("OPEN_LOG_IN_MODAL");
    },
    logIn(context, payload) {
      const username = payload.username;
      const password = payload.password;
      axios({
        method: "post",
        url: `${API_URL}/accounts/login/`,
        data: {
          username: username,
          password: password,
        },
      })
        .then((response) => {
          const token = response.data.key;
          const userdata = {
            username: username,
            token: token,
          };
          context.commit("SAVE_TOKEN", userdata);
        })
        .catch((error) => {
          context.commit("TOKEN_ERROR");
          console.log(error);
        });
    },
    closeLogInModal(context) {
      context.commit("CLOSE_LOG_IN_MODAL");
    },
    logOut(context) {
      // CommunityView에 있다면 HomeView로 이동
      if (context.state.isCommunity) {
        router.push({ name: "HomeView" });
      }
      context.commit("LOG_OUT");
    },
    openProfileModal(context) {
      context.commit("OPEN_PROFILE_MODAL");
    },
    closeProfileModal(context) {
      context.commit("CLOSE_PROFILE_MODAL");
    },
    inToHome(context) {
      context.commit("IN_TO_HOME");
    },
    inToCommunity(context) {
      context.commit("IN_TO_COMMUNITY");
    },
  },
  modules: {
    // accounts, articles, movies
  },
  plugins: [createPersistedState()],
});
