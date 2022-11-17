<template>
  <div>
    <div>
      <img class="poster" :src="movie?.poster_path" alt="poster" />
      <span class="detail">
        <p>{{ movie?.overview }}</p>
      </span>
    </div>
    <div class="comment"></div>
  </div>
</template>

<script>
export default {
  name: "DetailView",
  computed: {
    movie() {
      return this.$store.state.movie;
    },
  },
  created() {
    this.getMovieDetail();
  },
  methods: {
    getMovieDetail() {
      this.$store.dispatch("getMovieDetail", this.$route.params.id);
    },
  },
};
</script>

<style>
.poster {
  float: left;
  margin: 0px 1em;
  height: 50vh;
  min-height: 300px;
}

.detail {
  width: 50em;
}
</style>
