<template>
  <div>
    <img class="backImages" src="@/assets/images/black-adam.webp" alt="" />
  </div>
</template>

<script>
export default {
  name: "MovieSlider",
  computed: {
    backImages() {
      return this.$store.getters.backImages;
    },
  },
};
</script>

<style>
.backImages {
  left: 0;
  top: 0;
  width: 100%;
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 65%,
    rgba(0, 0, 0, 0) 85%
  );
}
</style>
