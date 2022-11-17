<template>
  <header>
    <router-link :to="{ name: 'HomeView' }">
      <img class="logo" src="@/assets/icons/logo.png" alt="logo" />
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
      return this.$store.getters.isLogin;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
    },
  },
};
</script>

<style>
header {
  position: fixed;
  width: 100%;
  height: 6vw;
  min-height: 40px;
  max-height: 60px;
  z-index: 5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  height: 3vw;
  min-height: 20px;
  max-height: 35px;
  margin-left: 2vw;
  display: flex;
  align-items: center;
  will-change: transform;
  transition: 1s;
}

.logo:hover {
  transform: rotate(720deg);
}

.navbar {
  width: 7vw;
  min-width: 110px;
  max-width: 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 2vw;
}

button {
  all: unset;
}
</style>
