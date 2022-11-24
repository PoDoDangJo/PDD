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
      <h1>{{ comment?.content }}</h1>
      <p>{{ comment?.user_id.username }}</p>
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
      <button style="all: unset; cursor: pointer" @click="deleteReviewComment">
        삭제
      </button>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: "ReviewCommentItem",
  props: {
    comment: Object,
  },
  computed: {
    createdAt() {
      return this.comment?.created_at.slice(0, 10);
    },
  },
  methods: {
    deleteReviewComment() {
      this.$store.dispatch("deleteReviewComment", this.comment);
    },
  },
};
</script>

<style></style>
