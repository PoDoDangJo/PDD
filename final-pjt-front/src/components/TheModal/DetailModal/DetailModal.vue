<template>
  <div class="modal" id="modal-container">
    <div class="overlay" @click="closeDetailModal"></div>

    <div class="modal-card">
      <div class="video">
        <header class="detail-header">
          <h1>{{ movie?.title }}</h1>
        </header>
        <iframe
          class="trailer"
          :src="`https://www.youtube.com/embed/${movie?.trailer_youtube_key}?autoplay=1&controls=0&disablekb=1&modestbranding=1&loop=1`"
          frameborder="0"
          allow="autoplay"
        ></iframe>
        <div class="detail__components__nav">
          <div class="button__container">
            <button :class="{ is__active: infoPage }" @click="goInfoPage()">
              상세정보
            </button>
            <button
              :class="{ is__active: commentPage }"
              @click="goCommentPage()"
            >
              사용자 평
            </button>
            <button
              :class="{ is__active: similarPage }"
              @click="goSimilarPage()"
            >
              관련영화
            </button>
          </div>
        </div>
      </div>
      <div class="detail__components">
        <DetailInfo v-if="infoPage" />
        <DetailComments v-else-if="commentPage" :movie="movie" />
        <DetailSimilar v-if="similarPage" @change-movie="changeMovie" />
      </div>
    </div>
  </div>
</template>

<script>
import DetailInfo from "./DetailInfo.vue";
import DetailComments from "./DetailComments.vue";
import DetailSimilar from "./DetailSimilar.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "DetailModal",
  components: {
    DetailInfo,
    DetailComments,
    DetailSimilar,
  },
  data() {
    return {
      infoPage: true,
      commentPage: false,
      similarPage: false,
    };
  },
  computed: mapState({
    movie: (state) => state.movies.movieDetailModalStatus.movie,
    allRates: (state) => state.movies.allRates,
  }),
  methods: {
    ...mapActions(["closeDetailModal", "getRates"]),
    goInfoPage() {
      this.infoPage = true;
      this.commentPage = false;
      this.similarPage = false;
    },
    goCommentPage() {
      this.infoPage = false;
      this.commentPage = true;
      this.similarPage = false;
    },
    goSimilarPage() {
      this.infoPage = false;
      this.commentPage = false;
      this.similarPage = true;
    },
    getSimilarMovie() {
      this.$store.dispatch("getSimilarMovie", this.movie.id);
    },
    changeMovie() {
      this.infoPage = true;
      this.commentPage = false;
      this.similarPage = false;
    },
  },
  created() {
    // 평가 가져오기
    this.getRates();
    // 관련 영화 가져오기
    this.getSimilarMovie();
  },
};
</script>

<style scoped>
.modal {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
}

.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  opacity: 0.5;
  background-color: black;
}

.video {
  position: sticky;
  top: 0;
  z-index: 20;
}

.modal-card {
  position: relative;
  width: 40%;

  /* same */
  min-width: 200px;
  max-width: 800px;
  margin: 30px auto;
  background-color: #141414;
  min-height: 870px;
  z-index: 10;
  border-radius: 5px;

  overflow: scroll;
}

.detail-header {
  position: absolute;
  width: 100%;
  z-index: 10;
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.7) 70%,
    transparent
  );

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  font-size: calc(8px + 0.5vw);
}

h1 {
  padding: 0 0 0 1vw;
  margin: 1vw 0;
}

.trailer {
  position: absolute;
  width: 100%;
  height: calc(100px + 20vw);
  /* same */
  min-width: 200px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 95%, #14141400 100%);
  z-index: 1;
}
/*
.modal-card-tagline {
  position: absolute;
  top: calc(80px + 20vw);
  margin: 1vw;
}

.modal-card-overview {
  position: absolute;
  top: calc(130px + 20vw);
  margin: 1vw;
  font-size: calc(4px + 0.7vw);
  text-align: justify;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  cursor: pointer;
  padding: 5px;
  border: 1px solid;
  border-radius: 5px;
}

.modal-card-overview:hover {
  transform: display, 1s;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
} */

.detail__components__nav {
  position: absolute;
  top: calc(100px + 18vw);
  height: calc(35px + 3vw);
  width: 100%;
  background-image: linear-gradient(to bottom, #141414 90%, #14141400 100%);
}

.detail__components {
  position: absolute;
  top: calc(130px + 20vw);

  width: 100%;
}

.button__container {
  display: flex;
  justify-content: space-between;

  font-weight: 600;
  margin: 0 2vw;
  margin-top: 1vw;
  align-items: center;
  width: calc(180px + 10vw);
  min-width: 260px;
  max-width: 800px;
}

.button__container > button {
  font-size: calc(10px + 0.5vw);
  cursor: pointer;
  z-index: 1;
  margin-top: calc(10px + 1vw);
}

button {
  all: unset;
  text-align: center;
  color: #dddcfb;
}

.is__active {
  color: #614af2;
}
</style>
