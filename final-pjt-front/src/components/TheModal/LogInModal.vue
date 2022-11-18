<template>
  <div class="modal">
    <div class="overlay" @click="closeLogInModal"></div>
    <div class="modal-form">
      <div class="login__info">
        <img class="logo" src="@/assets/icons/logo.png" alt="" />
        <h1 class="login__info__text">로그인</h1>
      </div>
      <form @submit.prevent="logIn, openSignUpModal">
        <input
          type="search"
          id="username"
          placeholder="아이디"
          v-model="username"
          required
        />
        <input
          type="password"
          id="password"
          placeholder="비밀번호"
          v-model="password"
          required
        />
        <div class="form__button__box">
          <button class="btn__hover btn__color" type="submit" @click="logIn">
            로그인
          </button>
          <button
            class="btn__hover btn__color"
            type="submit"
            @click="openSignUpModal"
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LogInModal",
  data() {
    return {
      username: null,
      password: null,
    };
  },
  methods: {
    ...mapActions(["closeLogInModal", "openSignUpModal"]),
    logIn() {
      const payload = {
        username: this.username,
        password: this.password,
      };
      this.$store.dispatch("logIn", payload);
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

.login__info {
  width: 50%;
  display: inline-block;
  margin: 0 25%;
}

.login__info__text {
  text-align: center;
  margin: 50px 0;
}

.logo {
  margin: 10px 10%;
  width: 80%;
}

.modal-form {
  position: relative;
  max-width: 30%;
  margin: 30px auto;
  padding: 20px;
  background: #141414;
  min-height: 400px;
  z-index: 10;
  border-radius: 5px;
}

input[type="search"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 20px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 5px;
}

input[type="text"]::-ms-clear {
  display: none;
}

.form__button__box {
  margin: 8px 0;
  display: flex;
  justify-content: space-between;
}

.btn__hover {
  width: 14.4vw;
  min-width: 85px;
  max-width: 184pxx;
  margin: 8px 0;

  font-size: 16px;
  font-weight: 600;
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

.btn__hover:hover {
  background-position: 100% 0;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.6s ease-in-out;
  transition: all 0.8s ease-in-out;
}

.btn__hover.btn__color {
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
</style>
