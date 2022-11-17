<template>
  <header>
    <router-link :to="{ name: 'HomeView' }">
      <img class="logo" src="@/assets/images/logo.png" alt="logo">
    </router-link>
    <nav class="navbar">
      <div v-if="!isLogin">
        <router-link :to="{ name: 'LoginView' }">Login</router-link>
        <router-link :to="{ name: 'SignUpView' }">Sign Up</router-link>
      </div>
      <div v-else>
        <router-link :to="{ name: 'ProfileView' }">Profile</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    }
  },
  methods: {},
};
</script>

<style>
header {
  display: flex;
  justify-content: space-between;
  margin: 10px 5vw;
}

.logo {
  height: 30px;
}

.navbar {
  display: flex;
  justify-content: space-between;
}
</style>