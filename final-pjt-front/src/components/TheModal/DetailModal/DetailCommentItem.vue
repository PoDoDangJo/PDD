<template>
  <div>
    <p>{{ rate?.comment }}</p>
  </div>
</template>

<script>
export default {
  name: "DetailCommentItem",
  props: {
    rate: Object,
  },
};
</script>

<style></style>
