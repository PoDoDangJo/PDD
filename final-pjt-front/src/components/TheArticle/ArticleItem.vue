<template>
  <div class="review-card" @click="openDetailModal">
    <h1 class="review-title">{{ review?.title }}</h1>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    review: Object,
  },
};
</script>

<style></style>
