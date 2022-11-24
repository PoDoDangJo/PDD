<template>
  <div>
    <h1 class="movie-category">{{ msg }}</h1>
    <div class="wrapper">
      <section class="slide">
        <ul class="movie-list" v-if="sectionIndex == 0">
          <MovieListItem
            v-for="movie in movieOne"
            :key="movie.id"
            :movie="movie"
          />
          <li>
            <button @click="plusSlides">&#10095;</button>
          </li>
        </ul>
        <ul class="movie-list" v-else-if="sectionIndex == 1">
          <MovieListItem
            v-for="movie in movieTwo"
            :key="movie.id"
            :movie="movie"
          />

          <li>
            <button @click="plusSlides">&#10095;</button>
          </li>
        </ul>
        <ul class="movie-list" v-else>
          <MovieListItem
            v-for="movie in movieThree"
            :key="movie.id"
            :movie="movie"
          />

          <li>
            <button @click="plusSlides">&#10095;</button>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import MovieListItem from "@/components/TheMovie/MovieListItem";

export default {
  name: "MovieList",
  props: {
    msg: String,
    movies: Array,
  },
  components: {
    MovieListItem,
  },
  data() {
    return {
      sectionIndex: 0,
    };
  },
  computed: {
    movieOne() {
      return this.movies.slice(0, 5);
    },
    movieTwo() {
      return this.movies.slice(5, 10);
    },
    movieThree() {
      return this.movies.slice(10, 15);
    },
  },
  methods: {
    plusSlides() {
      this.sectionIndex = this.sectionIndex + 1;
      if (this.sectionIndex == 3) {
        this.sectionIndex = 0;
      }
    },
  },
};
</script>

<style scoped>
button {
  all: unset;
  cursor: pointer;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(14px + 1vw);
  margin-left: 2vw;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.movie-list {
  margin-left: 2vw;
  width: 300%;
  display: flex;
  transform: translate3d(0em, 0px, 0px);
}

h1 {
  padding: 0px 2vw;
  font-size: calc(16px + 1vw);
}
</style>

<style lang="scss" scoped>
$itemGrow: 1.2;
$duration: 250ms;

.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 100%);
  overflow: hidden;
  scroll-behavior: smooth;

  section {
    width: 100%;
    position: relative;
    display: grid;
    grid-template-columns: repeat(5, auto);
    margin: 20px 0;

    .item {
      padding: 0 2px;
      transition: $duration all;

      &:hover {
        margin: 0 40px;
        transform: scale(1.2);
      }
    }
  }
}
</style>
