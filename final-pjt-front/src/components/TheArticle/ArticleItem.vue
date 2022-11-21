<template>
  <div class="review__card" @click="openReviewModal">
    <div class="review__id">
      <h4>{{ review?.id }}</h4>
      <h4>|</h4>
    </div>
    <div class="review__title">
      <h4>{{ review?.title }}</h4>
      <h4>|</h4>
    </div>
    <div class="review__create_at">
      <h4>{{ review?.created_at }}</h4>
      <h4>|</h4>
    </div>
    <hr />
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

<style scoped>
h4 {
  font-size: calc(8px + 1vw);
  margin: 1vw 2vw;
  display: inline;
  text-align: start;
}

.review__id {
  display: inline;
}

.review__title {
  display: inline;
}
.review__create_at {
  display: inline;
}
</style>
