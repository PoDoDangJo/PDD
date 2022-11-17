<template>
  <span class="movie-card" @click="openModal">
    <img class="movie-backdrop" :src="movie?.backdrop_path" alt="poster" />
    <h3 class="movie-title">{{ movie?.title }}</h3>
  </span>
</template>

<script>
export default {
  name: "MovieListItem",
  props: {
    movie: Object,
  },
  data() {
    return {
    }
  },
  computed: {},
  methods: {
    openModal() {
      this.$store.dispatch('openModal', this.movie.id)
    },
  }
};
</script>

<style>
.movie-card {
  flex: 0 0 18.625rem;
  width: 18.625em;
  scroll-snap-align: start;
  cursor: pointer;
  margin-right: 0.5em;
  /* animation */
  transition: transform .5s;
}

/* hover */
.movie-card:hover {
  transform: scale(1.3);
  z-index: 2;
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
