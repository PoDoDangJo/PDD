<template>
  <nav class="pinnung-header">
    <img class="logo" src="@/assets/logo.png" alt="logo" @click="goToHome">
    <img class="search" src="@/assets/search.png" alt="search">
  </nav>
</template>

<script>
export default {
  name: 'TheNavbar',
  data() {
    return {
      
    }
  },
  methods: {
    goToHome() {
      this.$router.push({ name: 'HomeView' })
    }
  },
}
</script>

<style>
.pinnung-header {
  height: 70px;
  background: #141414;
  align-content: center;
}

.logo {
  height: 30px;
}

.search {
  
  height: 30px;
}
</style>