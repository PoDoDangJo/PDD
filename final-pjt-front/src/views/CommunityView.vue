<template>
  <div>
    <TheHeader />
    <MovieSlider />
    <ArticleList />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader/TheHeader";
import MovieSlider from "@/components/TheMovie/MovieSlider";
import ArticleList from "@/components/TheArticle/ArticleList";
import { mapActions } from "vuex";

export default {
  name: "CommunityView",
  components: {
    TheHeader,
    ArticleList,
    MovieSlider,
  },
  methods: {
    ...mapActions(["getUserProfile", "getReviews"]),
    inToCommunity() {
      // token 없이 CommunityView에 들어간다면 HomeView로 이동
      if (this.$store.state.token) {
        this.$store.dispatch("inToCommunity");
      } else {
        this.$router.push({ name: "HomeView" });
      }
    },
  },
  // 커뮤니티 View 생성 시
  created() {
    // 커뮤니티 화면 이동 (게시판 <-> 게시글 작성)
    this.inToCommunity();
    // 유저 데이터 가져오기
    this.getUserProfile();
    // 리뷰 데이터 가져오기
    this.getReviews();
  },
};
</script>

<style scoped></style>
