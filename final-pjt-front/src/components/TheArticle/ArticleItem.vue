<template>
  <div class="review-card" @click="openReviewModal">
    <h1 class="review-title">{{ review?.title }}</h1>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    review: Object,
  },
  methods: {
    openReviewModal() {
      this.$store.dispatch("openReviewModal", this.review.id);
    },
  },
};
</script>

<style></style>
