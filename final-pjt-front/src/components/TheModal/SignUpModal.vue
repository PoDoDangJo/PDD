<template>
  <div class="modal">
    <div class="overlay" @click="closeSignUpModal"></div>
    <form class="modal-form" @submit.prevent="signUp">
      <input
        type="text"
        id="username"
        placeholder="아이디"
        v-model="username"
        required
      /><br />
      <input
        type="password"
        id="password1"
        placeholder="비밀번호"
        v-model="password1"
        required
      /><br />
      <input
        type="password"
        id="password2"
        placeholder="비밀번호 확인"
        v-model="password2"
        required
      /><br />
      <button type="submit" @click="signUp">회원가입</button>
    </form>
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
      const payload = {
        username: this.username,
        password1: this.password1,
        password2: this.password2,
      };
      this.$store.dispatch("signUp", payload);
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
  min-height: 80%;
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
