<template>
  <div class="modal">
    <div class="overlay" @click="closeProfileModal"></div>

    <div class="modal-card">
      <div class="profile__info">
        <h1>{{ curUserInfo.username }}</h1>
        <p>처음 만난 날 : {{ curUserInfo.date_joined.slice(0, 10) }}</p>
      </div>
      <div class="profile-detail">
        <div class="dropdown">
          <div class="select">
            <span>카테고리 선택</span>
          </div>
          <ul class="dropdown-menu">
            <li :class="{ is__active: rateMoviePage }" @click="goRateMoviePage">
              영화
            </li>
            <li :class="{ is__active: articlePage }" @click="goArticlePage">
              글
            </li>
            <li :class="{ is__active: commentPage }" @click="goCommentPage">
              댓글
            </li>
            <li :class="{ is__active: likeRatePage }" @click="goLikeRatePage">
              좋아한 평가
            </li>
            <li
              :class="{ is__active: likeArticlePage }"
              @click="goLikeArticlePage"
            >
              좋아한 글
            </li>
            <li
              :class="{ is__active: likeCommentPage }"
              @click="goLikeCommentPage"
            >
              좋아한 댓글
            </li>
          </ul>
        </div>
      </div>
      <div class="detail__components">
        <ProfileRateMovie
          v-if="rateMoviePage"
          :myRatingMovies="curUserInfo.rating"
        />
        <ProfileAritcle v-if="articlePage" :review="curUserInfo.review" />
        <ProfileComment
          v-if="commentPage"
          :community_comment="curUserInfo.community_comment"
        />
        <ProfileLikeRate
          v-if="likeRatePage"
          :like_rating="curUserInfo.like_rating"
        />
        <ProfileLikeArticle
          v-if="likeArticlePage"
          :like_reviews="curUserInfo.like_reviews"
        />
        <ProfileLikeComment
          v-if="likeCommentPage"
          :like_comments="curUserInfo.like_comments"
        />
      </div>
      <div
        class="delete-button"
        v-if="userInfo.username == curUserInfo.username"
        @click="deleteAccounts"
      >
        회원탈퇴
      </div>
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
    userInfo: (state) => state.accounts.userInfo,
    curUserInfo: (state) => state.accounts.curUserInfo,
    username() {
      return this.userInfo.username;
    },
  }),
  methods: {
    ...mapActions(["closeProfileModal", "getUserProfile"]),
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
    deleteAccounts() {
      alert("이 선택은 되돌릴 수 없습니다.");
      this.$store.dispatch("deleteAccounts", this.username);
      this.closeProfileModal();
    },
  },
  created() {
    this.getUserProfile(this.username);
  },
};
</script>

<style scoped>
.profile-detail {
  margin: 0 2vw;
}
.profile__info {
  width: 80%;
  display: inline-block;
  margin: 0 2vw;
}
.profile__info > h1 {
  color: #8d7fe8;
}
.detail__components {
  position: relative;
  width: 100%;
}

.is__active {
  color: #614af2;
  background-color: #242424;
}

/* 아래는 기본 */
.modal {
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
  width: 90%;
  /* same */
  min-width: 200px;
  max-width: 800px;
  margin: 30px auto;
  background-color: #141414;
  min-height: 750px;
  z-index: 10;
  border-radius: 5px;
}

.delete-button {
  position: absolute;
  bottom: 2vw;
  right: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  border: 1px solid #8d7fe8;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
}
</style>
