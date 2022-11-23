<template>
  <div>
    <TheHeader />
    <MovieSlider />
    <div class="slider__list">
      <MovieList :msg="'최근 개봉 영화'" :movies="lastMovies" />
      <MovieList :msg="'인기 영화'" :movies="popularityMovies" />
      <MovieList :msg="'고전 명작'" :movies="classicMovies" class="ester_egg" />
    </div>
    <div class="scrolltop-wrap">
      <a href="#" role="button" aria-label="Scroll to top">
        <svg
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path id="scrolltop-bg" d="M0 0h48v48h-48z"></path>
          <path
            id="scrolltop-arrow"
            d="M14.83 30.83l9.17-9.17 9.17 9.17 2.83-2.83-12-12-12 12z"
          ></path>
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader/TheHeader";

import MovieSlider from "@/components/TheMovie/MovieSlider";
import MovieList from "@/components/TheMovie/MovieList";

import { mapState } from "vuex";

export default {
  name: "HomeView",
  components: {
    TheHeader,
    MovieSlider,
    MovieList,
  },
  computed: {
    ...mapState({
      lastMovies: (state) => state.lastMovies.slice(0, 5),
      popularityMovies: (state) => state.popularityMovies.slice(5, 10),
      classicMovies: (state) => state.classicMovies.slice(0, 5),
    }),
  },
  methods: {
    inToHome() {
      this.$store.dispatch("inToHome");
    },
  },
  created() {
    this.inToHome();
  },
};
</script>

<style>
.slider__list {
  position: absolute;
  top: 40vw;
}
</style>

<style lang="scss" scoped>
html {
  scroll-behavior: smooth;
}

body {
  position: relative;
}
@mixin setScrolltopColors(
  $bgColor: #333,
  $arrowColor: white,
  $bgColorHover: $bgColor,
  $arrowColorHover: $arrowColor
) {
  #scrolltop-bg {
    fill: $bgColor;
  }
  #scrolltop-arrow {
    fill: $arrowColor;
  }
  a:hover {
    #scrolltop-bg {
      fill: $bgColorHover;
    }
    #scrolltop-arrow {
      fill: $arrowColorHover;
    }
  }
}

.scrolltop-wrap {
  $size: 3rem;
  $offsetBottom: 2rem;
  $offsetHorizontal: 2rem;
  $scrollToRevealDistance: 12rem; // scroll offset to reveal scroll-to-top link
  $color: #614af2;
  box-sizing: border-box;
  position: absolute;
  top: $scrollToRevealDistance;
  right: $offsetHorizontal;
  bottom: 0;
  pointer-events: none;
  backface-visibility: hidden;
  @include setScrolltopColors($color, white, lighten($color, 8%));
  // prevent extra page height if content is smaller than viewport
  // Firefox only
  @supports (-moz-appearance: meterbar) {
    clip: rect(0, $size, auto, 0);
  }
  a {
    $offset: -($size + $offsetBottom); // pull up + add a small bottom space
    position: fixed; // fallback
    position: sticky;
    top: $offset;
    width: $size;
    height: $size;
    margin-bottom: $offset;
    transform: translateY(100vh); // push to bottom from top (when stuck)
    backface-visibility: hidden;
    display: inline-block;
    text-decoration: none;
    user-select: none;
    pointer-events: all;
    outline: none;
    overflow: hidden;
    svg {
      display: block;
      border-radius: 50%;
      width: 100%;
      height: 100%;
      path {
        transition: all 0.1s;
      }
    }
    #scrolltop-arrow {
      transform: scale(0.66);
      transform-origin: center;
    }
  }
  @media print {
    display: none !important;
  }
}
</style>
