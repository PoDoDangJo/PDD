<template>
  <div class="detail__similar">
    <div v-if="similarMovies.length">
      <h1>비슷한 영화 있음</h1>
    </div>
    <div v-else>
      <ul v-for="similarMovie in similarMovies" :key="similarMovie.id">
        <li class="movie-card icon" @click="openDetailModal">
          <img
            class="movie-backdrop"
            :src="similarMovie.poster_path"
            alt="poster"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";
const TMDB_URL = "https://image.tmdb.org/t/p/w500";

export default {
  name: "DetailSimilar",
  props: {
    similarMovieIds: Object,
  },
  data() {
    return {
      similarMovies: [],
    };
  },
  computed: mapState({
    movie: (state) => state.movieDetailModalStatus.movie,
  }),
  methods: {
    openDetailModal() {
      this.$store.dispatch("openDetailModal", this.movie.id);
    },

    getSimilarMovie(arrays) {
      for (const array of arrays) {
        console.log(array);
        axios({
          method: "get",
          url: `${API_URL}/api/v1/movies/${array.id}`,
        })
          .then((response) => {
            const similarMoviePoster = TMDB_URL + response.data.poster_path;
            const similarMovie = {
              id: response.data.id,
              poster_path: similarMoviePoster,
            };
            this.similarMovies.push(similarMovie);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style scoped>
.detail__similar {
  margin: 2vw;
}

li {
  float: left;
  list-style: none;
  min-width: 200px;
  max-width: 300px;
  width: calc(100px + 20vw);
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
  z-index: 11;
}

.movie-backdrop {
  position: relative;
  width: 100%;
  border-radius: 1%;
  overflow: hidden;
}
</style>
