<template>
  <div>
    <TheHeader />
    <MovieSlider />
    <div class="slider__list">
      <MovieList :msg="'최근 개봉 영화'" />
      <MovieList :msg="'인기 영화'" />
      <MovieList :msg="'추천 영화'" />
    </div>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader/TheHeader";

import MovieSlider from "@/components/TheMovie/MovieSlider";
import MovieList from "@/components/TheMovie/MovieList";

export default {
  name: "HomeView",
  components: {
    TheHeader,
    MovieSlider,
    MovieList,
  },
  computed: {},
  methods: {},
};
</script>

<style>
.slider__list {
  position: absolute;
  top: 40vw;
}
</style>
