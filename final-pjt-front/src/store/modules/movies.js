import drf from "@/api/drf";
import axios from "axios";
import router from "@/router";

const TMDB_URL = "https://image.tmdb.org/t/p/original";

export default {
  state: {
    // 추천 영화 리스트
    lastMovies: [],
    popularityMovies: [],
    classicMovies: [],
    genreMoviesTitle: "", // 랜덤 장르 영화 타이틀
    genreMovies: [],
    directorMovies: [],
    actorMovies: [],
    // 관련 영화 리스트
    similarMovies: [],
    // 검색 영화 리스트
    searchMovies: [],
    // 검색 데이터
    searchData: null,
    // 모든 평가
    allRates: [],
    // 모달창 관리를 위한 데이터
    movieDetailModalStatus: { isActive: false, movie: null },
  },
  getters: {
    movieDetail: (state) => state.movieDetailModalStatus.movie,
    similarMovies: (state) => state.similarMovies,
    rates(state) {
      return state.allRates;
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
    // 관련 영화
    GET_SIMILAR_MOVIE(state, similarMovies) {
      state.similarMovies = similarMovies;
    },
    // 영화 상세창 열기
    OPEN_DETAIL_MODAL(state, movieDetailModalStatus) {
      // 관련 영화를 통해 올 경우 Modal 다시 띄우기
      state.movieDetailModalStatus = { isActive: false, movie: null };

      const delayTime = 0; // 0 second

      setTimeout(function () {
        state.movieDetailModalStatus = movieDetailModalStatus;
      }, delayTime);
    },
    // 영화 상세창 닫기
    CLOSE_DETAIL_MODAL(state, movieDetailModalStatus) {
      state.movieDetailModalStatus = movieDetailModalStatus;
      state.allRates = [];
    },
    // 영화 평가 데이터 가져오기
    GET_RATES(state, rates) {
      state.allRates = rates;
    },
    CREATE_MOVIE_RATE(state, rate) {
      state.allRates.push(rate);
    },
    // 검색
    GET_SEARCH(state, movies) {
      state.searchMovies = movies;
      router.push({ name: "SearchView" });
    },
  },
  actions: {
    // 최신 영화
    getLastMovies(context) {
      axios({
        method: "get",
        url: drf.movie.moviesCategory("new"),
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
        url: drf.movie.movies() + "similar/" + `${movie_id}`,
      })
        .then((response) => {
          // 이미지를 불러오기 위한 URL 추가 작업
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
        url: drf.movie.moviesCategory("popularity"),
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
        url: drf.movie.moviesCategory("classic"),
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
        url: drf.movie.moviesCategory("random_genre"),
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
        url: drf.movie.moviesCategory("popular_director"),
      })
        .then((response) => {
          const movieData = [];
          for (let n = 0; n < response.data.length; n++) {
            if (n % 2 == 1) {
              if (response.data[n].length == 1)
                movieData.push(response.data[n][0]);
              else {
                for (let k = 0; k < response.data[n].length; k++) {
                  movieData.push(response.data[n][k]);
                }
              }
            }
          }
          // 이미지를 불러오기 위한 URL 추가 작업
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
        url: drf.movie.moviesCategory("popular_actor"),
      })
        .then((response) => {
          const movieData = [];
          for (let n = 0; n < response.data.length; n++) {
            if (n % 2 == 1) {
              if (response.data[n].length == 1)
                movieData.push(response.data[n][0]);
              else {
                for (let k = 0; k < response.data[n].length; k++) {
                  movieData.push(response.data[n][k]);
                }
              }
            }
          }
          // 이미지를 불러오기 위한 URL 추가 작업
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
    // 영화 상세창 열기
    openDetailModal(context, id) {
      axios({
        method: "get",
        url: drf.movie.movieDetail(id),
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
      const movieDetailModalStatus = { isActive: false, movie: null };
      context.commit("CLOSE_DETAIL_MODAL", movieDetailModalStatus);
    },
    // 평가 조회
    getRates(context) {
      axios({
        method: "get",
        url: drf.movie.rates(),
        headers: {
          Authorization: `${context.rootGetters.authToken}`,
        },
      })
        .then((response) => {
          // 현재 영화 평가 조회
          const movie_id = context.state.movieDetailModalStatus.movie.id;
          const rates = response.data.filter((rate) => {
            if (rate.movie_id == movie_id) {
              return rate;
            }
          });
          context.commit("GET_RATES", rates);
        })
        .catch((error) => {
          if (error.response.status != 404) {
            console.log(error);
          }
        });
    },
    // 영화 평가 생성
    createMovieRate(context, payload) {
      axios({
        method: "post",
        url: drf.movie.movieRate(payload.movie_id),
        headers: {
          // 인증 여부를 확인하기 위한 Token을 담아서 요청
          Authorization: `Token ${context.rootState.accounts.token}`,
        },
        data: {
          rate: payload.rate,
          comment: payload.comment,
          spoiler: payload.spoiler,
          movie_id: payload.movie_id,
          user_id: context.rootState.accounts.userInfo.id,
        },
      })
        .then((response) => {
          const rate = response.data;
          context.commit("CREATE_MOVIE_RATE", rate);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 영화 평가 삭제
    deleteMovieRate(context, rate_id) {
      axios({
        method: "delete",
        url: drf.movie.rateDetail(rate_id),
        headers: {
          // 인증 여부를 확인하기 위한 Token을 담아서 요청
          Authorization: context.rootGetters.authToken,
        },
      })
        .then(() => {
          axios({
            method: "get",
            url: drf.movie.rates(),
            headers: {
              Authorization: context.rootGetters.authToken,
            },
          })
            .then((response) => {
              // 현재 영화 평가 조회
              const movie_id = context.state.movieDetailModalStatus.movie.id;
              const rates = response.data.filter((rate) => {
                if (rate.movie_id == movie_id) {
                  return rate;
                }
              });

              context.commit("GET_RATES", rates);
            })
            .catch((error) => {
              if (error.response.status != 404) {
                console.log(error);
              }
              context.state.allRates = [];
            });
        })
        .catch((error) => {
          if (error.response.status != 404) {
            console.log(error);
          }
        });
    },
    likesMovieRate(context, rate_id) {
      axios({
        method: "post",
        url: drf.movie.rateLikes(rate_id),
        headers: {
          Authorization: context.rootGetters.authToken,
        },
      })
        .then(() => {
          axios({
            method: "get",
            url: drf.movie.rates(),
            headers: {
              Authorization: context.rootGetters.authToken,
            },
          })
            .then((response) => {
              // 현재 영화 평가 조회
              const movie_id = context.state.movieDetailModalStatus.movie.id;
              const rates = response.data.filter((rate) => {
                if (rate.movie_id == movie_id) {
                  return rate;
                }
              });
              context.commit("GET_RATES", rates);
            })
            .catch((error) => {
              if (error.response.status != 404) {
                console.log(error);
              }
              context.state.allRates = [];
            });
        })
        .catch((error) => {
          if (error.response.status != 404) {
            console.log(error);
          }
        });
    },
    // 검색
    getSearch(context, searchData) {
      context.state.searchData = searchData;
      axios({
        method: "get",
        url: drf.movie.movieSearch(searchData),
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
  },
};
