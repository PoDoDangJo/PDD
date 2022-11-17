<template>
  <header>
    <router-link :to="{ name: 'HomeView' }">
      <img class="logo" src="@/assets/images/logo.png" alt="logo">
    </router-link>
    <nav class="navbar">
      <div class="navbar" v-if="!isLogin">
        <router-link :to="{ name: 'LoginView' }">Login</router-link>
        <router-link :to="{ name: 'SignUpView' }">Sign up</router-link>
      </div>
      <div class="navbar" v-else>
        <router-link :to="{ name: 'ProfileView' }">Profile</router-link>
        <button @click="logOut">Log out</button>
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
  methods: {
    logOut() {
      this.$store.dispatch('logOut')
    }
  },
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
  width: 7vw;
  min-width: 110px;
  max-width: 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
