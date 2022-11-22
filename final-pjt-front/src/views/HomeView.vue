<template>
  <div>
    <TheHeader />
    <MovieSlider />
    <div class="slider__list">
      <MovieList :msg="'최근 개봉 영화'" :movies="lastMovies" />
      <MovieList :msg="'인기 영화'" :movies="popularityMovies" />
      <MovieList :msg="'고전 명작'" :movies="classicMovies" class="ester_egg" />
    </div>
    <div id="post-2">
      <div class="entry-title"></div>
    </div>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader/TheHeader";

import MovieSlider from "@/components/TheMovie/MovieSlider";
import MovieList from "@/components/TheMovie/MovieList";

import { mapState } from "vuex";

export default {
  name: "HomeView",
  components: {
    TheHeader,
    MovieSlider,
    MovieList,
  },
  computed: {
    ...mapState({
      lastMovies: (state) => state.allMovies.slice(5, 10),
      popularityMovies: (state) => state.popularityMovies.slice(5, 10),
      classicMovies: (state) => state.classicMovies.slice(0, 5),
    }),
  },
  methods: {
    inToHome() {
      this.$store.dispatch("inToHome");
    },
  },
  created() {
    this.inToHome();
  },
};
</script>

<style>
.slider__list {
  position: absolute;
  top: 40vw;
}

.ester_egg:active {
  color: red;
}
</style>
