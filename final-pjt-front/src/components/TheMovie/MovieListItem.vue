<template>
  <span class="movie-card" @click="openDetailModal">
    <img class="movie-backdrop" :src="movie?.backdrop_path" alt="poster" />
    <h3 class="movie-title">{{ movie?.title }}</h3>
  </span>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";

export default {
  name: "MovieListItem",
  props: {
    movie: Object,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    openDetailModal() {
      this.$store.dispatch("openDetailModal", this.movie.id);
    },
  },
};
</script>

<style>
.movie-card {
  width: 500vw;
  scroll-snap-align: start;
  cursor: pointer;
  margin-right: 1vw;
  /* animation */
  transition: transform 0.5s;
  background-color: #141414;
}

/* hover */
.movie-card:hover {
  transform: scale(1.3);
  z-index: 2;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
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
