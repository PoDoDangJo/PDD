import Vue from "vue";
import Vuex from "vuex";

// Use Local Storage
import createPersistedState from "vuex-persistedstate";

// import Modules
import accounts from "./modules/accounts";
import reviews from "./modules/reviews";
import movies from "./modules/movies";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 홈 / 커뮤니티 판단
    isCommunity: null,
  },
  getters: {
    // 커뮤니티 뷰인지 확인 (게시판 <-> 게시글 작성)
    isCommunity(state) {
      return state.isCommunity ? true : false;
    },
  },
  mutations: {
    // 홈 화면 이동
    IN_TO_HOME(state) {
      state.isCommunity = false;
    },
    // 커뮤니티 화면 이동
    IN_TO_COMMUNITY(state) {
      state.isCommunity = true;
    },
  },
  actions: {
    // 홈 화면 이동
    inToHome(context) {
      context.commit("IN_TO_HOME");
    },
    // 커뮤니티 화면 이동
    inToCommunity(context) {
      context.commit("IN_TO_COMMUNITY");
    },
  },
  modules: {
    accounts,
    movies,
    reviews,
  },
  plugins: [createPersistedState()],
});
