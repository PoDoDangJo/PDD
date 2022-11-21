<template>
  <div class="modal" id="modal-container">
    <div class="overlay" @click="closeDetailModal"></div>

    <div class="modal-card">
      <div>
        <header class="detailHeader">
          <h1>{{ movie?.title }}</h1>
        </header>
        <iframe
          class="trailer"
          :src="`https://www.youtube.com/embed/${movie?.trailer_youtube_key}?autoplay=1&controls=0&disablekb=1&modestbranding=1`"
          frameborder="0"
          allow="autoplay"
        ></iframe>
        <div class="detail__components">
          <div class="button__container">
            <button :class="{ isActive: infoPage }" @click="infoPage()">
              상세정보
            </button>
            <button :class="{ isActive: commentPage }" @click="goCommentPage()">
              사용자 평
            </button>
            <button :class="{ isActive: similarPage }" @click="goSimilarPage()">
              관련영화
            </button>
          </div>
          <DetailInfo v-if="infoPage" />
          <DetailComments v-else-if="commentPage" />
          <DetailSimilar v-else-if="similarPage" />
        </div>
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
  data() {
    return {
      infoPage: true,
      commentPage: false,
      similarPage: false,
    };
  },
  computed: mapState({
    movie: (state) => state.movieDetailModalStatus.movie,
  }),
  methods: {
    ...mapActions(["closeDetailModal"]),
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
  },
  components: {
    DetailInfo,
    DetailComments,
    DetailSimilar,
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

  overflow: scroll;
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

.modal-card {
  position: relative;
  width: 60%;

  /* same */
  min-width: 200px;
  max-width: 800px;
  margin: 30px auto;
  background-color: #141414;
  min-height: calc(700px + 9vw);
  z-index: 10;
  border-radius: 5px;
}

.detailHeader {
  position: absolute;
  width: 100%;
  z-index: 10;
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.7) 50%,
    transparent
  );

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

h1 {
  padding: 0 1vw 0 1vw;
}

.trailer {
  position: absolute;
  width: 100%;
  height: calc(100px + 20vw);
  /* same */
  min-width: 200px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 90%,
    rgba(0, 0, 0, 0) 100%
  );
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

.detail__components {
  position: absolute;
  top: calc(100px + 20vw);

  margin: 0 1vw;
}

.button__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
}

button {
  font-size: calc(10px + 0.5vw);
  all: unset;
  text-align: center;
  color: #dddcfb;
}
</style>
