import Vue from "vue";
import Vuex from "vuex";

// import drf from "@/api/drf";

// Use Local Storage
import createPersistedState from "vuex-persistedstate";
import router from "../router/index";

import axios from "axios";
// import { range } from "lodash";
// import Modules
// import accounts from './modules/accounts'
// import articles from './modules/articles'
// import movies from './modules/movies'

Vue.use(Vuex);

const API_URL = "http://127.0.0.1:8000";
const TMDB_URL = "https://image.tmdb.org/t/p/original";

export default new Vuex.Store({
  state: {
    lastMovies: [],
    popularityMovies: [],
    classicMovies: [],
    genreMovies: [],
    genreMoviesTitle: null,  // 랜덤 장르 영화 타이틀
    directorMovies: [],
    actorMovies: [],
    allReviews: [],
    allRates: [],
    similarMovies: [],
    isModal: false,
    movieDetailModalStatus: { isActive: false, movie: null },
    reviewDetailModalStatus: { isActive: false, review: null },
    createReviewModalStatus: false,
    loginModalStatus: false,
    signUpModalStatus: false,
    profileModalStatus: false,
    token: null,
    isCommunity: null,
    userInfo: null,
    username: null,
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
    youCanRate(state) {
      for (const rate of state.allRates) {
        if (rate.user_id == state.userInfo.id) {
          return false;
        }
      }
      return true;
    },
  },
  mutations: {
    GET_SEARCH(state, movies) {
      const hi = state.username;
      console.log(hi);
      console.log(movies);
    },
    GET_LAST_MOVIES(state, movies) {
      state.lastMovies = movies;
    },
    GET_POPULERITY_MOVIES(state, movies) {
      state.popularityMovies = movies;
    },
    GET_CLASSIC_MOVIES(state, movies) {
      state.classicMovies = movies;
    },
    GET_GENRE_MOVIES(state, movieData) {
      state.genreMovies = movieData[1];
      state.genreMoviesTitle = movieData[0];
    },
    GET_DIRECTOR_MOVIES(state, movies) {
      state.directorMovies = movies;
    },
    GET_ACTOR_MOVIES(state, movies) {
      state.actorMovies = movies;
    },
    GET_USER_PROFILE(state, userInfo) {
      state.userInfo = userInfo;
    },
    GET_RATES(state, rates) {
      state.allRates = rates;
    },
    OPEN_DETAIL_MODAL(state, movieDetailModalStatus) {
      state.isModal = true;
      state.movieDetailModalStatus = movieDetailModalStatus;
    },
    CLOSE_DETAIL_MODAL(state, movieDetailModalStatus) {
      state.isModal = false;
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
      location.reload;
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
      state.movieDetailModalStatus = { isActive: false, movie: null };
      state.isModal = true;
      state.loginModalStatus = true;
    },
    CLOSE_LOG_IN_MODAL(state) {
      state.isModal = false;
      state.loginModalStatus = false;
    },
    SAVE_TOKEN(state, userdata) {
      state.isModal = false;
      state.token = userdata.token;

      state.username = userdata.username;
      state.userInfo = userdata;
      // 로그인 성공시 로그인 및 회원가입 모달 닫기
      state.loginModalStatus = false;
      state.signUpModalStatus = false;
      // sign up && log in 시 홈으로
      // router.push({ name: 'HomeView' })
    },
    LOG_OUT(state) {
      state.token = null;
      state.userInfo = null;
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
    GET_SIMILAR_MOVIE(state, similarMovies) {
      state.similarMovies = similarMovies;
    },
  },
  actions: {
    getLastMovies(context) {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/movies/new/`,
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
          context.commit("GET_LAST_MOVIES", movies);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getSimilarMovie(context, movie_id) {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/movies/similar/${movie_id}`,
      })
        .then((response) => {
          const similarMovies = response.data.map((similar) => {
            const movie_id = similar.id;
            const poster_path = TMDB_URL + similar.poster_path;
            const similarMovie = {
              movie_id: movie_id,
              poster_path: poster_path,
            };
            return similarMovie;
          });
          context.commit("GET_SIMILAR_MOVIE", similarMovies);
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
    // 랜덤 장르 영화
    getGenreMovies(context) {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/movies/random_genre/`,
      })
        .then((response) => {
          // 이미지를 불러오기 위한 URL 추가 작업

          const movieData = [response.data[0]]

          const movies = response.data[1].map((movie) => {
            movie.backdrop_path = TMDB_URL + movie.backdrop_path;
            movie.poster_path = TMDB_URL + movie.poster_path;
            return movie;

          })
          movieData.push(movies)
          context.commit("GET_GENRE_MOVIES", movieData)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //
    getDirectorMovies(context) {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/movies/popular_director/`,
      })
        .then((response) => {
          // 이미지를 불러오기 위한 URL 추가 작업
          // for (const n = 0; n++)  여기에요 사장님!
          console.log(response.data)
          const movieData = [];
          for (let n = 0; n < response.data.length; n++) {
            if ( n % 2 === 1){
              if (response.data[n].length === 1)
                movieData.push(response.data[n][0]);
              else {
                for (let k = 0; k < response.data[n].length; k++) {
                  movieData.push(response.data[n][k])
                }
                }
            }
          }
          const movies = movieData.map((movie) => {
            movie.backdrop_path = TMDB_URL + movie.backdrop_path;
            movie.poster_path = TMDB_URL + movie.poster_path;
            return movie;
          })
          context.commit("GET_DIRECTOR_MOVIES", movies)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getActorMovies(context) {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/movies/popular_actor/`,
      })
        .then((response) => {
          console.log(response.data)
          const movieData = [];
          for (let n = 0; n < response.data.length; n++) {
            if ( n % 2 === 1){
              if (response.data[n].length === 1)
                movieData.push(response.data[n][0]);
              else {
                for (let k = 0; k < response.data[n].length; k++) {
                  movieData.push(response.data[n][k])
                }
                }
            }
          }
          const movies = movieData.map((movie) => {
            movie.backdrop_path = TMDB_URL + movie.backdrop_path;
            movie.poster_path = TMDB_URL + movie.poster_path;
            return movie;
          })
          context.commit("GET_ACTOR_MOVIES", movies)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //
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
          context.commit("GET_COMMENTS", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openDetailModal(context, id) {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/movies/${id}/`,
      })
        .then((response) => {
          let movie = response.data;

          movie.backdrop_path = TMDB_URL + movie.backdrop_path;
          movie.poster_path = TMDB_URL + movie.poster_path;

          const movieDetailModalStatus = { isActive: true, movie: movie };
          context.commit("OPEN_DETAIL_MODAL", movieDetailModalStatus);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closeDetailModal(context) {
      context.state.youCanRate = true;
      const movieDetailModalStatus = { isActive: false, movie: null };
      context.commit("CLOSE_DETAIL_MODAL", movieDetailModalStatus);
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
      axios({
        method: "delete",
        url: `${API_URL}/api/v2/reviews/${review_id}`,
        headers: {
          // 인증 여부를 확인하기 위한 Token을 담아서 요청
          Authorization: `Token ${context.state.token}`,
        },
      })
        .then((response) => {
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
      axios({
        method: "post",
        url: `${API_URL}/accounts/signup/`,
        data: {
          username: username,
          password1: payload.password1,
          password2: payload.password2,
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
          alert("이미 존재하는 이름입니다.");
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
      axios({
        method: "post",
        url: `${API_URL}/accounts/login/`,
        data: {
          username: username,
          password: payload.password,
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
          alert("흠 다시 확인해 주세요");
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
        url: `${API_URL}/api/v1/movies/search/${searchData}/`,
      })
        .then((response) => {
          if (response.data.length == 0) {
            alert("일치하는 영화를 찾을 수 없습니다.");
          } else {
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
