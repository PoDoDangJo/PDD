<template>
  <div id="app">
    <div dir="ltr" class="extended-diacritics-language">
      <div class="bd dark-background">
        <TheNavbarVue/>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import TheNavbarVue from './components/TheNavbar.vue';

export default {
  name: 'App',
  components: {
    TheNavbarVue,
  },
  methods: {
    // 영화 데이터 가져오는 함수
    getMovies() {
      this.$store.dispatch('getMovies')
    }
  },
  created() {
    // App 실행시 영화 데이터 가져오는 함수 실행
    this.getMovies()
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #141414;
  background: #FFF;
  width: 100%;
  height: 3240px;
}

@media screen and (min-width: 481px) and (max-width: 840px) and (max-aspect-ratio: 4 / 3) {
  body, html {
    font-size: 1.8vw;
  }
}

body, html {
  -webkit-font-smoothing: antialiased;
  color: #fff;
  cursor: default;
  font-family: Helvetica, Arial, sans-serif;;
  line-height: 1.2;
  user-select: none;
}

/* 스크롤바 안 보이게 */
::-webkit-scrollbar {
  display: none;
}

.extended-diacritics-language {
  line-height: 1.4;
}

.bd {
  overflow: hidden;
  z-index: 0;
}

.dark-background {
  background: #fff;
}


</style>
