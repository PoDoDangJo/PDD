<template>
  <div>
    <MovieList :msg="'최근 개봉 영화'" />
    <MovieList :msg="'인기 영화'" />
    <MovieList :msg="'추천 영화'" />
    <MovieList :msg="'최근 개봉 영화'" />
  </div>
</template>

<script>
import MovieList from "@/components/MovieList/MovieList";

export default {
  name: "HomeView",
  components: {
    MovieList,
  },
};
</script>

<style></style>
