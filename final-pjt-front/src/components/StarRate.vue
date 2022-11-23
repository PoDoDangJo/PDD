<template>
  <div>
    <div id="full-stars-example">
      <div class="rating__group">
        <label aria-label="1 star" class="rating__label" for="rating-1"
          ><i class="rating__icon rating__icon--star fa fa-star"></i
        ></label>
        <input
          class="rating__input"
          name="rating"
          id="rating-1"
          value="1"
          type="radio"
          v-model="picked"
          @click="rating"
        />
        <label aria-label="2 stars" class="rating__label" for="rating-2"
          ><i class="rating__icon rating__icon--star fa fa-star"></i
        ></label>
        <input
          class="rating__input"
          name="rating"
          id="rating-2"
          value="2"
          type="radio"
          v-model="picked"
          @click="rating"
        />
        <label aria-label="3 stars" class="rating__label" for="rating-3"
          ><i class="rating__icon rating__icon--star fa fa-star"></i
        ></label>
        <input
          class="rating__input"
          name="rating"
          id="rating-3"
          value="3"
          type="radio"
          v-model="picked"
          @click="rating"
        />
        <label aria-label="4 stars" class="rating__label" for="rating-4"
          ><i class="rating__icon rating__icon--star fa fa-star"></i
        ></label>
        <input
          class="rating__input"
          name="rating"
          id="rating-4"
          value="4"
          type="radio"
          v-model="picked"
          @click="rating"
        />
        <label aria-label="5 stars" class="rating__label" for="rating-5"
          ><i class="rating__icon rating__icon--star fa fa-star"></i
        ></label>
        <input
          class="rating__input"
          name="rating"
          id="rating-5"
          value="5"
          type="radio"
          v-model="picked"
          checked
          @click="rating"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StarRate",
  data() {
    return {
      picked: "5",
    };
  },
  methods: {
    rating() {
      this.$emit("rating", this.picked);
    },
  },
};
</script>

<style lang="scss" scoped>
#full-stars-example {
  .rating__group {
    display: inline-flex;
    margin-bottom: 1vw;
  }

  .rating__icon {
    pointer-events: none;
  }

  .rating__input {
    position: absolute !important;
    left: -9999px !important;
  }

  .rating__label {
    cursor: pointer;
    padding: 0 0.2vw;
    font-size: calc(10px + 0.5vw);
  }

  .rating__icon--star {
    color: orange;
  }

  .rating__icon--none {
    color: #eee;
  }

  .rating__input:checked ~ .rating__label .rating__icon--star {
    color: #ddd;
  }

  .rating-group:hover .rating__label .rating__icon--star {
    color: orange;
  }

  .rating__input:hover ~ .rating__label .rating__icon--star {
    color: #ddd;
  }
}
</style>
