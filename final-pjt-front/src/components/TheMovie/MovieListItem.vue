<template>
  <li class="movie-card icon" @click="openDetailModal">
    <h1 class="modal-card-title">{{ movie?.title }}</h1>
    <img class="movie-backdrop" :src="movie?.backdrop_path" alt="poster" />
  </li>
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

<style scoped>
li {
  float: left;
  list-style: none;
  height: 92%;
  min-width: 200px;
  max-width: 300px;
  width: calc(100px + 20vw);
}

.movie-card {
  width: calc(100px + 10vw);
  min-width: 200px;
  max-width: 300px;
  scroll-snap-align: start;
  cursor: pointer;
  margin-right: calc(1px + 2vw);
  /* animation */
  transition: all 0.5s ease-in-out;
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
  top: 0;
  margin: 0.8vw calc(5px + 0.5vw);
  font-size: calc(10px + 0.5vw);
  text-shadow: 1px 1px 1px #141414;

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
