<template>
  <div class="detail__similar">
    <ul>
      <li
        v-for="myRatingMovie in myRatingMovies"
        :key="myRatingMovie.id"
        class="movie-card icon"
        @click="openDetailModal(similarMovie)"
      >
        <img
          class="movie-backdrop"
          :src="`https://image.tmdb.org/t/p/original${myRatingMovie.movie_id.poster_path}`"
          alt="poster"
        /><br />
        <!-- <h3>♥ {{ myRatingMovie.like_users.length }}</h3> -->
        <h3>♥ 2</h3>

        <br />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DetailSimilar",
  computed: mapState({
    myRatingMovies: (state) => state.accounts.userInfo.rating,
  }),
  methods: {
    openDetailModal(movie) {
      this.$store.dispatch("openDetailModal", movie.movie_id);
    },
  },
};
</script>

<style scoped>
h3 {
  font-size: calc(10px + 0.5vw);
}
ul {
  width: 300%;
  float: left;
  display: flex;
}

.detail__similar {
  margin: 1vw 2vw;
  list-style: none;
  overflow: scroll;
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

@media screen and (min-width: 1024px) {
  .detail__similar {
    display: flex;
    justify-content: center;

    list-style: none;
  }

  .movie-card {
    width: calc(100px + 4vw);
    float: left;
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
  width: calc(100px + 3vw);
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
