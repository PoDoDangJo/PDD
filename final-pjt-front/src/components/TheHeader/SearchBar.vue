<template>
  <div class="wrap">
    <div class="search">
      <input
        type="text"
        class="searchTerm"
        placeholder="Search"
        v-model="searchData"
        @keyup.enter="getSearch"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      searchData: null,
    };
  },
  computed: {
    searchDataLength() {
      return this.searchData.length;
    },
  },
  methods: {
    getSearch() {
      if (this.searchDataLength >= 2) {
        this.$store.dispatch("getSearch", this.searchData);
      } else {
        alert("최소 두 글자 이상의 단어로 검색해 주세요.");
      }
    },
  },
};
</script>

<style scoped>
.search {
  width: 90%;
  display: flex;
}

.searchTerm {
  width: 100%;
  border-right: none;
  padding: 5px;
}

.searchTerm {
  background: linear-gradient(white, white) padding-box,
    linear-gradient(to right, #a261f5, #dddcfb, #614af2) border-box;
  border-radius: 5px;
  border: 3px solid transparent;
}

button {
  padding: 0;
}
/* #614af2,
    #a261f5,
    #dddcfb, */

.searchButton {
  width: 5vw;
  height: 2vw;
  border: 3px solid #614af2;
  background: #614af2;
  text-align: center;
  color: #dddcfb;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
}

.seach__button__icon {
  height: 50%;
}

/*Resize the wrap to see the search bar change!*/
.wrap {
  width: calc(100px + 10vw);
  min-width: 100px;
  max-width: 500px;
  position: absolute;
  top: calc(15px + 0.8vw);
  left: 50%;
  transform: translate(-50%, -50%);
}

.wrap:focus {
  animation-name: input-active;
  animation-duration: 0.4s;
  animation-fill-mode: forwards;
}

@keyframes input-active {
  from {
    opacity: 0.3;
  }
  to {
    opacity: 1;
  }
}
</style>
