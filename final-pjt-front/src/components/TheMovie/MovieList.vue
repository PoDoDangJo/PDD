<template>
  <div>
    <h1 class="movie-category">{{ msg }}</h1>
    <div class="wrapper">
      <section class="slide">
        <ul class="movie-list">
          <MovieListItem
            v-for="movie in movies"
            :key="movie.id"
            :movie="movie"
          />
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
};
</script>

<style scoped>
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

    // a {
    //   position: absolute;
    //   color: #fff;
    //   text-decoration: none;
    //   font-size: calc(16px + 5vw);
    //   background: #141414;
    //   width: 150px;
    //   margin-left: 2vw;
    //   text-align: center;
    //   z-index: 1;

    //   &:nth-of-type(1) {
    //     top: 0;
    //     bottom: 0;
    //     left: 0;
    //     background: linear-gradient(-90deg, #14141400 0%, #141414 100%);
    //   }
    //   &:nth-of-type(2) {
    //     top: 0;
    //     bottom: 0;
    //     right: 0;
    //     background: linear-gradient(90deg, #14141400 0%, #141414 100%);
    //   }
    // }
  }
}

// Remove the arrow for Mobile
@media only screen and (max-width: 600px) {
  // a.arrow__btn {
  //   display: none;
  // }
}
</style>
