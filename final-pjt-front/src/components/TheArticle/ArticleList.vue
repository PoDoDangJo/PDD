<template>
  <div>
    <div class="article__list">
      <h1 class="article__list__category">전체 게시글</h1>
      <div class="movie-list">
        <hr />
        <ArticleItem
          v-for="review in reviews"
          :key="review.id"
          :review="review"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ArticleItem from "@/components/TheArticle/ArticleItem.vue";
import { mapGetters } from "vuex";

export default {
  name: "ArticleList",
  components: {
    ArticleItem,
  },
  computed: {
    ...mapGetters(["reviews"]),
  },
};
</script>

<style scoped>
h1 {
  padding: 0px 2vw;
  font-size: calc(16px + 1vw);
}

hr {
  border-top: 1px solid #dddcfb;
  border-bottom: 1px solid #a261f5;
}
hr:after {
  content: "";
  display: block;
  margin-top: 2px;
  border-top: 1px solid #dddcfb;
  border-bottom: 1px solid #a261f5;
}

.article__list {
  /* background-image: linear-gradient(to bottom, #14141400 0%, #141414 40%); */
  position: absolute;
  top: 40vw;
  width: 100%;
  transform: translate3d(0em, 0px, 0px);
  z-index: 2;
}

.movie-list {
  margin: calc(50px + 1vw) 2vw;
}
</style>
