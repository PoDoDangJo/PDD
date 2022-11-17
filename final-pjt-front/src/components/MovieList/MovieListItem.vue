<template>
  <span class="movie-card">
    <router-link :to="{ name: 'DetailView', params: { id: movie?.id } }">
      <img class="movie-backdrop" :src="movie?.backdrop_path" alt="poster" />
      <h3 class="movie-title">{{ movie?.title }}</h3>
    </router-link>
  </span>
</template>

<script>
export default {
  name: "MovieListItem",
  props: {
    movie: Object,
  },
  computed: {},
};
</script>

<style>
.movie-card {
  flex: 0 0 18.625rem;
  width: 18.625em;
  scroll-snap-align: start;
  cursor: pointer;
  margin-right: 0.5em;
}

.movie-backdrop {
  position: relative;
  width: 100%;
  height: 10.375em;
  border-radius: 0.25em;
  margin-bottom: 0.25em;
  overflow: hidden;
}

.movie-title {
  margin: 0px;
  padding-right: 50px;
}
</style>
