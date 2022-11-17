<template>
  <div>
    <h1>Sign Up</h1>
    <form @submit.prevent="signUp">
      <input type="text" placeholder="username" v-model="username" /><br>
      <input type="password" placeholder="password" v-model="password1" /><br>
      <input type="password" placeholder="password check" v-model="password2" /><br>
      <input type="submit" value="SignUp">
    </form>
  </div>
</template>

<script>
export default {
  name: "SignUpView",
  data() {
    return {
      username: null,
      password1: null,
      password2: null,
    }
  },
  methods: {
    signUp() {
      const username = this.username
      const password1 = this.password1
      const password2 = this.password2

      if (password1 == password2) {
        const payload = {
          username, password1, password2
        }
        this.$store.dispatch('signUp', payload)
      } else {
        alert('비밀번호 확인 결과가 같지 않습니다.')
        this.password1 = null
        this.password2 = null
      }
    }
  },
};
</script>
