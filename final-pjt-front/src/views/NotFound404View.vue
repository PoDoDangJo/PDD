<template>
  <div>
    <div>
      <h1>404 Not Found</h1>
      <router-link :to="{ name: 'HomeView' }">Go To Home</router-link>
    </div>

    <img src="@/assets/images/black-panther.webp" width="100%" />
  </div>
</template>

<script>
export default {
  name: "NotFound404View",
};
</script>

<style></style>
