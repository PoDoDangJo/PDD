<template>
  <div class="slideshow-container">
    <div class="mySlides fade">
      <img
        class="backImages"
        :src="require(`@/assets/images/${movies[slideIndex]}`)"
        alt=""
      />
    </div>
    <!-- Next and previous buttons -->
    <p class="prev" @click="plusSlides(-1)">&#10094;</p>
    <p class="next" @click="plusSlides(1)">&#10095;</p>
  </div>
</template>

<script>
export default {
  name: "MovieSlider",
  data() {
    return {
      movies: [
        "black-adam.webp",
        "black-panther.webp",
        "everything-everywhere-all-at-once.jpeg",
        "Hobbit.jpg",
      ],
      slideIndex: 0,
    };
  },
  methods: {
    plusSlides(num) {
      this.slideIndex = this.slideIndex + num;
      if (this.slideIndex == this.movies.length) {
        this.slideIndex = 0;
      } else if (this.slideIndex < 0) {
        this.slideIndex = this.movies.length - 1;
      }
    },
  },
};
</script>

<style>
/* Slideshow container */
.slideshow-container {
  max-width: 100%;
  height: calc(25px + 50vw);
  position: relative;
  margin: auto;
}

/* Next & previous buttons */
.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 40%;
  width: auto;
  margin: 0 1.5vw;
  padding: 1vw;
  color: white;
  font-weight: bold;
  font-size: 2vw;
  transition: 0.6s ease;
  border-radius: 0.3vw;
  user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

/* Fading animation */
.fade {
  animation-name: fade;
  animation-duration: 1.5s;
}

@keyframes fade {
  from {
    opacity: 0.3;
  }
  to {
    opacity: 1;
  }
}

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
