<template>
  <div class="detail__info">
    <h1 class="info-title" style="font-size: calc(3px)">줄거리</h1>
    <p class="movie__overview">{{ movie.overview }}</p>
    <h1 class="info-title">감독</h1>
    <div class="director">
      <img src="" alt="" />
    </div>
    <h1 class="info-title">배우</h1>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "DetailInfo",
  computed: mapState({
    movie: (state) => state.movieDetailModalStatus.movie,
    directors() {
      return this.movie.director;
    },
    actors() {
      return this.movie.actors;
    },
    genres() {
      return this.movie.genre_ids;
    },
  }),
  methods: {
    ...mapActions(["getDirectors", "getActors", "getGenres"]),
  },
  created() {
    // 감독 배우 장르 받아올 함수
    // this.getDirectors()
    // this.getActors()
    // this.getGenres()
  },
};
</script>

<style scoped>
.detail__info {
  margin: 2vw;
}
.info-title {
  opacity: 0.8;
  font-size: calc(5px + 0.5vw) !important;
}

.movie__overview {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-size: calc(4px + 0.5vw);
  transition: all 0.5s ease-in-out;
}

.movie__overview:hover {
  -webkit-line-clamp: unset;
}
</style>
