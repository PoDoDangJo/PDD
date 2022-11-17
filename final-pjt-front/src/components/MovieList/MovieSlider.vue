<template>
  <div>
    <img class="backImages" src="@/assets/images/black-panther.webp" alt="" />
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
  float: left;
  object-fit: cover;
  width: 100%;
  min-width: 500px;
  background: linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0) 100%);
  mask-image: linear-gradient(to top, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0));
}
</style>
