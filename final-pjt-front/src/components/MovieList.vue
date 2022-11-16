<template>
  <div class="movie-list">
    <h1>{{ msg }}</h1>
    <MovieListItem v-for="movie in movies" :key="movie.id" :movie="movie"/>
  </div>
</template>

<script>
import MovieListItem from '@/components/MovieListItem'

export default {
  name: 'MovieList',
  props: {
    msg: String
  },
  components: {
    MovieListItem,
  },
  computed: {
    movies() {
      return this.$store.state.movies
    }
  },
}
</script>

<style>
</style>