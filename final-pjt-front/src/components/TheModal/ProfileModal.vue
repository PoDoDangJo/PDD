<template>
  <div class="modal" id="modal-container">
    <div class="overlay" @click="closeProfileModal"></div>

    <div class="modal-card">
      <div class="profile__info">
        <!-- <img class="profile" src="@/assets/icons/logo.png" alt="" /> -->
        <h1 class="profile__info__text">{{ username }}</h1>
        <p>처음 만난 날 : {{ userInfo.date_joined.slice(0, 10) }}</p>
      </div>
      <div class="profile-detail">
        <div class="detail__components__nav">
          <div class="button__container">
            <button
              :class="{ is__active: rateMoviePage }"
              @click="goRateMoviePage()"
            >
              내 영화
            </button>
            <button
              :class="{ is__active: articlePage }"
              @click="goArticlePage()"
            >
              내 글
            </button>
            <button
              :class="{ is__active: commentPage }"
              @click="goCommentPage()"
            >
              내 댓글
            </button>
            <button
              :class="{ is__active: likeRatePage }"
              @click="goLikeRatePage()"
            >
              좋아요한 평가
            </button>
            <button
              :class="{ is__active: likeArticlePage }"
              @click="goLikeArticlePage()"
            >
              좋아요한 글
            </button>
            <button
              :class="{ is__active: likeCommentPage }"
              @click="goLikeCommentPage()"
            >
              좋아요한 댓글
            </button>
          </div>
        </div>
      </div>
      <div class="detail__components">
        <ProfileRateMovie v-if="rateMoviePage" />
        <ProfileAritcle v-if="articlePage" />
        <ProfileComment v-if="commentPage" />
        <ProfileLikeRate v-if="likeRatePage" />
        <ProfileLikeArticle v-if="likeArticlePage" />
        <ProfileLikeComment v-if="likeCommentPage" />
      </div>
      <!-- <h2>내가 좋아하는 영화</h2>
      <h3>{{userInfo?.id}}</h3>
      <h2>내가 좋아하는 영화평가</h2>
      <h3>{{userInfo?.rating}}</h3> 
      <h2>내가 좋아하는 글</h2>
      <h3>{{userInfo?.id}}</h3>
      <h2>내가 좋아하는 댓글</h2>
      <h3>{{userInfo?.id}}</h3> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ProfileRateMovie from "./ProfileRateMovie.vue";
import ProfileAritcle from "./ProfileAritcle.vue";
import ProfileComment from "./ProfileComment.vue";
import ProfileLikeRate from "./ProfileLikeRate.vue";
import ProfileLikeArticle from "./ProfileLikeArticle.vue";
import ProfileLikeComment from "./ProfileLikeComment.vue";

export default {
  name: "ProfileModal",
  components: {
    ProfileRateMovie,
    ProfileAritcle,
    ProfileComment,
    ProfileLikeRate,
    ProfileLikeArticle,
    ProfileLikeComment,
  },
  data() {
    return {
      rateMoviePage: true,
      articlePage: false,
      commentPage: false,
      likeRatePage: false,
      likeArticlePage: false,
      likeCommentPage: false,
    };
  },
  computed: mapState({
    userInfo: (state) => state.userInfo,
    username: (state) => state.username,
  }),
  methods: {
    ...mapActions(["getUserProfile", "closeProfileModal"]),
    goRateMoviePage() {
      this.rateMoviePage = true;
      this.articlePage = false;
      this.commentPage = false;
      this.likeRatePage = false;
      this.likeArticlePage = false;
      this.likeCommentPage = false;
    },
    goArticlePage() {
      this.rateMoviePage = false;
      this.articlePage = true;
      this.commentPage = false;
      this.likeRatePage = false;
      this.likeArticlePage = false;
      this.likeCommentPage = false;
    },
    goCommentPage() {
      this.rateMoviePage = false;
      this.articlePage = false;
      this.commentPage = true;
      this.likeRatePage = false;
      this.likeArticlePage = false;
      this.likeCommentPage = false;
    },
    goLikeRatePage() {
      this.rateMoviePage = false;
      this.articlePage = false;
      this.commentPage = false;
      this.likeRatePage = true;
      this.likeArticlePage = false;
      this.likeCommentPage = false;
    },
    goLikeArticlePage() {
      this.rateMoviePage = false;
      this.articlePage = false;
      this.commentPage = false;
      this.likeRatePage = false;
      this.likeArticlePage = true;
      this.likeCommentPage = false;
    },
    goLikeCommentPage() {
      this.rateMoviePage = false;
      this.articlePage = false;
      this.commentPage = false;
      this.likeRatePage = false;
      this.likeArticlePage = false;
      this.likeCommentPage = true;
    },
  },
  created() {
    this.getUserProfile(this.userInfo.username);
  },
};
</script>

<style scoped>
.profile__info {
  width: 50%;
  display: inline-block;
  margin: 0 25%;
}

.profile__info__text {
  text-align: center;
  margin: 20px 0;
}

.profile {
  margin: 10px 10%;
  width: 80%;
  border-radius: 70%;
}

.detail__components__nav {
  position: absolute;
  top: calc(18vw);
  height: calc(35px + 3vw);
  width: 100%;
  background-image: linear-gradient(to bottom, #141414 90%, #14141400 100%);
}

.detail__components {
  position: absolute;
  top: calc(130px + 20vw);

  width: 100%;
}

.button__container {
  display: flex;
  justify-content: space-between;

  font-weight: 600;
  margin: 0 2vw;
  margin-top: 1vw;
  align-items: center;
  width: calc(180px + 10vw);
  min-width: 260px;
  max-width: 800px;
}

.button__container > button {
  font-size: calc(10px + 0.5vw);
  cursor: pointer;
  z-index: 1;
  margin-top: calc(10px + 1vw);
}

button {
  all: unset;
  text-align: center;
  color: #dddcfb;
}

.is__active {
  color: #614af2;
}

/* 아래는 기본 */
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
  min-height: 700px;
  z-index: 10;
  border-radius: 5px;
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
</style>
