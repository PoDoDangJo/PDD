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

.modal-card-title {
  position: fixed;
  z-index: 2;
  top: 60%;
  margin: 1vw;
  font-size: calc(12px + 0.5vw);
  text-shadow: 1vw 1vw 1vw #141414;

  cursor: default;

  border-radius: 5px;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.6s ease-in-out;
  transition: all 0.8s ease-in-out;
}

/* hover */
.movie-card:hover {
  transform: scale(1.2);
  z-index: 11;
}

.movie-backdrop {
  position: relative;
  width: 100%;
  border-radius: 1%;
  overflow: hidden;
}
</style>
