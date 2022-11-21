<template>
  <div class="movie-card" @click="openDetailModal">
    <h1 class="modal-card-title">{{ movie?.title }}</h1>
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
  transform: scale(1.2);
  z-index: 11;
}

.modal-card-title {
  position: fixed;
  z-index: 2;
  top: 65%;
  margin: 10px;
  font-size: calc(8px + 0.5vw);
  text-shadow: 1vw 1vw 1vw #141414;

  cursor: pointer;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.6s ease-in-out;
  transition: all 0.8s ease-in-out;

  -webkit-text-stroke: 0.3px #141414;
}

.movie-backdrop {
  position: relative;
  width: 100%;
  border-radius: 1%;
  overflow: hidden;
}
</style>
