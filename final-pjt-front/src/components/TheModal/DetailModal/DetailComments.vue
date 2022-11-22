<template>
  <div class="detail__comments">
    <div class="comment_info">
      <StarRate class="star__container" />
      <p class="count-length">{{ commentLength }} / 200</p>
    </div>
    <div class="comment_conainer">
      <textarea
        name="movie_comment"
        placeholder="영화에 대한 평가를 내려주세요."
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
      <button class="comment_button btn__color">댓글 작성</button>
    </div>
    <br />
    <div class="comments_conainer"></div>
  </div>
</template>

<script>
import StarRate from "@/components/StarRate";

export default {
  name: "DetailComments",
  components: {
    StarRate,
  },
  data() {
    return {
      movieComment: "",
      isSpolier: false,
    };
  },
  computed: {
    commentLength() {
      return String(this.movieComment).length;
    },
  },
};
</script>

<style scoped>
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
  border-radius: 0.25rem;
  border: 0.0625rem solid rgb(0, 0, 0, 0.6);
}
</style>
