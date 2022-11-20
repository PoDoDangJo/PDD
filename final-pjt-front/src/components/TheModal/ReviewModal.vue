<template>
  <div class="modal" id="modal-container">
    <div class="overlay" @click="closeCreateReviewModal"></div>

    <div class="modal-card">
      <form @submit.prevent="createReview">
        <input type="text" placeholder="제목" /><br />
        <textarea cols="30" rows="10"></textarea><br />
        <input type="submit" value="작성" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailModal",
  methods: {
    closeCreateReviewModal() {
      this.$store.dispatch("closeCreateReviewModal");
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

.modal-card-back-drop {
  position: relative;
  width: 100%;

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

.modal-card-title {
  position: fixed;
  z-index: 2;

  margin: 1vw;
  font-size: calc(12px + 1vw);
  text-shadow: 1vw 1vw 1vw #141414;

  cursor: default;

  border-radius: 5px;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.6s ease-in-out;
  transition: all 0.8s ease-in-out;
}

.modal-card-title:hover {
  background-position: 100% 0;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.6s ease-in-out;
  transition: all 0.8s ease-in-out;
  color: linear-gradient(
    to right,
    #a261f5,
    #614af2,
    #a261f5,
    #dddcfb,
    #a261f5,
    #614af2,
    #a261f5
  );
}

.modal-card-overview {
  margin: 1vw;
  font-size: calc(4px + 0.7vw);
  text-align: justify;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
