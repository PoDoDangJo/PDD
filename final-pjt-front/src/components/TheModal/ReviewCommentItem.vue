<template>
  <div style="width: 90%; margin: 0 auto">
    <div
      style="
        width: 100%;
        display: flex;
        align-items: baseline;
        justify-content: space-between;
      "
    >
      <h3>{{ comment?.content }}</h3>
      <div class="comment-container">
        <span>{{ comment?.user_id.username }}</span>
        <span class="comment-like-button" @click="likesArticleComment">
          <div v-if="isLikes">{{ comment.like_users.length }} ❤️</div>
          <div v-else>{{ comment.like_users.length }} 🤍</div>
        </span>
      </div>
    </div>
    <div
      style="
        width: 100%;
        display: flex;
        align-items: baseline;
        justify-content: space-between;
      "
    >
      <p>{{ createdAt }}</p>
      <button
        v-if="isActive"
        style="all: unset; cursor: pointer"
        @click="deleteReviewComment"
      >
        삭제
      </button>
    </div>
    <hr />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ReviewCommentItem",
  props: {
    comment: Object,
  },
  computed: mapState({
    userInfo: (state) => state.accounts.userInfo,
    createdAt() {
      return this.comment?.created_at.slice(0, 10);
    },
    isActive() {
      if (this.comment.user_id.id == this.$store.state.accounts.userInfo.id) {
        return true;
      } else {
        return false;
      }
    },
    isLikes() {
      if (this.comment.like_users.includes(this.userInfo.id)) {
        return true;
      } else {
        return false;
      }
    },
  }),
  methods: {
    deleteReviewComment() {
      this.$store.dispatch("deleteReviewComment", this.comment);
    },
    likesArticleComment() {
      this.$store.dispatch("likesArticleComment", this.comment.id);
    },
  },
};
</script>

<style>
.comment-like-button {
  display: flex;
  position: absolute;
  right: 2vw;
  margin-top: 5px;
  cursor: pointer;
}
</style>
