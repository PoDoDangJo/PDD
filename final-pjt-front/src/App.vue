<template>
  <div id="app">
    <TheHeader />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader/TheHeader";

export default {
  name: "App",
  components: {
    TheHeader,
  },
  methods: {
    // 영화 데이터 가져오는 함수
    getMovies() {
      this.$store.dispatch("getMovies");
    },
    scroll() {
      // 무한 스크롤
      window.onscroll = () => {
        let bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.scrolledToBottom += 1;
        }
      };
    },
  },
  created() {
    // App 실행시 영화 데이터 가져오는 함수 실행
    this.getMovies();
  },
};
</script>

<style>
a {
  text-decoration: none;
  color: #141414;
}
</style>
