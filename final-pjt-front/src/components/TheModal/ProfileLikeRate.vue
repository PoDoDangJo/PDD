<template>
  <div class="comments_container">
    <DetailCommentItem v-for="rate in like_rates" :key="rate.id" :rate="rate" />
  </div>
</template>

<script>
import DetailCommentItem from "./DetailModal/DetailCommentItem.vue";

export default {
  name: "DetailSimilar",
  components: {
    DetailCommentItem,
  },
  props: {
    like_rates: Array,
  },
  methods: {
    openDetailModal(movie) {
      this.$store.dispatch("openDetailModal", movie.movie_id);
    },
  },
};
</script>

<style scoped>
.comments_container {
  width: 90%;
  margin: 1vw 2vw;
  display: flex;
  flex-direction: column;
}
</style>
