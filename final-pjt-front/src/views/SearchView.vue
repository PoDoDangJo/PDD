<template>
  <div id="content">
    <div class="search-main">
      <TheHeader />

      <div class="search-title">
        <h1>{{ searchData }}</h1>
      </div>

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
    </div>

    <div id="canvas"></div>

    <div class="overlay"></div>
    <div id="water-ripples">
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
import TheHeader from "@/components/TheHeader/TheHeader";
import { mapState } from "vuex";
import _ from "lodash";

export default {
  name: "SearchView",
  components: {
    TheHeader,
  },
  computed: mapState({
    searchData: (state) => state.movies.searchData,
    searchMovies: (state) => _.sampleSize(state.movies.searchMovies, 5),
    randomImage() {
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
.search-main {
  position: fixed;
  z-index: 20;
}

#card {
  width: calc(100px + 5vw);
  border-radius: 5px;
  position: relative;
  margin: 2vw;
  border: 2px solid #fff;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
}
#card:hover {
  transform: scale(1.2);
  z-index: 11;
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
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: top;
  z-index: 20;
}

.movie-list {
  width: 80%;
  display: flex;
  justify-content: space-around;
}

.search-title {
  left: 2vw;
  top: 3vw;
  font-size: calc(10px + 1.5vw);
  position: relative;
  align-items: center;
  z-index: 20;
  font-weight: 600;
}
</style>
