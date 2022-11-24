<template>
  <div id="content">
    <div id="canvas"></div>

    <div class="search-title glow">{{ searchData }}</div>

    <div class="search-list">
      <ul class="movie-list">
        <img
          id="card"
          v-for="movie in searchMovies"
          :key="movie.id"
          :src="`${movie.poster_path}`"
          @click="openDetailModal(movie.id)"
        />
      </ul>
    </div>

    <div class="overlay"></div>
    <div id="water-ripples">
      <div class="go-home"></div>
      <img
        class="backImages"
        :src="`https://image.tmdb.org/t/p/original/${randomImage}`"
        alt="Photo by David Pisnoy on Unsplash"
        crossorigin
        data-sampler="planeTexture"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";

export default {
  name: "SearchView",
  computed: mapState({
    searchData: (state) => state.searchData,
    searchMovies: (state) => state.searchMovies,
    randomImage() {
      console.log(this.searchMovies);
      return _.sample(this.searchMovies).backdrop_path;
    },
  }),
  methods: {
    goToHome() {
      this.$router.push({ name: "HomeView" });
      location.reload;
    },
    openDetailModal(id) {
      this.$store.dispatch("openDetailModal", id);
    },
  },
};
</script>

<style scoped>
#card {
  width: calc(100px + 5vw);
  border-radius: 5px;
  position: relative;
  top: calc(100px + 15vw);
  margin: 2vw;
  border: 2px solid #fff;
  cursor: pointer;
}

h1 {
  margin: 0;
}
.go-home {
  height: 200px;
  z-index: 10;
  margin: auto auto;
  align-items: center;
  opacity: 1;
}

p {
  cursor: pointer;
}

button {
  all: unset;
  cursor: pointer;
}

.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  opacity: 0.5;
  background-color: black;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.search-list {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
}

.movie-list {
  width: 80%;
  display: flex;
  justify-content: space-around;
}

.search-title {
  font-size: calc(10px + 2vw);
  display: flex;
  position: relative;
  justify-content: center;
  top: calc(20px + 1vw);
  z-index: 20;
  font-weight: 700;
}

.glow {
  color: #fff;
  text-align: center;
  /* -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate; */
  animation: glow 1s ease-in-out infinite alternate;
}

/* #614af2,
    #a261f5,
    #dddcfb, */

@keyframes glow {
  from {
    text-shadow: 0 0 0px #dddcfb, 0 0 5px #dddcfb, 0 0 10px #614af2,
      0 0 15px #614af2, 0 0 20px #614af2, 0 0 25px #614af2, 0 0 30px #614af2;
  }
  to {
    text-shadow: 0 0 0px #dddcfb, 0 0 5px #614af2, 0 0 10px #614af2,
      0 0 15px #614af2, 0 0 20px #614af2, 0 0 25px #614af2, 0 0 30px #614af2;
  }
}
</style>
