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

export default {
  name: "CommunityView",
  components: {
    TheHeader,
    ArticleList,
    MovieSlider,
  },
  methods: {
    inToCommunity() {
      // token 없이 CommunityView에 들어간다면 HomeView로 이동
      if (this.$store.state.token) {
        this.$store.dispatch("inToCommunity");
      } else {
        this.$router.push({ name: "HomeView" });
      }
    },
  },
  created() {
    this.inToCommunity();
  },
};
</script>

<style scoped></style>
