<template>
  <div>
    <img class="movie-poster" :src="poster_url" alt="poster">
    <p>{{ movie?.title }}</p>
    <hr>
  </div>
</template>

<script>
const TMDB_URL = 'https://image.tmdb.org/t/p/w500'

export default {
  name: 'MovieListItem',
  props: {
    movie: Object,
  },
  computed: {
    poster_url() {
      return TMDB_URL + this.movie.backdrop_path
    }
  }
}
</script>

<style>
.movie-poster {

}
</style>