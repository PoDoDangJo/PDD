<template>
  <div class="detail__similar">
    <ul v-for="similarMovie in similarMovies" :key="similarMovie.id">
      <li class="movie-card icon" @click="openDetailModal(similarMovie)">
        <img
          class="movie-backdrop"
          :src="similarMovie.poster_path"
          alt="poster"
        />
      </li>
    </ul>
    <div v-if="!similarMovies.length" class="message">
      <h4 class="no-movie">관련 영화를 찾을 수 없습니다!</h4>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";

export default {
  name: "DetailSimilar",
  computed: mapState({
    similarMovies: (state) => _.sampleSize(state.similarMovies, 3),
  }),
  methods: {
    openDetailModal(movie) {
      this.$store.dispatch("openDetailModal", movie.movie_id);
    },
    changeMovie() {
      this.$emit("change-movie");
    },
  },
};
</script>

<style scoped>
.detail__similar {
  margin: 1vw 2vw;
  list-style: none;
}

.message {
  width: 100%;
  height: calc(100px + 10vw);
  display: flex;
  justify-content: center;
  align-items: center;
}
.no-movie {
  font-size: calc(8px +0.5vw);
  text-anchor: end;
}

@media screen and (min-width: 750px) {
  .detail__similar {
    display: flex;
    justify-content: center;
  }
}

li {
  float: left;
  list-style: none;
  min-width: 200px;
  max-width: 300px;
  width: calc(100px + 20vw);
  margin: 1vw;
}

.movie-card {
  width: calc(100px + 5vw);
  min-width: 100px;
  max-width: 190px;
  scroll-snap-align: start;
  cursor: pointer;
  /* animation */
  transition: all 0.5s ease-in-out;
}

/* hover */
.movie-card:hover {
  transform: scale(1.1);
  z-index: 15;
}

.movie-backdrop {
  position: relative;
  width: 100%;
  border-radius: 1%;
  overflow: hidden;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
