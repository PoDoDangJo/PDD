<template>
  <div>
    <img
      class="backImages"
      src="@/assets/images/everything-everywhere-all-at-once.jpeg"
      alt=""
    />
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
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 90%,
    rgba(0, 0, 0, 0)
  );
}
</style>
