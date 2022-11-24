<template>
  <div id="content">
    <div id="canvas"></div>

    <div class="search-title">
      <h1>{{ searchData }}</h1>
    </div>

    <p @click="reloading">WAVE</p>

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
    searchMovies: (state) => _.sampleSize(state.searchMovies, 5),
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
    reloading() {
      location.reload();
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

.go-home {
  height: 200px;
  z-index: 10;
  margin: auto auto;
  align-items: center;
  opacity: 1;
}

p {
  cursor: pointer;
  z-index: 20;
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
  width: 90%;
  height: 200px;
  left: calc(10px + 1vw);
  font-size: calc(10px + 2vw);
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  z-index: 20;
  font-weight: 700;
}
</style>
