<template>
  <div>
    <h1>Log In</h1>
    <!-- <SpiderMan/> -->
    <form @submit.prevent="logIn">
      <input type="text" id="username" v-model="username" /><br />
      <input type="password" id="password" v-model="password" /><br />
      <input type="submit" value="Log in" />
    </form>
  </div>
</template>

<script>
// import SpiderMan from '@/components/3D/SpiderMan'

export default {
  name: "LoginView",
  components: {
    // SpiderMan,
  },
  data() {
    return {
      username: null,
      password: null,
    };
  },
  methods: {
    logIn() {
      const username = this.username;
      const password = this.password;

      const payload = {
        username,
        password,
      };

      this.$store.dispatch("logIn", payload);
    },
  },
};
</script>
