<template>
  <div class="modal">
    <div class="overlay" @click="closeLogInModal"></div>
    <form class="modal-form" @submit.prevent="logIn, openSignUpModal">
      <input
        type="text"
        id="username"
        placeholder="아이디"
        v-model="username"
        required
      /><br />
      <input
        type="password"
        id="password"
        placeholder="비밀번호"
        v-model="password"
        required
      /><br />
      <button type="submit" @click="logIn">로그인</button>
      <button type="submit" @click="openSignUpModal">회원가입</button>
    </form>
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

.modal-form {
  position: relative;
  max-width: 50%;
  margin: 30px auto;
  padding: 20px;
  background-color: #141414;
  min-height: 500px;
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

button {
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}
</style>
