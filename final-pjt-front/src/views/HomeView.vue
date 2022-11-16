<template>
  <div>
    <MovieList :msg="'최근 개봉 영화'"/>
  </div>
</template>

<script>
import MovieList from '@/components/MovieList'

export default {
  name: 'HomeView',
  components: {
    MovieList,
  },
}
</script>

<style>
</style>