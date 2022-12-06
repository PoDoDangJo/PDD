<template>
  <header class="header__black navbar">
    <nav class="nav">
      <router-link :to="{ name: 'HomeView' }">
        <img class="logo" src="@/assets/icons/logo.png" alt="logo" />
      </router-link>

      <!-- Token이 있는 경우 -->
      <div class="article__nav" v-if="isLogIn">
        <div v-if="!isCommunity">
          <router-link :to="{ name: 'CommunityView' }" class="nav__text">
            게시판
          </router-link>
        </div>
        <div v-else>
          <button class="nav__text" @click="openCreateReviewModal">
            게시글 작성
          </button>
        </div>
      </div>
    </nav>
    <nav class="nav">
      <SearchBar class="search" v-if="!isCommunity" />
      <!-- Token이 없을 경우 -->
      <div class="nav__text__box" v-if="!isLogIn">
        <button class="nav__text" @click="openLogInModal">로그인</button>
        <button class="nav__text" @click="openSignUpModal">회원가입</button>
      </div>
      <!-- Token이 있는 경우 -->
      <ul class="nav__text__box" v-else>
        <button class="nav__text" @click="openProfileModal">프로필</button>
        <button class="nav__text" @click="logOut">로그아웃</button>
      </ul>
    </nav>
  </header>
</template>

<script>
import SearchBar from "@/components/TheHeader/SearchBar";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TheHeader",
  components: {
    SearchBar,
  },
  computed: {
    ...mapGetters(["isLogIn", "isCommunity"]),
  },
  methods: {
    ...mapActions([
      "openLogInModal",
      "openSignUpModal",
      "openProfileModal",
      "logOut",
      "openCreateReviewModal",
    ]),
  },
};
</script>

<style scoped>
ul {
  padding: 0;
}
.header__black {
  position: fixed;
  top: 0px;
  width: 100%;
  height: 6vw;
  min-height: 40px;
  max-height: 60px;
  z-index: 5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header__black:not(.solid) {
  background-color: transparent;
}

.logo {
  height: 2vw;
  min-height: 15px;
  max-height: 25px;
  margin-left: 3vw;
  display: flex;
  align-items: center;
  will-change: transform;
  transition: 1s;
}

.search {
  display: flex;
  align-items: center;
  height: 100%;
  transition: all 0.4s;
}

.logo:hover {
  transform: scale(1.3);
}

.nav {
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 3vw;
}

.article__nav {
  display: flex;
  align-items: center;
  margin-left: 2vw;
}

.nav__text__box {
  width: 8vw;
  min-width: 110px;
  max-width: 180px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav__text {
  text-shadow: 1px 1px 2px#141414;
  font-size: calc(10px + 0.5vw);
  cursor: pointer;
}

button {
  all: unset;
  text-align: center;
}
</style>
