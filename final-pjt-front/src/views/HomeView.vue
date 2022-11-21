<template>
  <div>
    <TheHeader />
    <MovieSlider />
    <div class="slider__list">
      <MovieList :msg="'최근 개봉 영화'" :movies="movieLastOne" />
      <MovieList :msg="'인기 영화'" :movies="popularityMovies" />
      <MovieList :msg="'추천 영화'" />
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
      popularityMovies: (state) => state.popularityMovies,
    }),

    movieLastOne() {
      return this.$store.getters.Movie_Last_1;
    },
    movieLastTwo() {
      return this.$store.getters.Movie_Last_2;
    },
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
</style>
