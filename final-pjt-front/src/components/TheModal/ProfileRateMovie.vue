<template>
  <div class="detail__similar">
    <ul>
      <li
        v-for="myRatingMovie in myRatingMovies"
        :key="myRatingMovie.id"
        class="movie-card icon"
        @click="openDetailModal(myRatingMovie)"
      >
        <!-- <h3>♥ {{ myRatingMovie.like_users.length }}</h3> -->
        <h3>♥ {{ myRatingMovie.like_users.length }}</h3>
        <img
          class="movie-backdrop"
          :src="`https://image.tmdb.org/t/p/original${myRatingMovie.movie_id.poster_path}`"
          alt="poster"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DetailSimilar",
  props: {
    myRatingMovies: Array,
  },
  methods: {
    openDetailModal(movie) {
      console.log(movie.movie_id);
      this.$store.dispatch("openDetailModal", movie.movie_id.id);
    },
  },
};
</script>

<style scoped>
h3 {
  font-size: calc(10px + 0.5vw);
}

ul {
  width: 100%;
  float: left;
  display: flex;
}

.detail__similar {
  margin: 1vw 1vw;
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
}

/* hover */
.movie-backdrop:hover {
  transform: scale(1.1);
  z-index: 15;
}

.movie-backdrop {
  position: relative;
  width: 100%;
  border-radius: 1%;
  overflow: hidden;
  /* animation */
  transition: all 0.5s ease-in-out;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
