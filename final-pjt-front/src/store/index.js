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
    // 추천 영화 리스트
    lastMovies: [],
    popularityMovies: [],
    classicMovies: [],
    genreMoviesTitle: null, // 랜덤 장르 영화 타이틀
    genreMovies: [],
    directorMovies: [],
    actorMovies: [],
    // 관련 영화 리스트
    similarMovies: [],
    // 검색 영화 리스트
    searchMovies: [],
    // 모든 리뷰 / 댓글 / 평가
    allReviews: [],
    allComments: [],
    allRates: [],
    // 유저 데이터
    token: null,
    userInfo: null,
    // 모달창 관리를 위한 데이터
    isModal: false,
    movieDetailModalStatus: { isActive: false, movie: null },
    reviewDetailModalStatus: { isActive: false, review: null },
    signUpModalStatus: false,
    loginModalStatus: false,
    profileModalStatus: false,
    createReviewModalStatus: false,
    // 검색 데이터
    searchData: null,
    // 홈 / 커뮤니티 판단
    isCommunity: null,
  },
  getters: {
    // 로그인 했는지 확인 (영화 상세창에서 댓글)
    isLogin(state) {
      return state.token ? true : false;
    },
    // 커뮤니티 뷰인지 확인 (게시판 <-> 게시글 작성)
    isCommunity(state) {
      return state.isCommunity ? true : false;
    },
    reviews(state) {
      return state.allReviews;
    },
    rates(state) {
      return state.allRates;
    },
    comments(state) {
      return state.allComments;
    },
    // 평가를 할 수 있는 지 확인
    youCanRate(state) {
      if (state.allRates) {
        for (const rate of state.allRates) {
          if (rate.user_id.id == state.userInfo.id) {
            return false;
          }
        }
      }
      return true;
    },
  },
  mutations: {
    // 최신 영화
    GET_LAST_MOVIES(state, movies) {
      state.lastMovies = movies;
    },
    // 인기 영화
    GET_POPULERITY_MOVIES(state, movies) {
      state.popularityMovies = movies;
    },
    // 고전 영화
    GET_CLASSIC_MOVIES(state, movies) {
      state.classicMovies = movies;
    },
    // 장르 영화
    GET_GENRE_MOVIES(state, movieData) {
      state.genreMovies = movieData[1];
      state.genreMoviesTitle = movieData[0];
    },
    // 감독 영화
    GET_DIRECTOR_MOVIES(state, movies) {
      state.directorMovies = movies;
    },
    // 배우 영화
    GET_ACTOR_MOVIES(state, movies) {
      state.actorMovies = movies;
    },
    // 유저 정보
    GET_USER_PROFILE(state, userInfo) {
      state.userInfo = userInfo;
    },
    // 영화 평가 데이터 가져오기
    GET_RATES(state, rates) {
      state.allRates = rates;
    },
    // 영화 상세창 열기
    OPEN_DETAIL_MODAL(state, movieDetailModalStatus) {
      state.isModal = true;
      state.movieDetailModalStatus = movieDetailModalStatus;
    },
    // 영화 상세창 닫기
    CLOSE_DETAIL_MODAL(state, movieDetailModalStatus) {
      state.isModal = false;
      state.movieDetailModalStatus = movieDetailModalStatus;
      state.allRates = [];
    },
    // 리뷰 상세창 토글
    REVIEW_MODAL_TOGGLE(state, reviewDetailModalStatus) {
      state.isModal = !state.isModal;
      state.reviewDetailModalStatus = reviewDetailModalStatus;
      state.allComments = [];
    },
    // 리뷰 생성창 열기
    OPEN_CREATE_REVIEW_MODAL(state) {
      state.isModal = true;
      state.createReviewModalStatus = true;
    },
    // 리뷰 데이터 가져오기
    GET_REVIEWS(state, reviews) {
      state.allReviews = reviews;

      // 리뷰를 삭제했을 경우
      state.isModal = false;
      state.reviewDetailModalStatus = { isActive: false, review: null };
    },
    // 영화 평가 생성
    CREATE_MOVIE_RATE(state, rates) {
      state.allRates = rates;
      // location.reload()
    },
    // 리뷰 댓글 생성
    CREATE_REVIEW_COMMENT(state, comments) {
      state.allComments.push(comments);
    },
    // 리뷰 생성
    CREATE_REVIEWS(state, review) {
      state.allReviews.push(review);
      state.createReviewModalStatus = false;
      state.isModal = false;
    },
    // 리뷰 생성창 닫기
    CLOSE_CREATE_REVIEW_MODAL(state) {
      state.isModal = false;
      state.createReviewModalStatus = false;
    },
    // 리뷰 수정
    UPDATE_REVIEW(state, reviewItem) {
      state.allReviews = state.allReviews.reverse().map((review) => {
        if (review.id == reviewItem.id) {
          review = reviewItem;
        }
        return review;
      });
    },
    // 회원 가입창 열기
    OPEN_SIGN_UP_MODAL(state) {
      state.isModal = true;
      state.signUpModalStatus = true;
      state.loginModalStatus = false;
    },
    // 회원 가입창 닫기
    CLOSE_SIGN_UP_MODAL(state) {
      state.isModal = false;
      state.signUpModalStatus = false;
    },
    // 로그인창 열기
    OPEN_LOG_IN_MODAL(state) {
      state.movieDetailModalStatus = { isActive: false, movie: null };
      state.isModal = true;
      state.loginModalStatus = true;
    },
    // 로그인창 닫기
    CLOSE_LOG_IN_MODAL(state) {
      state.isModal = false;
      // 로그인 모달닫기
      state.loginModalStatus = false;
    },
    // 토큰 저장
    SAVE_TOKEN(state, userdata) {
      // 로그인 및 회원가입 성공 시 모달창 닫음
      state.isModal = false;

      state.userInfo = userdata.userInfo;
      state.token = userdata.token;

      // 로그인 성공시 로그인 및 회원가입 모달 닫기
      state.loginModalStatus = false;
      state.signUpModalStatus = false;
    },
    // 로그아웃
    LOG_OUT(state) {
      // 토큰과 유저 정보 null로 변경
      state.token = null;
      state.userInfo = null;
      // local 저장소에서 token 제거
      localStorage.removeItem("token");
      // 새로고침
      location.reload;
    },
    // 프로필창 열기
    OPEN_PROFILE_MODAL(state) {
      state.isModal = true;
      state.profileModalStatus = true;
    },
    // 프로필창 닫기
    CLOSE_PROFILE_MODAL(state) {
      state.isModal = false;
      state.profileModalStatus = false;
    },
    // 홈 화면 이동
    IN_TO_HOME(state) {
      state.isCommunity = false;
    },
    // 커뮤니티 화면 이동
    IN_TO_COMMUNITY(state) {
      state.isCommunity = true;
    },
    // 관련 영화
    GET_SIMILAR_MOVIE(state, similarMovies) {
      state.similarMovies = similarMovies;
    },
    // 검색
    GET_SEARCH(state, movies) {
      state.searchMovies = movies;
      router.push({ name: "SearchView" });
    },
    // 댓글 가져오기
    GET_COMMENTS(state, comments) {
      state.allComments = comments;
    },
  },
  actions: {
    // 최신 영화
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
    // 관련 영화
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
    // 인기 영화
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
    // 고전 영화
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
          const movieData = [response.data[0]];
          const movies = response.data[1].map((movie) => {
            movie.backdrop_path = TMDB_URL + movie.backdrop_path;
            movie.poster_path = TMDB_URL + movie.poster_path;
            return movie;
          });
          movieData.push(movies);
          context.commit("GET_GENRE_MOVIES", movieData);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 감독 영화
    getDirectorMovies(context) {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/movies/popular_director/`,
      })
        .then((response) => {
          // 이미지를 불러오기 위한 URL 추가 작업
          // for (const n = 0; n++)  여기에요 사장님!
          const movieData = [];
          for (let n = 0; n < response.data.length; n++) {
            if (n % 2 === 1) {
              if (response.data[n].length === 1)
                movieData.push(response.data[n][0]);
              else {
                for (let k = 0; k < response.data[n].length; k++) {
                  movieData.push(response.data[n][k]);
                }
              }
            }
          }
          const movies = movieData.map((movie) => {
            movie.backdrop_path = TMDB_URL + movie.backdrop_path;
            movie.poster_path = TMDB_URL + movie.poster_path;
            return movie;
          });
          context.commit("GET_DIRECTOR_MOVIES", movies);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 배우 영화
    getActorMovies(context) {
      axios({
        method: "get",
        url: `${API_URL}/api/v1/movies/popular_actor/`,
      })
        .then((response) => {
          const movieData = [];
          for (let n = 0; n < response.data.length; n++) {
            if (n % 2 === 1) {
              if (response.data[n].length === 1)
                movieData.push(response.data[n][0]);
              else {
                for (let k = 0; k < response.data[n].length; k++) {
                  movieData.push(response.data[n][k]);
                }
              }
            }
          }
          const movies = movieData.map((movie) => {
            movie.backdrop_path = TMDB_URL + movie.backdrop_path;
            movie.poster_path = TMDB_URL + movie.poster_path;
            return movie;
          });
          context.commit("GET_ACTOR_MOVIES", movies);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 리뷰
    getReviews(context) {
      axios({
        method: "get",
        url: `${API_URL}/api/v2/reviews/`,
      })
        .then((response) => {
          const reviews = response.data;
          context.commit("GET_REVIEWS", reviews);
        })
        .catch((error) => {
          if (error.data) {
            console.log(error.data);
          }
        });
    },
    // 유저 정보
    getUserProfile(context) {
      axios({
        method: "get",
        url: `${API_URL}/accounts/profile/${context.state.userInfo.username}/`,
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
    // 영화 상세창 열기
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
    // 영화 상세창 닫기
    closeDetailModal(context) {
      context.state.youCanRate = true;
      const movieDetailModalStatus = { isActive: false, movie: null };
      context.commit("CLOSE_DETAIL_MODAL", movieDetailModalStatus);
    },
    // 리뷰창 열기
    openReviewModal(context, id) {
      axios({
        method: "get",
        url: `${API_URL}/api/v2/reviews/${id}`,
      })
        .then((response) => {
          const isActive = !this.state.reviewDetailModalStatus.isActive;
          // 리뷰 정보
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
    // 리뷰창 닫기
    closeReviewModal(context) {
      const isActive = !this.state.reviewDetailModalStatus.isActive;
      const reviewDetailModalStatus = { isActive: isActive, review: null };

      context.commit("REVIEW_MODAL_TOGGLE", reviewDetailModalStatus);
    },
    // 리뷰 생성창 열기
    openCreateReviewModal(context) {
      context.commit("OPEN_CREATE_REVIEW_MODAL");
    },
    // 리뷰 생성창 닫기
    closeCreateReviewModal(context) {
      context.commit("CLOSE_CREATE_REVIEW_MODAL");
    },
    // 리뷰 생성
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
    // 리뷰 수정
    updateReview(context, review) {
      context.commit("UPDATE_REVIEW", review);
    },
    // 리뷰 삭제
    deleteReview(context, review_id) {
      axios({
        method: "delete",
        url: `${API_URL}/api/v2/reviews/${review_id}`,
        headers: {
          // 인증 여부를 확인하기 위한 Token을 담아서 요청
          Authorization: `Token ${context.state.token}`,
        },
      })
        .then(() => {
          axios({
            method: "get",
            url: `${API_URL}/api/v2/reviews/`,
          })
            .then((response) => {
              const reviews = response.data;
              context.commit("GET_REVIEWS", reviews);
            })
            .catch((error) => {
              if (error.data) {
                console.log(error.data);
              }
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 평가
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
    // 영화 평가 생성
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
          context.actions.getRates;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 영화 평가 삭제
    deleteMovieRate(context, rate_id) {
      axios({
        method: "delete",
        url: `${API_URL}/api/v1/rates/${rate_id}/`,
        headers: {
          // 인증 여부를 확인하기 위한 Token을 담아서 요청
          Authorization: `Token ${context.state.token}`,
        },
      })
        .then(() => {
          axios({
            method: "get",
            url: `${API_URL}/api/v1/rates/`,
            headers: {
              Authorization: `Token ${context.state.token}`,
            },
          })
            .then((response) => {
              console.log(response);
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
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 회원가입창 열기
    openSignUpModal(context) {
      context.commit("OPEN_SIGN_UP_MODAL");
    },
    // 회원 가입
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
    // 회원 가입창 닫기
    closeSignUpModal(context) {
      context.commit("CLOSE_SIGN_UP_MODAL");
    },
    // 로그인창 열기
    openLogInModal(context) {
      context.commit("OPEN_LOG_IN_MODAL");
    },
    //로그인
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
          // 유저 정보 가져오기
          const token = response.data.key;
          axios({
            method: "get",
            url: `${API_URL}/accounts/profile/${username}`,
            headers: {
              Authorization: `Token ${token}`,
            },
          }).then((response) => {
            const userdata = {
              userInfo: response.data,
              token: token,
            };
            context.commit("SAVE_TOKEN", userdata);
          });
        })
        .catch((error) => {
          alert("흠 다시 확인해 주세요");
          console.log(error);
        });
    },
    // 로그인창 닫기
    closeLogInModal(context) {
      context.commit("CLOSE_LOG_IN_MODAL");
    },
    // 로그아웃
    logOut(context) {
      // CommunityView에 있다면 HomeView로 이동
      if (context.state.isCommunity) {
        router.push({ name: "HomeView" });
      }
      context.commit("LOG_OUT");
    },
    // 프로필창 열기
    openProfileModal(context) {
      context.commit("OPEN_PROFILE_MODAL");
    },
    // 프로필창 닫기
    closeProfileModal(context) {
      context.commit("CLOSE_PROFILE_MODAL");
    },
    // 홈 화면 이동
    inToHome(context) {
      context.commit("IN_TO_HOME");
    },
    // 커뮤니티 화면 이동
    inToCommunity(context) {
      context.commit("IN_TO_COMMUNITY");
    },
    // 검색
    getSearch(context, searchData) {
      context.state.searchData = searchData;
      axios({
        method: "get",
        url: `${API_URL}/api/v1/movies/search/${searchData}/`,
      })
        .then((response) => {
          if (response.data.length == 0) {
            alert("일치하는 영화를 찾을 수 없습니다.");
          } else {
            const movies = response.data.map((movie) => {
              movie.backdrop_path = TMDB_URL + movie.backdrop_path;
              movie.poster_path = TMDB_URL + movie.poster_path;
              return movie;
            });
            console.log("hi");
            context.commit("GET_SEARCH", movies);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 댓글
    getComments(context, id) {
      axios({
        method: "get",
        url: `${API_URL}/api/v2/reviews/${id}`,
        headers: {
          Authorization: `Token ${context.state.token}`,
        },
      })
        .then((response) => {
          this.commit("GET_COMMENTS", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 리뷰 댓글 생성
    createReviewComment(context, payload) {
      console.log(payload);
      axios({
        method: "post",
        url: `${API_URL}/api/v2/reviews/${payload.review_id}/comments/`,
        headers: {
          // 인증 여부를 확인하기 위한 Token을 담아서 요청
          Authorization: `Token ${context.state.token}`,
        },
        data: {
          content: payload.content,
          spoiler: false,
          review_id: payload.review_id,
          user_id: context.state.userInfo.id,
        },
      })
        .then((response) => {
          const comments = response.data;
          console.log(comments);
          context.commit("CREATE_REVIEW_COMMENT", comments);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 리뷰 댓글 삭제
    deleteReviewComment(context, comment) {
      axios({
        method: "delete",
        url: `${API_URL}/api/v2/comments/${comment.id}`,
        headers: {
          Authorization: `Token ${context.state.token}`,
        },
      })
        .then(() => {
          axios({
            method: "get",
            url: `${API_URL}/api/v2/reviews/${context.state.reviewDetailModalStatus.review.id}`,
          })
            .then((response) => {
              const reviews = response.data;
              context.commit("GET_COMMENTS", reviews);
            })
            .catch((error) => {
              if (error.data) {
                console.log(error.data);
              }
            });
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
