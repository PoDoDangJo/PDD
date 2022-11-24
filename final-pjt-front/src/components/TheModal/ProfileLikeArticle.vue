<template>
  <div class="detail__similar">
    <ul>
      <li
        v-for="myLike_review in myLike_reviews"
        :key="myLike_review.id"
        class="movie-card icon"
      >
        <h3>{{ myLike_review.content }}</h3>
        <br />
        <h3>♥{{ myLike_review.like_users.length }}</h3>
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
    myLike_reviews: (state) => state.userInfo.like_reviews,
  }),
  methods: {
    openDetailModal(movie) {
      this.$store.dispatch("openDetailModal", movie.movie_id);
    },
  },
};
</script>

<style scoped>
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
  /* 추가 */
  align-content: center;
  background-color: rgb(64, 62, 64);
  border-radius: 20px;
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
