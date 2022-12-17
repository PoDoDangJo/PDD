<template>
  <div>
    <div class="review__card" @click="openReviewModal">
      <div class="review__id">
        <h4>{{ index }}</h4>
      </div>
      <div class="review__title">
        <h4>{{ title }}</h4>
      </div>
      <div class="review__create_at">
        <h4>{{ created }}</h4>
      </div>
      <div class="review__username">
        <h4>{{ review?.user_id.username }}</h4>
      </div>
    </div>
    <div>
      <hr id="theLine" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ArticleItem",
  props: {
    review: Object,
  },
  computed: mapState({
    reviews: (state) => state.reviews.allReviews,
    index() {
      return this.reviews.indexOf(this.review) + 1;
    },
    created() {
      return this.review.created_at.slice(0, 10);
    },
    title() {
      if (this.review.spoiler) {
        return "스포일러를 주의하시고 누르세요.";
      } else {
        return this.review?.title.slice(0, 10);
      }
    },
  }),
  methods: {
    openReviewModal() {
      this.$store.dispatch("openReviewModal", this.review.id);
    },
  },
};
</script>

<style scoped>
.review__card {
  display: flex;
  margin: 0;
  cursor: pointer;
}

.review__card * {
  display: flex;
  justify-content: start;
  align-items: center;
  height: calc(10px + 2vw);
}

h4 {
  font-size: calc(8px + 80%);
  margin: 1vw 0 1vw 1vw;
  text-align: start;
}

.review__id {
  flex: 1;
}

.review__title {
  flex: 12;
}
.review__create_at {
  flex: 3;
}

.review__username {
  flex: 2;
}
</style>
