<template>
  <div id="app">
    <!-- 모달창 -->
    <div class="modal__background" v-if="modalStatus.isActive" @click="modal_toggle">
      <div class="modal__box" @click="modal_toggle">
        <img class="modal__poster" :src="modalStatus.movie.poster_path" alt="">
      </div>
    </div>
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
  computed: {
    modalStatus() {
      return this.$store.state.modalStatus
    }
  },
  methods: {
    // 영화 데이터 가져오는 함수
    getMovies() {
      this.$store.dispatch("getMovies");
    },
    // 모달창 끄기 위한 토글
    modal_toggle() {
      this.$store.dispatch('modal_toggle', this.modalStatus.id)
    }
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

.modal__background {
  flex: 0 0;
  z-index: 2;
  background-color: rgb(0, 0, 0, 50%);
  height: 800px;
}

.modal__box {
  position: absolute;
  top: calc(50vh - 100px); left: calc(50vw - 200px);
  background-color: white;
  display: flex; justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 400px;
  height: 200px;
}

.modal__poster {
  height: 200px;
}

a {
  text-decoration: none;
  color: #141414;
}
</style>
