<template>
  <div>
    <div class="slider">
      <div class="slide">
        <h1 class="movie-category">{{ msg }}</h1>
        <div class="movie-list">
          <MovieListItem
            v-for="movie in movies"
            :key="movie.id"
            :movie="movie"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieListItem from "@/components/TheMovie/MovieListItem";

export default {
  name: "MovieList",
  props: {
    msg: String,
  },
  components: {
    MovieListItem,
  },
  computed: {
    movies() {
      return this.$store.state.movies;
    },
  },
};
</script>

<style>
.movie-category {
  padding: 0px 2vw;
  font-size: calc(16px + 1vw);
}

.slide {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  user-select: none;
  width: 100%;
}

.movie-list {
  margin-left: 2vw;
  width: 300%;
  display: flex;
  transform: translate3d(0em, 0px, 0px);
}
</style>
