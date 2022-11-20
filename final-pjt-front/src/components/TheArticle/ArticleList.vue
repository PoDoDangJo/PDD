<template>
  <div>
    <div class="article__list">
      <h1 class="article__list__category">전체 게시글</h1>
      <div class="movie-list">
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

/* .article__list__category {
} */

.article__list {
  position: absolute;
  top: 40vw;
  width: 300%;
  transform: translate3d(0em, 0px, 0px);
  z-index: 2;
}
</style>
