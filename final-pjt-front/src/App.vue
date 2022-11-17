<template>
  <div id="app">
    <!-- 모달창 -->
    <DetailModal v-if="modalStatus.isActive" :movie="modalStatus.movie" />
    <TheHeader />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader/TheHeader";
import DetailModal from "@/components/DetailModal/DetailModal";

export default {
  name: "App",
  components: {
    TheHeader,
    DetailModal,
  },
  computed: {
    modalStatus() {
      return this.$store.state.modalStatus;
    },
  },
  methods: {
    // 영화 데이터 가져오는 함수
    getMovies() {
      this.$store.dispatch("getMovies");
    },
    // 모달창 끄기 위한 토글
    modal_toggle() {
      this.$store.dispatch("modal_toggle", this.modalStatus.id);
    },
  },
  created() {
    // App 실행시 영화 데이터 가져오는 함수 실행
    this.getMovies();
  },
};
</script>

<style>
#app {
}

/* 스크롤바 안보이게 */
::-webkit-scrollbar {
  display: none;
}

a {
  text-decoration: none;
  color: aliceblue;
}
</style>
