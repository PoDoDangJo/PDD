<template>
  <div id="app">
    <!-- 모달창 -->
    <ProfileModal v-if="profileModalStatus" />
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
    <main :class="{ is__blur: isModal }">
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
import ProfileModal from "@/components/TheModal/ProfileModal";

import { mapState, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    SignUpModal,
    LogInModal,
    DetailModal,
    CreateReviewModal,
    ReviewModal,
    ProfileModal,
  },
  computed: mapState({
    isModal: (state) => state.isModal,
    movieDetailModalStatus: (state) => state.movieDetailModalStatus,
    reviewDetailModalStatus: (state) => state.reviewDetailModalStatus,
    loginModalStatus: (state) => state.loginModalStatus,
    signUpModalStatus: (state) => state.signUpModalStatus,
    profileModalStatus: (state) => state.profileModalStatus,
    createReviewModalStatus: (state) => state.createReviewModalStatus,
  }),
  methods: {
    ...mapActions([
      "getLastMovies",
      "getReviews",
      "getPopularityMovies",
      "getClassicMovies",
    ]),
  },
  created() {
    // App 실행시 영화 데이터 가져오는 함수 실행
    this.getLastMovies();
    this.getReviews();
    this.getPopularityMovies();
    this.getClassicMovies();
  },
};
</script>

<style>
#app {
  scroll-behavior: smooth;
  z-index: 9;
}

/* 스크롤바 안보이게 */
::-webkit-scrollbar {
  display: none;
}

/* 모달창 실행시 1초에 걸쳐 blur */
.is__blur {
  transition: filter 1s;
  filter: blur(0.5rem);
  overflow: hidden;
}

.main {
  display: none;
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
