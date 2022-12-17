<template>
  <div class="modal" id="modal-container">
    <div class="overlay" @click="closeReviewModal"></div>

    <div class="modal-card">
      <div class="card-nav">
        <h1>제목: {{ review?.title }}</h1>
        <h1 @click="openProfileModal" style="cursor: pointer">
          {{ review?.user_id.username }}
        </h1>
      </div>
      <div class="article_conainer">
        <p>{{ review?.content }}</p>
      </div>

      <div v-if="isActive" class="button__box">
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
        <input
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
      <div class="review-comments">
        <ReviewCommentItem
          v-for="comment of comments"
          :key="comment.id"
          :comment="comment"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
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
    ...mapGetters(["comments"]),
    review: (state) => state.reviews.reviewDetailModalStatus.review,
    isActive() {
      if (this.review.user_id.id == this.$store.state.accounts.userInfo.id) {
        return true;
      } else {
        return false;
      }
    },
  }),
  methods: {
    ...mapActions(["closeReviewModal", "getComments", "openProfileModal"]),
    updateReview() {
      this.$store.dispatch("updateReview", this.review.id);
    },
    deleteReview() {
      this.$store.dispatch("deleteReview", this.review.id);
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
.review-comment {
  overflow: scroll;
}
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
  align-items: center;
  margin: calc(20px + 2vw) auto;
  border-radius: 0.25rem;
  border: 0.0625rem solid rgb(238, 238, 238);
  background-color: #fff;
}
.card-nav {
  width: 90%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 0 2vw;
}

p {
  width: 100%;
  color: #141414;
  font-size: calc(14px + 0.5vw);
}
.modal {
  width: 100%;
  height: 100%;
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

h1 {
  display: flex;
  align-items: center;
  font-size: calc(20px + 0.5vw);
}
.modal-card {
  position: relative;
  width: 100%;

  /* same */
  min-width: 200px;
  max-width: 800px;
  margin: 30px auto;
  background-color: #141414;
  min-height: 500px;
  z-index: 10;
  border-radius: 5px;
}

.article_conainer {
  word-break: break-all;
  overflow: scroll;
  width: 90%;
  height: 100px;
  padding: 10px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  border-radius: 0.25rem;
  border: 0.0625rem solid rgb(238, 238, 238);
  background-color: #fff;
}

.button__box {
  width: calc(50px + 2vw);
  position: absolute;
  margin: 1vw 1.5vw;
  right: calc(10px + 1vw);
  display: flex;
  justify-content: space-between;
}

.btn__hover {
  all: unset;
  cursor: pointer;
}
.review-comments {
  position: relative;
  bottom: 30px;
}
</style>
