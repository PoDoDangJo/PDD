<template>
  <div id="content">
    <div id="canvas"></div>

    <div id="water-ripples">
      <div class="go-home">
        <h1>Not Found 404</h1>
        <p @click="goToHome">Go Back To Home</p>
      </div>
      <img
        class="backImages"
        :src="`https://image.tmdb.org/t/p/original/${randomImage}`"
        alt=""
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
  name: "NotFound404View",
  computed: mapState({
    searchMovies: (state) => _.sampleSize(state.movies.lastMovies, 5),
    randomImage() {
      return _.sample(this.searchMovies).backdrop_path;
    },
  }),
  methods: {
    goToHome() {
      console.log(this.backDropPath);
      this.$router.push({ name: "HomeView" });
      location.reload;
    },
  },
};
</script>

<style scoped>
h1 {
  margin: 0;
}
.go-home {
  width: 90%;
  height: 90%;
  z-index: 10;
  margin: auto auto;
  justify-content: flex-start;
  align-items: flex-start;
  opacity: 1;
  text-shadow: 1px 1px 5px #000;
}

p {
  cursor: pointer;
}

button {
  all: unset;
  cursor: pointer;
}
</style>
