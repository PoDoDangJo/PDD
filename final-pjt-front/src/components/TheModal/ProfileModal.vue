<template>
  <div class="modal">
    <div class="overlay" @click="closeProfileModal"></div>

    <div class="modal-card">
      <div class="profile__info">
        <h1>{{ userInfo.username }}</h1>
        <p>처음 만난 날 : {{ userInfo.date_joined.slice(0, 10) }}</p>
      </div>
      <div class="profile-detail">
        <div class="dropdown">
          <div class="select">
            <span>Select Gender</span>
          </div>
          <ul class="dropdown-menu">
            <li>
              <button
                :class="{ is__active: rateMoviePage }"
                @click="goRateMoviePage()"
              >
                영화
              </button>
            </li>
            <li>
              <button
                :class="{ is__active: articlePage }"
                @click="goArticlePage()"
              >
                글
              </button>
            </li>
            <li>
              <button
                :class="{ is__active: commentPage }"
                @click="goCommentPage()"
              >
                댓글
              </button>
            </li>
            <li>
              <button
                :class="{ is__active: likeRatePage }"
                @click="goLikeRatePage()"
              >
                좋아한 평가
              </button>
            </li>
            <li>
              <button
                :class="{ is__active: likeArticlePage }"
                @click="goLikeArticlePage()"
              >
                좋아한 글
              </button>
            </li>
            <li>
              <button
                :class="{ is__active: likeCommentPage }"
                @click="goLikeCommentPage()"
              >
                좋아한 댓글
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="detail__components">
        <ProfileRateMovie
          v-if="rateMoviePage"
          :myRatingMovies="userInfo.rating"
        />
        <ProfileAritcle v-if="articlePage" :review="userInfo.review" />
        <ProfileComment
          v-if="commentPage"
          :community_comment="userInfo.community_comment"
        />
        <ProfileLikeRate
          v-if="likeRatePage"
          :like_rating="userInfo.like_rating"
        />
        <ProfileLikeArticle
          v-if="likeArticlePage"
          :like_reviews="userInfo.like_reviews"
        />
        <ProfileLikeComment
          v-if="likeCommentPage"
          :like_comments="userInfo.like_comments"
        />
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
    username: (state) => state.accounts.userInfo.username,
    userInfo: (state) => state.accounts.curUserInfo,
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
.detail__components {
  position: relative;
  width: 100%;
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

/*Styling Selectbox*/
.dropdown {
  width: 200px;
  display: inline-block;
  background-color: #141414;
  border-radius: 2px;
  box-shadow: 0 0 2px rgb(204, 204, 204);
  transition: all 0.5s ease;
  position: relative;
  font-size: 14px;
  color: #dddcfb;
  height: 100%;
  text-align: left;
}
.dropdown .select {
  cursor: pointer;
  display: block;
  padding: 10px;
}
.dropdown .select > i {
  font-size: 13px;
  color: #888;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  float: right;
  line-height: 20px;
}
.dropdown:hover {
  box-shadow: 0 0 4px rgb(204, 204, 204);
}
.dropdown:active {
  background-color: #f8f8f8;
}
.dropdown.active:hover,
.dropdown.active {
  box-shadow: 0 0 4px rgb(204, 204, 204);
  border-radius: 2px 2px 0 0;
  background-color: #f8f8f8;
}
.dropdown.active .select > i {
  transform: rotate(-90deg);
}
.dropdown .dropdown-menu {
  position: absolute;
  background-color: #fff;
  width: 100%;
  left: 0;
  margin-top: 1px;
  box-shadow: 0 1px 2px rgb(204, 204, 204);
  border-radius: 0 1px 2px 2px;
  overflow: hidden;
  display: none;
  max-height: 144px;
  overflow-y: auto;
  z-index: 9;
}
.dropdown .dropdown-menu li {
  padding: 10px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}
.dropdown .dropdown-menu {
  padding: 0;
  list-style: none;
}
.dropdown .dropdown-menu li:hover {
  background-color: #f2f2f2;
}
.dropdown .dropdown-menu li:active {
  background-color: #e2e2e2;
}
</style>
