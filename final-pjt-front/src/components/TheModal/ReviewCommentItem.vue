<template>
  <div>
    <h1>{{ comment?.content }}</h1>
    <p>{{ comment?.created_at }}</p>
  </div>
</template>

<script>
export default {
  name: "ReviewCommentItem",
  props: {
    comment: Object,
  },
  computed: {
    // created() {
    //   return this.comment?.created_at.slice(0, 10);
    // },
  },
};
</script>

<style></style>
