<template>
  <div>
    <TheHeader />
    <MovieSlider />
    <div id="slider__list">
      <MovieList :msg="'최근 개봉 영화'" :movies="lastMovies" />
      <MovieList :msg="'인기 영화'" :movies="popularityMovies" />
      <MovieList :msg="'고전 명작'" :movies="classicMovies" />
      <MovieList
        :msg="`${genreMoviesTitle} 장르는 어떠세용?`"
        :movies="genreMovies"
      />
      <MovieList :msg="'인기 감독들의 명작'" :movies="directorMovies" />
      <MovieList :msg="'인기 배우들의 명작'" :movies="actorMovies" />
    </div>
    <footer class="footer-container">
      <TheFooter />
    </footer>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader/TheHeader";

import MovieSlider from "@/components/TheMovie/MovieSlider";
import MovieList from "@/components/TheMovie/MovieList";
import TheFooter from "@/components/TheFooter";

import { mapState } from "vuex";

export default {
  name: "HomeView",
  components: {
    TheHeader,
    MovieSlider,
    MovieList,
    TheFooter,
  },
  computed: mapState({
    lastMovies: (state) => state.movies.lastMovies,
    popularityMovies: (state) => state.movies.popularityMovies,
    classicMovies: (state) => state.movies.classicMovies,
    genreMovies: (state) => state.movies.genreMovies,
    genreMoviesTitle: (state) => state.movies.genreMoviesTitle,
    directorMovies: (state) => state.movies.directorMovies,
    actorMovies: (state) => state.movies.actorMovies,
  }),
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

<style scoped>
.footer-container {
  height: 350px;
  margin-bottom: 50px;
}
</style>
