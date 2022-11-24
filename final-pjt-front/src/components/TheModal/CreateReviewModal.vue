<template>
  <div class="modal" id="modal-container">
    <div class="overlay" @click="closeCreateReviewModal"></div>
    <div class="modal-card">
      <h1>게시글 작성!</h1>
      <div class="article_conainer">
        <textarea
          name="article_title"
          placeholder="제목을 입력해주세용."
          class="article"
          maxlength="20"
          v-model="aritcleTitle"
          rows="4"
        />
      </div>
      <br />
      <div class="article_conainer">
        <textarea
          name="article_content"
          placeholder="내용을 입력해 주세용."
          class="article"
          maxlength="200"
          v-model="articleContent"
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
        <button class="article_button btn__color" @click="createReview">
          게시글 작성
        </button>
      </div>
      <br />
      <div class="articles_conainer"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateReviewModal",
  data() {
    return {
      aritcleTitle: null,
      articleContent: null,
      isSpolier: false,
    };
  },
  methods: {
    closeCreateReviewModal() {
      this.$store.dispatch("closeCreateReviewModal");
    },
    createReview() {
      const payload = {
        title: this.aritcleTitle,
        content: this.articleContent,
        spoiler: this.isSpolier,
      };
      this.$store.dispatch("createReview", payload);
    },
  },
};
</script>

<style scoped>
.modal,
overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
}

.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  opacity: 0.5;
  background-color: black;
}

.modal-card {
  position: relative;
  width: 40%;

  /* same */
  min-width: 200px;
  max-width: 500px;
  margin: 30px auto;
  background-color: #141414;
  min-height: 500px;
  z-index: 10;
  border-radius: 5px;

  /* display: flex;
  justify-content: center; */
}

.modal-card-back-drop {
  position: relative;
  width: 100%;

  /* same */
  min-width: 200px;
  left: 0;
  top: 0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 65%,
    rgba(0, 0, 0, 0) 100%
  );
}

.modal-card-title {
  position: fixed;
  z-index: 2;

  margin: 1vw;
  font-size: calc(12px + 1vw);
  text-shadow: 1vw 1vw 1vw #141414;

  cursor: default;

  border-radius: 5px;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.6s ease-in-out;
  transition: all 0.8s ease-in-out;
}

.modal-card-title:hover {
  background-position: 100% 0;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.6s ease-in-out;
  transition: all 0.8s ease-in-out;
  color: linear-gradient(
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

.modal-card-overview {
  margin: 1vw;
  font-size: calc(4px + 0.7vw);
  text-align: justify;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
/* 붙여오기 한 부분 */
.detail__article {
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
.article_conainer {
  width: 90%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
  border: 0.0625rem solid rgb(238, 238, 238);
  background-color: #fff;
}
.article {
  border: none;

  outline: none;
  min-width: 200px;
  max-width: 800px;
  resize: none;
}

.article_info {
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

.article_button {
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

.article_button:hover {
  background-position: 100% 0;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.6s ease-in-out;
  transition: all 0.8s ease-in-out;
}

.article_button.btn__color {
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

.articles_conainer {
  width: 90%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
  border: 0.0625rem solid rgb(0, 0, 0, 0.6);
}
</style>
