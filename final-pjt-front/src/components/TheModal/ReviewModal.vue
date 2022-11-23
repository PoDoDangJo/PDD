<template>
  <div class="modal" id="modal-container">
    <div class="overlay" @click="closeReviewModal"></div>

    <div class="modal-card">
      <h1>제목: {{ review?.title }}</h1>
      <h2>작성자: {{ review?.user_id.username }}</h2>
      <p>내용: {{ review?.content }}</p>

      <div class="button__box">
        <button
          class="btn__hover btn__color"
          type="submit"
          @click="updateReview"
        >
          수정
        </button>
        <button
          class="btn__hover btn__color"
          type="submit"
          @click="deleteReview"
        >
          삭제
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ReviewModal",
  props: {
    review: Object,
  },
  methods: {
    ...mapActions(["closeReviewModal"]),
    updateReview() {
      this.$store.dispatch("updateReview", this.review.id);
    },
    deleteReview() {
      console.log(this.review);
      this.$store.dispatch("deleteReview", this.review.id);
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

.button__box {
  position: absolute;
  bottom: 0;
  margin: 8px 1vw;
}

.btn__hover {
  width: 14.4vw;
  min-width: 5px;
  margin: 8px 0;

  font-size: 1vw;
  font-weight: 600;
  color: #fff;
  cursor: pointer;

  height: 40px;
  text-align: center;
  border: none;
  background-size: 500% 100%;

  border-radius: 5px;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.6s ease-in-out;
  transition: all 0.8s ease-in-out;
}

.btn__hover:hover {
  background-position: 100% 0;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.6s ease-in-out;
  transition: all 0.8s ease-in-out;
}

.btn__hover.btn__color {
  background-image: linear-gradient(
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
</style>
