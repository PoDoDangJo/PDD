<template>
  <div id="content">
    <div id="canvas"></div>

    <div id="water-ripples">
      <div class="go-home">
        <h1>Not Found 404</h1>
        <p @click="goToHome">Go Back To Home</p>
      </div>
      <img
        class="backImages"
        :src="require(`@/assets/images/${movies}`)"
        alt="Photo by David Pisnoy on Unsplash"
        crossorigin
        data-sampler="planeTexture"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound404View",
  data() {
    return {
      movies: "black-adam.webp",
    };
  },
  methods: {
    goToHome() {
      this.$router.push({ name: "HomeView" });
      location.reload;
    },
  },
};
</script>

<style scoped>
h1 {
  margin: 0;
}
.go-home {
  width: 90%;
  height: 90%;
  z-index: 10;
  margin: auto auto;
  justify-content: flex-start;
  align-items: flex-start;
  opacity: 1;
}

p {
  cursor: pointer;
}

button {
  all: unset;
  cursor: pointer;
}
</style>
