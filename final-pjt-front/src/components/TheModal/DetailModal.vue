<template>
  <div class="modal">
    <div class="overlay" @click="closeDetailModal"></div>

    <div class="modal-card">
      <img class="modal-card-poster" :src="movie.poster_path" alt="" />
      <p class="modal-card-overview">{{ movie?.overview }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailModal",
  props: {
    movie: Object,
  },
  methods: {
    closeDetailModal() {
      this.$store.dispatch("closeDetailModal");
    },
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
  max-width: 50%;
  margin: 30px auto;
  padding: 20px;
  background-color: #141414;
  min-height: 500px;
  z-index: 10;
}

.modal-card-poster {
  width: 36vw;
  height: 50vw;
  min-width: 72px;
  min-height: 100px;
  max-width: 360px;
  max-height: 500px;
  position: relative;
  left: 1vw;
  top: 1vw;
}

.modal-card-overview {
  position: relative;
  margin: 1vw;
  text-align: start;
}
</style>
