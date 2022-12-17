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
      <div class="right-rate-nav">
        <span>{{ rate.user_id.username }}</span>
        <span class="rate-like-button" @click="likesMovieRate">
          <div v-if="isLikes">{{ rate.like_users.length }} ❤️</div>
          <div v-else>{{ rate.like_users.length }} 🤍</div>
        </span>
      </div>
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
    curUserInfo: (state) => state.accounts.curUserInfo,
    isLikes() {
      if (this.rate.like_users.includes(this.userInfo.id)) {
        return true;
      } else {
        return false;
      }
    },
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
      if (this.rate.user_id == this.userInfo.id) {
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
    likesMovieRate() {
      this.$store.dispatch("likesMovieRate", this.rate.id);
    },
  },
};
</script>

<style>
#full-stars-example {
  display: flex;
  justify-content: space-between;
}

.right-rate-nav {
  display: inline-block;
}

.rate-like-button {
  display: flex;
  position: relative;
  justify-content: end;
  margin-top: 5px;
}

.movie-comment {
  display: block;
  margin: 10px 0;
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

.rate-like-button {
  cursor: pointer;
}
</style>
