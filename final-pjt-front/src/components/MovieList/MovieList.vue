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
import MovieListItem from "@/components/MovieList/MovieListItem";

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
  padding: 0px 1.875em;
}

.slider {
  width: 100%;
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
  width: 100%;
  display: flex;
  min-height: 14em;
  overflow-x: visible;
  flex-wrap: nowrap;
  padding: 0px 3.125em;
  transform: translate3d(0em, 0px, 0px);
}
</style>
