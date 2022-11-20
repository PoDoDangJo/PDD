<template>
  <div class="modal" id="modal-container">
    <div class="overlay" @click="closeDetailModal"></div>

    <div class="modal-card">
      <div>
        <iframe
          class="trailer"
          :src="`https://www.youtube.com/embed/${movie?.trailer_youtube_key}?autoplay=1&start=30&controls=0&disablekb=1&end=60&modestbranding=1`"
          frameborder="0"
          allow="autoplay"
        ></iframe>
        <p class="modal-card-tagline">{{ movie?.tagline }}</p>
        <div class="detail__components">
          <DetailInfo v-if="status == 'info'" />
          <DetailComments v-else-if="status == 'comments'" />
          <DetailSimilar v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DetailInfo from "./DetailInfo.vue";
import DetailComments from "./DetailComments.vue";
import DetailSimilar from "./DetailSimilar.vue";
import { mapActions } from "vuex";

export default {
  name: "DetailModal",
  props: {
    movie: Object,
  },
  data() {
    return {
      status: "info",
    };
  },
  methods: {
    ...mapActions(["closeDetailModal"]),
  },
  components: {
    DetailInfo,
    DetailComments,
    DetailSimilar,
  },
};
</script>

<style scoped>
.modal,
overlay {
  width: 100%;
  height: 100%;
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

.modal-card {
  position: relative;
  width: 40%;

  /* same */
  min-width: 200px;
  max-width: 500px;
  margin: 30px auto;
  background-color: #141414;
  min-height: 500px;
  z-index: 10;
  border-radius: 5px;
}

.trailer {
  position: relative;
  width: 100%;
  height: calc(50px + 10vw);
  /* same */
  min-width: 200px;
  left: 0;
  top: 0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 65%,
    rgba(0, 0, 0, 0) 100%
  );
}

.modal-card-tagline {
  position: absolute;
  top: calc(40px + 10vw);
  margin: 1vw;
}

.modal-card-overview {
  position: absolute;
  top: calc(0px + 10vw);
  margin: 1vw;
  font-size: calc(4px + 0.7vw);
  text-align: justify;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.modal-card-overview:active {
  transform: display, 1s;
  overflow: scroll;
  text-overflow: ellipsis;
  display: flex;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
