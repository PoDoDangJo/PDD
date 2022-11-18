<template>
  <div class="modal">
    <div class="overlay" @click="closeSignUpModal"></div>
    <div class="modal-form">
      <div class="login__info">
        <img class="logo" src="@/assets/icons/logo.png" alt="" />
        <h1 class="login__info__text">회원가입</h1>
      </div>
      <form @submit.prevent="signUp">
        <input
          type="text"
          id="username"
          placeholder="아이디"
          v-model="username"
          required
        />
        <input
          type="password"
          id="password1"
          placeholder="비밀번호"
          v-model="password1"
          required
        />
        <input
          type="password"
          id="password2"
          placeholder="비밀번호 확인"
          v-model="password2"
          required
        />
        <button class="btn__hover btn__color" type="submit" @click="signUp">
          회원가입
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SignUpModal",
  data() {
    return {
      username: null,
      password1: null,
      password2: null,
    };
  },
  methods: {
    ...mapActions(["closeSignUpModal"]),
    signUp() {
      // 비밀번호 확인이 될 경우
      if (this.password1 == this.password2) {
        const payload = {
          username: this.username,
          password1: this.password1,
          password2: this.password2,
        };
        this.$store.dispatch("signUp", payload);
      } else {
        alert("비밀번호를 다시 확인해 주세요.");
      }
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

input[type="text"]::-ms-clear {
  display: none;
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

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.btn__hover {
  width: 100%;

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
