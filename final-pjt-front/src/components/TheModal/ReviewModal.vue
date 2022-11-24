<template>
  <div class="modal" id="modal-container">
    <div class="overlay" @click="closeReviewModal"></div>

    <div class="modal-card">
      <div class="card-nav">
        <h1>제목: {{ review?.title }}</h1>
        <h3>{{ review?.user_id.username }}</h3>
      </div>
      <div class="article_conainer">
        <p>{{ review?.content }}</p>
      </div>

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
      <div class="comment_conainer">
        <textarea
          name="comment_content"
          placeholder="댓글을 달아주세요."
          class="review-comment"
          maxlength="20"
          v-model="reviewComment"
          rows="1"
        />
        <button class="create-comment" @click="createReviewComment">
          댓글
        </button>
      </div>
      <ReviewCommentItem
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ReviewCommentItem from "@/components/TheModal/ReviewCommentItem";

export default {
  name: "ReviewModal",
  components: {
    ReviewCommentItem,
  },
  data() {
    return {
      reviewComment: null,
    };
  },
  computed: mapState({
    review: (state) => state.reviewDetailModalStatus.review,
    comments: (state) => state.allComments,
  }),
  methods: {
    ...mapActions(["closeReviewModal", "getComments", "getReviews"]),
    updateReview() {
      this.$store.dispatch("updateReview", this.review.id);
    },
    deleteReview() {
      this.$store.dispatch("deleteReview", this.review.id);
      this.getReviews;
    },
    createReviewComment() {
      const payload = {
        review_id: this.review.id,
        content: this.reviewComment,
      };
      this.$store.dispatch("createReviewComment", payload);
      this.reviewComment = null;
    },
  },
  created() {
    this.getComments();
  },
};
</script>

<style scoped>
.create-comment {
  all: unset;
  color: #141414;
  cursor: pointer;
}
.review-comment {
  border: none;

  outline: none;
  min-width: 200px;
  max-width: 800px;
  resize: none;
}
.comment_conainer {
  width: 90%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  margin: calc(20px + 2vw) auto;
  border-radius: 0.25rem;
  border: 0.0625rem solid rgb(238, 238, 238);
  background-color: #fff;
}
.card-nav {
  overflow: scroll;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 0 2vw;
}

p {
  width: 100%;
  color: #141414;
  font-size: calc(8px + 0.5vw);
}
.modal {
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

h1 {
  display: flex;
  align-items: center;
  font-size: calc(12px + 0.5vw);
}
.modal-card {
  position: relative;
  width: 100%;

  /* same */
  min-width: 200px;
  max-width: 800px;
  margin: 30px auto;
  background-color: #141414;
  min-height: 800px;
  z-index: 10;
  border-radius: 5px;
}

.article_conainer {
  word-break: break-all;
  overflow: scroll;
  width: 90%;
  height: 200px;
  padding: 10px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  border-radius: 0.25rem;
  border: 0.0625rem solid rgb(238, 238, 238);
  background-color: #fff;
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
  width: 50px;
  position: absolute;
  margin: 0.5vw 1.5vw;
  right: calc(10px + 1vw);
  display: flex;
  justify-content: space-between;
}

.btn__hover {
  all: unset;
}

.btn__hover:hover {
  color: 100% 0;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.6s ease-in-out;
  transition: all 0.8s ease-in-out;
}

.btn__hover.btn__color {
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
</style>
