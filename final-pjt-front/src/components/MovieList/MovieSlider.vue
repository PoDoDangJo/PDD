<template>
  <div>
    <img class="backImages" src="@/assets/images/Hobbit.jpg" alt="">  
  </div>
</template>

<script>
export default {
  name: 'MovieSlider',
  computed: {
    backImages() {
      return this.$store.getters.backImages
    }
  }
}
</script>

<style>
.backImages{
  object-fit: cover;
  width: 1920px;
}
</style>