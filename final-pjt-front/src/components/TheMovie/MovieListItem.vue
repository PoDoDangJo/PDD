<template>
  <div class="movie-card" @click="openDetailModal">
    <img class="movie-backdrop" :src="movie?.backdrop_path" alt="poster" />
  </div>
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
  width: calc(100px + 10vw);
  min-width: 200px;
  max-width: 300px;
  scroll-snap-align: start;
  cursor: pointer;
  margin-right: calc(1px + 2vw);
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
  border-radius: 1%;
  overflow: hidden;
}
</style>
