<template>
  <div class="movie-comment">
    <div id="full-stars-example">
      <span class="rating__group">
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
      </span>
      <!-- <span>{{ username }}</span> -->
    </div>
    <p :class="{ spoiler: rate?.spoiler }">{{ rate?.comment }}</p>
    <div class="movie-comment-footer">
      <span class="rate-create">{{ created }}</span>
      <span v-if="checkRate" class="rate-delete-button" @click="deleteMovieRate"
        >삭제</span
      >
    </div>
    <hr />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DetailCommentItem",
  props: {
    rate: Object,
  },
  computed: mapState({
    userInfo: (state) => state.accounts.userInfo,
    // username: (state) => state.username
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
    created() {
      return this.rate.created_at.slice(0, 10);
    },

    checkRate() {
      if (this.rate.user_id.id == this.userInfo.id) {
        return true;
      } else {
        return false;
      }
    },
  }),
  methods: {
    deleteMovieRate() {
      this.$store.dispatch("deleteMovieRate", this.rate.id);
    },
  },
};
</script>

<style>
.movie-comment {
  display: inline;
  margin: 0;
  height: calc(100px + 1vw);
}

.rating__icon__star {
  color: orange;
}

.spoiler {
  filter: blur();
}

.movie-comment-footer {
  display: flex;
  justify-content: space-between;
}

.rate-create {
  font-size: calc(4px + 0.5vw);
}

.rate-delete-button {
  font-size: calc(6px + 0.5vw);
  cursor: pointer;
}
</style>
