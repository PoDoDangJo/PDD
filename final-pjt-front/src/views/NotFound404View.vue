<template>
  <div id="content">
    <div id="canvas"></div>

    <div id="water-ripples">
      <div class="go-home">
        <h1>Not Found 404</h1>
        <p @click="goToHome">Go Back To Home</p>
        <button @click="changeImage">Change Image</button>
      </div>
      <img
        class="backImages"
        :src="require(`@/assets/images/${movies[0]}`)"
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
      movies: [
        "black-adam.webp",
        "black-panther.webp",
        "everything-everywhere-all-at-once.jpeg",
        "Hobbit.jpg",
      ],
      slideIndex: 1,
    };
  },
  methods: {
    goToHome() {
      this.$router.push({ name: "HomeView" });
      location.reload;
    },
    changeImage() {},
  },
};
</script>

<style scoped>
h1 {
  margin: 0;
}
.go-home {
  height: 200px;
  z-index: 10;
  margin: auto auto;
  align-items: center;
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
