<template>
  <div class="detail__comments">
    <div v-if="!isLogin" @click="openLogInModal" class="overlay">
      로그인해야 보임
    </div>
    <div v-if="youCanRate" :class="{ is__blur: !isLogin }">
      <div class="comment_info">
        <StarRate class="star__container" @rating="rating" />
        <p class="count-length">{{ commentLength }} / 200</p>
      </div>
      <div class="comment_conainer">
        <textarea
          name="movie_comment"
          placeholder="영화에 대한 평가를 남겨주세요."
          class="movie_comment"
          maxlength="200"
          v-model="movieComment"
          rows="4"
        />
        <div class="spolier__box">
          <input
            type="checkbox"
            id="spolier-check"
            name="spolier"
            v-model="isSpolier"
          />
          <label for="spolier">잠깐! 스포일러가 될 수 있어요.</label>
        </div>
        <button class="comment_button btn__color" @click="createMovieRate">
          댓글 작성
        </button>
      </div>
    </div>
    <div class="comments_conainer" v-else>
      <DetailCommentItem v-for="rate in rates" :key="rate.id" :rate="rate" />
    </div>
  </div>
</template>

<script>
import StarRate from "@/components/StarRate";
import DetailCommentItem from "@/components/TheModal/DetailModal/DetailCommentItem";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "DetailComments",
  props: {
    movie: Object,
  },
  components: {
    StarRate,
    DetailCommentItem,
  },
  data() {
    return {
      score: "5",
      movieComment: "",
      isSpolier: false,
    };
  },
  computed: mapState({
    ...mapGetters(["isLogin", "youCanRate"]),
    rates: (state) => state.allRates,
    commentLength() {
      return String(this.movieComment).length;
    },
  }),
  methods: {
    ...mapActions(["openLogInModal"]),
    createMovieRate() {
      const payload = {
        movie_id: this.movie.id,
        rate: this.score,
        comment: this.movieComment,
        spoiler: this.isSpolier,
      };
      this.$store.dispatch("createMovieRate", payload);
      // location.reload();
    },
    rating(score) {
      score;
      console.log("hi");
    },
  },
};
</script>

<style scoped>
.overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  z-index: 10;
  color: #a261f5;
  font-weight: 600;
  cursor: pointer;
}
.detail__comments {
  width: calc(100% - 20px);
  margin: 2vw;
}
.spolier__box {
  font-size: calc(6px + 0.3vw);
  color: #a261f5;
  display: flex;
  justify-content: start;
  align-items: center;
}
.comment_conainer {
  width: 90%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
  border: 0.0625rem solid rgb(238, 238, 238);
  background-color: #fff;
}
.movie_comment {
  border: none;

  outline: none;
  min-width: 200px;
  max-width: 800px;
  resize: none;
}

.comment_info {
  width: 92%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.count-length {
  font-size: calc(4px + 0.5vw);
  width: 92%;
  display: flex;
  justify-content: end;
}

.comment_button {
  width: 100%;

  font-size: calc(8px + 0.5vw);
  font-weight: 400;
  color: #fff;
  cursor: pointer;

  height: 40px;
  text-align: center;
  border: none;
  background-size: 500% 100%;

  border-radius: 5px;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.6s ease-in-out;
  transition: all 0.8s ease-in-out;
}

.comment_button:hover {
  background-position: 100% 0;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.6s ease-in-out;
  transition: all 0.8s ease-in-out;
}

.comment_button.btn__color {
  background-image: linear-gradient(
    to right,
    #a261f5,
    #614af2,
    #a261f5,
    #dddcfb,
    #a261f5,
    #614af2,
    #a261f5
  );
}

.comments_conainer {
  width: 90%;
  padding: 10px;
  display: flex;
  flex-direction: column;
}
</style>
