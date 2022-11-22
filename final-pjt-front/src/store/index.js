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
    classicMovies: [],
    allReviews: [],
    allRates: [],
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
    userInfo: null,
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false;
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
    GET_CLASSIC_MOVIES(state, movies) {
      state.classicMovies = movies;
    },
    GET_USER_PROFILE(state, userInfo) {
      state.userInfo = userInfo;
      console.log(userInfo);
    },
    GET_RATES(state, rates) {
      state.allRates = rates;
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
    CREATE_MOVIE_RATE(state, rates) {
      state.allRates = rates;
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
          review = reviewItem;
        }
        return review;
      });
    },
    DELETE_REVIEW(state, review) {
      console.log(state.allReviews);
      console.log(review);

      const index = state.allReviews.indexOf(review);

      state.allReviews.splice(index - 1, 1);
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
    getSimilarMovie(context, id) {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/movies/${id}`,
      })
        .then((response) => {
          const similarMoviePoster = TMDB_URL + response.data.poster_path;

          context.commit("GET_SIMILAR_MOVIE", similarMoviePoster);
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
    getClassicMovies(context) {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/movies/classic/`,
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
          context.commit("GET_CLASSIC_MOVIES", movies);
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
          if (error.data) {
            console.log(error.data);
          }
        });
    },
    getUserProfile(context) {
      axios({
        method: "get",
        url: `${API_URL}/accounts/profile/${context.state.username}/`,
        headers: {
          Authorization: `Token ${context.state.token}`,
        },
      })
        .then((response) => {
          context.commit("GET_USER_PROFILE", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getComments(context) {
      axios({
        method: "get",
        url: `${API_URL}/api/v2/comments/`,
        headers: {
          Authorization: `Token ${context.state.token}`,
        },
      })
        .then((response) => {
          console.log(response.data);
          context.commit("GET_COMMENTS", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
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
          like_users: [],
          user_id: context.state.userInfo.id,
        },
      })
        .then((response) => {
          const review = response.data;
          context.commit("CREATE_REVIEWS", review);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateReview(context, review) {
      context.commit("UPDATE_REVIEW", review);
    },
    deleteReview(context, review_id) {
      console.log(review_id);
      axios({
        method: "delete",
        url: `${API_URL}/api/v2/reviews/${review_id}`,
        headers: {
          // 인증 여부를 확인하기 위한 Token을 담아서 요청
          Authorization: `Token ${context.state.token}`,
        },
      })
        .then((response) => {
          console.log(response.data);
          context.commit("DELETE_REVIEW", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getRates(context) {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/rates/`,
        headers: {
          Authorization: `Token ${context.state.token}`,
        },
      })
        .then((response) => {
          const movie_id = context.state.movieDetailModalStatus.movie.id;
          const rates = response.data.filter((rate) => {
            if (rate.movie_id == movie_id) {
              return rate;
            }
          });
          console.log(rates);
          context.commit("GET_RATES", rates);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createMovieRate(context, payload) {
      axios({
        method: "post",
        url: `${API_URL}/api/v1/movies/${payload.movie_id}/rates/`,
        headers: {
          // 인증 여부를 확인하기 위한 Token을 담아서 요청
          Authorization: `Token ${context.state.token}`,
        },
        data: {
          rate: payload.rate,
          comment: payload.comment,
          spoiler: payload.spoiler,
          movie_id: payload.movie_id,
          user_id: context.state.userInfo.id,
        },
      })
        .then((response) => {
          const rates = response.data;
          context.commit("CREATE_MOVIE_RATE", rates);
        })
        .catch((error) => {
          console.log(error);
        });
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
    getSearch(context, searchData) {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/movies/search/${searchData}`,
      })
        .then((response) => {
          if (response.data.length == 0) {
            alert("일치하는 영화를 찾을 수 없습니다.");
          } else {
            console.log(response);
            context.commit("GET_SEARCH", response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  modules: {
    // accounts, articles, movies
  },
  plugins: [createPersistedState()],
});
