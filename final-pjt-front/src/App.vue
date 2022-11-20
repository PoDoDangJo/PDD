<template>
  <div id="app">
    <!-- 모달창 -->
    <CreateReviewModal v-if="createReviewModalStatus" />
    <SignUpModal v-if="signUpModalStatus" />
    <LogInModal v-if="loginModalStatus" />
    <DetailModal
      v-if="movieDetailModalStatus.isActive"
      :movie="movieDetailModalStatus.movie"
    />
    <ReviewModal
      v-if="reviewDetailModalStatus.isActive"
      :review="reviewDetailModalStatus.review"
    />
    <!-- 메인 -->
    <main :class="{ main: isModal }">
      <router-view />
    </main>
  </div>
</template>

<script>
import CreateReviewModal from "@/components/TheModal/CreateReviewModal";
import SignUpModal from "@/components/TheModal/SignUpModal";
import LogInModal from "@/components/TheModal/LogInModal";
import DetailModal from "@/components/TheModal/DetailModal/DetailModal";
import ReviewModal from "@/components/TheModal/ReviewModal";

import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    SignUpModal,
    LogInModal,
    DetailModal,
    CreateReviewModal,
    ReviewModal,
  },
  computed: mapState({
    isModal: (state) => state.isModal,
    movieDetailModalStatus: (state) => state.movieDetailModalStatus,
    reviewDetailModalStatus: (state) => state.reviewDetailModalStatus,
    loginModalStatus: (state) => state.loginModalStatus,
    signUpModalStatus: (state) => state.signUpModalStatus,
    createReviewModalStatus: (state) => state.createReviewModalStatus,
  }),
  methods: {
    // 영화 데이터 가져오는 함수
    getMovies() {
      this.$store.dispatch("getMovies");
    },
    getReviews() {
      this.$store.dispatch("getReviews");
    },
    // 모달창 끄기 위한 토글
    modal_toggle() {
      this.$store.dispatch("modal_toggle");
    },
  },
  created() {
    // App 실행시 영화 데이터 가져오는 함수 실행
    this.getMovies();
    this.getReviews();
  },
};
</script>

<style>
#app {
  scroll-behavior: smooth;
}

/* 스크롤바 안보이게 */
::-webkit-scrollbar {
  display: none;
}

/* 모달창 실행시 1초에 걸쳐 blur */
.main {
  transition: filter 1s;
  filter: blur(0.5rem);
}

/* a 태그 밑줄 색 제거 */
a {
  text-decoration: none;
  color: aliceblue;
}

/* input 태그 선택 테두리 제거 */
input:focus {
  outline: none;
}
</style>
