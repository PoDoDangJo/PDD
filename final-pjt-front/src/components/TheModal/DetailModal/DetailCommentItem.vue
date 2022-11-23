<template>
  <div class="movie-comment">
    <div id="full-stars-example">
      <div class="rating__group">
        <label
          aria-label="star"
          for="rating-5"
          :class="{ rating__icon__star: starOne }"
          ><i class="rating__icon fa fa-star"></i
        ></label>
        <label
          aria-label="star"
          for="rating-5"
          :class="{ rating__icon__star: starTwo }"
          ><i class="rating__icon fa fa-star"></i
        ></label>
        <label
          aria-label="star"
          for="rating-5"
          :class="{ rating__icon__star: starThree }"
          ><i class="rating__icon fa fa-star"></i
        ></label>
        <label
          aria-label="star"
          for="rating-5"
          :class="{ rating__icon__star: starFour }"
          ><i class="rating__icon fa fa-star"></i
        ></label>
        <label
          aria-label="star"
          for="rating-5"
          :class="{ rating__icon__star: starFive }"
          ><i class="rating__icon fa fa-star"></i
        ></label>
      </div>
    </div>
    <p>{{ rate?.comment }}</p>
  </div>
</template>

<script>
export default {
  name: "DetailCommentItem",
  props: {
    rate: Object,
  },
  computed: {
    starOne() {
      if (this.rate.rate >= 1) {
        return true;
      } else {
        return false;
      }
    },
    starTwo() {
      if (this.rate.rate >= 2) {
        return true;
      } else {
        return false;
      }
    },
    starThree() {
      if (this.rate.rate >= 3) {
        return true;
      } else {
        return false;
      }
    },
    starFour() {
      if (this.rate.rate >= 4) {
        return true;
      } else {
        return false;
      }
    },
    starFive() {
      if (this.rate.rate >= 5) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
.movie-comment {
  display: inline;
  margin: 0;
}

.rating__icon__star {
  color: orange;
}
</style>
