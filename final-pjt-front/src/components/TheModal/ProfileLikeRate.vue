<template>
  <div class="comments_container">
    <DetailCommentItem
      v-for="rate in myLikeRates"
      :key="rate.id"
      :rate="rate"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import DetailCommentItem from "./DetailModal/DetailCommentItem.vue";

export default {
  name: "DetailSimilar",
  components: {
    DetailCommentItem,
  },
  computed: mapState({
    myLikeRates: (state) => state.accounts.curUserInfo.like_rating,
  }),
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
